import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// YouTube API key and channel ID
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCwy24lZawSkq3mWqF68p2YA';

// Enable CORS
app.use(cors());

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
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route for sending Suggest Guest form emails
app.post('/send-suggest-guest-email', async (req, res) => {
  const { name, email, guestName, guestBackground, whyGreatGuest } = req.body;

  const subject = `Guest Suggestion: ${guestName}`;
  const text = `
    Name: ${name}
    Email: ${email}
    Suggested Guest: ${guestName}
    Guest's Background: ${guestBackground}
    Why they'd be a great guest: ${whyGreatGuest}
  `;
  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Suggested Guest:</strong> ${guestName}</p>
    <p><strong>Guest's Background:</strong> ${guestBackground}</p>
    <p><strong>Why they'd be a great guest:</strong> ${whyGreatGuest}</p>
  `;

  try {
    await sendEmail('your-email@example.com', subject, text, html); // Replace with actual email
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// POST route for sending Review Episode form emails
app.post('/send-review-episode-email', async (req, res) => {
  const { name, email, episodeTitle, review } = req.body;

  const subject = `Review for Episode: ${episodeTitle}`;
  const text = `
    Name: ${name}
    Email: ${email}
    Episode Title: ${episodeTitle}
    Review: ${review}
  `;
  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Episode Title:</strong> ${episodeTitle}</p>
    <p><strong>Review:</strong> ${review}</p>
  `;

  try {
    await sendEmail('your-email@example.com', subject, text, html); // Replace with actual email
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



