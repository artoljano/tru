import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";
import sendReviewEmail from './mailer.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();

const port = 5000;

// YouTube API key and channel ID
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;


// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (for form submissions, if needed)
app.use(express.urlencoded({ extended: true }));


// Cache setup
let cachedStats = null;
let cachedEpisodes = null;
let lastCacheTime = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to get video duration
const getVideoDuration = async (videoId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });
    const duration = response.data.items[0]?.contentDetails?.duration;
    return duration || 'N/A';
  } catch (error) {
    console.error('Error fetching video duration:', error);
    return 'N/A';
  }
};

// Helper function to format ISO 8601 duration
const formatDuration = (isoDuration) => {
  const regex = /^PT(\d+H)?(\d+M)?(\d+S)?$/;
  const match = isoDuration.match(regex);
  if (match) {
    const hours = match[1] ? match[1].slice(0, -1) : 0;
    const minutes = match[2] ? match[2].slice(0, -1) : 0;
    const seconds = match[3] ? match[3].slice(0, -1) : 0;
    return `${hours ? `${hours} hour(s) ` : ''}${minutes ? `${minutes} minute(s) ` : ''}${seconds ? `${seconds} second(s)` : ''}`.trim();
  }
  return 'N/A';
};

// Helper function to get videos from the YouTube API
const getYouTubeVideos = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: 10,
        order: 'date',
        key: YOUTUBE_API_KEY,
      },
    });

    const episodes = await Promise.all(response.data.items.map(async (item) => {
      const durationIso = await getVideoDuration(item.id.videoId);
      const formattedDuration = formatDuration(durationIso);

      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        date: item.snippet.publishedAt,
        youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        image: item.snippet.thumbnails.high.url,
        guest: item.snippet.title,
        category: 'General',
        tags: item.snippet.title.split(' '),
        duration: formattedDuration,
      };
    }));

    cachedEpisodes = episodes;
    lastCacheTime = Date.now();
    return episodes;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
};


const getChannelStats = async () => {
    try {
      // Fetch channel statistics (total views, total subscribers, etc.)
      const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'statistics',
          id: CHANNEL_ID,
          key: YOUTUBE_API_KEY,
        },
      });
  
      const channelData = response.data.items[0]?.statistics;
  
      const totalViews = channelData?.viewCount || 0;
      const totalEpisodes = channelData?.videoCount || 0;
  
      return {
        totalViews,
        totalEpisodes,
      };
    } catch (error) {
      console.error('Error fetching channel stats:', error);
      return {
        totalViews: 0,
        totalEpisodes: 0,
      };
    }
  };



// API endpoint to get episodes with caching
app.get('/api/episodes', async (req, res) => {
  if (cachedEpisodes && (Date.now() - lastCacheTime < CACHE_DURATION)) {
    console.log('Serving from cache');
    res.json(cachedEpisodes);
  } else {
    console.log('Fetching new data');
    const episodes = await getYouTubeVideos();
    res.json(episodes);
  }
});

app.get('/api/stats', async (req, res) => {
    if (cachedStats && (Date.now() - lastCacheTime < CACHE_DURATION)) {
      console.log('Serving from cache');
      res.json(cachedStats);
    } else {
      console.log('Fetching new data');
  
      // Fetch the episodes and channel stats
      const episodes = await getYouTubeVideos();
      const channelStats = await getChannelStats();
  
      // Combine the stats and episodes data
      const responseData = {
        episodes,
        channelStats,
      };
  
      cachedStats = responseData;
      lastCacheTime = Date.now();
      res.json(responseData);
    }
  });


  //Email Sender
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)
  

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // e.g., smtp.mailtrap.io
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-review-email', (req, res) => {
    console.log('Request body:', req.body); // Check what data is being received
  
    const { name, email, episodeId, rating, review } = req.body;
  
    // Ensure that all required fields are present
    if (!name || !email || !episodeId || !rating || !review) {
      return res.status(400).send('All fields are required.');
    }
  
    const mailOptions = {
      from: "artol.jano45@gmail.com",
      to: 'artoljano0@gmail.com',
      subject: `New Review from ${name} for Episode ${episodeId}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #1a202c;
            color: #fff;
            margin: 0;
            padding: 0;
          }
          .email-container {
            background-color: #2d3748;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #e53e3e;
            color: #fff;
            padding: 15px;
            text-align: center;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .email-header h2 {
            margin: 0;
          }
          .email-body {
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
          color:white;
            margin-bottom: 15px;
          }
          .email-body .label {
            font-weight: bold;
            color: #e53e3e;
          }
          .email-footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #ccc;
          }
        </style>
        <title>Podcast Review Submission</title>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h2>New Podcast Review Submission</h2>
          </div>
          <div class="email-body">
            <p><span class="label">Name:</span> ${name}</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Episode Name:</span> ${episodeId}</p>
            <p><span class="label">Rating:</span> ${rating}</p>
            <p><span class="label">Review:</span></p>
            <p>${review}</p>
          </div>
         
        </div>
      </body>
      </html>
    `
    };

    

  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });

  
  app.post('/api/send-suggestion-email', (req, res) => {
    console.log('Request body:', req.body); // Check what data is being received
  
    const { name, email, guestName, guestBackground, guestReason } = req.body;
  
    // Ensure that all required fields are present
    if (!name || !email || !guestName || !guestBackground || !guestReason) {
      return res.status(400).send('All fields are required.');
    }
  
    const mailOptions = {
      from: "artol.jano45@gmail.com",
      to: 'artoljano0@gmail.com',
      subject: `New Podcast Guest Suggestion from ${name}`,
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #1a202c;
          color: #fff;
          margin: 0;
          padding: 0;
        }
        .email-container {
          background-color: #2d3748;
          padding: 20px;
          margin: 20px auto;
          width: 80%;
          max-width: 600px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #e53e3e;
          color: #fff;
          padding: 15px;
          text-align: center;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .email-header h2 {
          margin: 0;
        }
        .email-body {
          font-size: 16px;
          line-height: 1.6;
        }
        .email-body p {
          text-decoration: none;
          color:white;
          margin-bottom: 15px;
        }
        .email-body .label {
          font-weight: bold;
          color: #e53e3e;
        }
        .email-footer {
          margin-top: 20px;
          font-size: 14px;
          text-align: center;
          color: #ccc;
        }
      </style>
      <title>Podcast Guest Suggestion</title>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h2>New Podcast Guest Suggestion</h2>
        </div>
        <div class="email-body">
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          <p><span class="label">Guest Name:</span> ${guestName}</p>
          <p><span class="label">Guest Background:</span> ${guestBackground}</p>
          <p><span class="label">Reason for Suggestion:</span> ${guestReason}</p>
        </div>
        <div class="email-footer">
          <p>Thank you for your suggestion!</p>
        </div>
      </div>
    </body>
    </html>
  `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
      });
    });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



