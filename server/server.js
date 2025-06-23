import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';  // import to convert URL to file path




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

let cachedEpisodes = null;
let cachedPlaylists = null;
let lastCacheTime = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function durationToSeconds(formatted) {
  // formatted looks like "1 hour(s) 5 minute(s) 23 second(s)" or "5 minute(s) 3 second(s)"
  const hoursMatch   = formatted.match(/(\d+)\s*hour/);
  const minutesMatch = formatted.match(/(\d+)\s*minute/);
  const secondsMatch = formatted.match(/(\d+)\s*second/);
  const h = hoursMatch   ? parseInt(hoursMatch[1], 10)   : 0;
  const m = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  const s = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;
  return h * 3600 + m * 60 + s;
}

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
// Helper function to fetch all channel uploads with full description
async function getYouTubeVideos() {
  try {
    // 1) Get the latest 20 video IDs on the channel
    const searchRes = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part:        'id',
          channelId:   CHANNEL_ID,
          maxResults:  20,
          order:       'date',
          key:         YOUTUBE_API_KEY,
          type:        'video',
        },
      }
    );
    const ids = searchRes.data.items
      .map(i => i.id.videoId)
      .filter(Boolean)
      .join(',');

    if (!ids) {
      return [];
    }

    // 2) Fetch full snippet + contentDetails for those IDs
    const videosRes = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          part: 'snippet,contentDetails',
          id:   ids,
          key:  YOUTUBE_API_KEY,
        },
      }
    );

    // 3) Map & filter out any under 10 minutes
    const episodes = videosRes.data.items
.map(item => {
  const iso = item.contentDetails?.duration;

  if (!iso) {
    console.warn("⚠️ Skipping video with missing duration:", item.id);
    return null;
  }

  const formattedDuration = formatDuration(iso);
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    date: item.snippet.publishedAt,
    youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
    image: item.snippet.thumbnails?.high?.url,
    guest: item.snippet.title,
    category: 'General',
    tags: item.snippet.tags || [],
    duration: formattedDuration,
    _durationSec: totalSeconds,
  };
})
.filter(ep => ep && ep._durationSec >= 600)
.map(({ _durationSec, ...keep }) => keep);


    // cache & return
    cachedEpisodes = episodes;
    lastCacheTime  = Date.now();
    return episodes;

  } catch (err) {
  if (err.response) {
    console.error('YouTube API error:', err.response.status, err.response.statusText);
    console.error('URL:', err.config.url);
    console.error('Params:', err.config.params);
    console.error('Response body:', err.response.data);
  } else {
    console.error('Generic error:', err.message);
  }
  return [];
  }
}



const getYouTubeVideosByPlaylist = async () => {
  try {
    const playlistsResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: 20,
        key: YOUTUBE_API_KEY,
      },
    });

    const playlists = playlistsResponse.data.items;

    const playlistVideos = await Promise.all(
      playlists.map(async (playlist) => {
        const playlistId = playlist.id;
        const playlistTitle = playlist.snippet.title;

        const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
          params: {
            part: 'snippet',
            playlistId,
            maxResults: 20,
            key: YOUTUBE_API_KEY,
          },
        });

        const videos = await Promise.all(
          videosResponse.data.items.map(async (item) => {
            const videoId = item.snippet.resourceId.videoId;
            const durationIso = await getVideoDuration(videoId);
            const formattedDuration = formatDuration(durationIso);

            return {
              id: videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              date: item.snippet.publishedAt,
              youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
              image: item.snippet.thumbnails?.high?.url,
              guest: item.snippet.title,
              category: 'General',
              tags: [], // Playlist items don't return tags
              duration: formattedDuration,
              playlist: playlistTitle,
            };
          })
        );

        return {
          playlistId,     // the YouTube playlist ID
          playlistTitle,  // human-readable title
          videos,         // the array of videos (each video has a `.playlist` field)
        };
      })
    );

    cachedPlaylists = playlistVideos;
    lastCacheTime = Date.now();
    return playlistVideos;
  } catch (err) {
  if (err.response) {
    console.error('YouTube API error:', err.response.status, err.response.statusText);
    console.error('URL:', err.config.url);
    console.error('Params:', err.config.params);
    console.error('Response body:', err.response.data);
  } else {
    console.error('Generic error:', err.message);
  }
  return [];
  }
};


app.get('/api/playlists', async (req, res) => {
  if (cachedPlaylists && Date.now() - lastCacheTime < CACHE_DURATION) {
    return res.json(cachedPlaylists);
  }
  const fresh = await getYouTubeVideosByPlaylist();
  cachedPlaylists = fresh;
  lastCacheTime = Date.now();
  res.json(fresh);
});


app.get('/api/episodes', async (req, res) => {
  const { playlist } = req.query;
  console.log("Incoming request to /api/episodes with playlist:", playlist);

  try {
    function keepLongEnough(list) {
      return list.filter(ep => durationToSeconds(ep.duration) >= 600);
    }

    if (playlist && playlist !== 'All') {
      console.log("Fetching playlist-filtered videos...");
      if (!cachedPlaylists || Date.now() - lastCacheTime > CACHE_DURATION) {
        cachedPlaylists = await getYouTubeVideosByPlaylist();
        lastCacheTime = Date.now();
      }
      let allVideos = cachedPlaylists.flatMap(pl => pl.videos);
      let byPlaylist = allVideos.filter(ep => ep.playlist === playlist);
      return res.json(keepLongEnough(byPlaylist));
    }

    console.log("Fetching all videos from channel...");
    if (!cachedEpisodes || Date.now() - lastCacheTime > CACHE_DURATION) {
      cachedEpisodes = await getYouTubeVideos();
      lastCacheTime = Date.now();
    }

    return res.json(keepLongEnough(cachedEpisodes));
  } catch (err) {
    console.error("Error in /api/episodes:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




  let cachedChannelStats = null;
  
  // Fetch channel stats from YouTube API
  const getChannelStats = async () => {
    try {
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
  
      // Cache the channel stats
      cachedChannelStats = {
        totalViews,
        totalEpisodes,
      };
    
  
      return cachedChannelStats;
    } catch (error) {
      console.error('Error fetching channel stats:', error);
      return {
        totalViews: 0,
        totalEpisodes: 0,
      };
    }
  };
  
  // API endpoint for stats (uses cache when valid)
  app.get('/api/stats', async (req, res) => {
    try {
      if (cachedChannelStats && (Date.now() - lastCacheTime < CACHE_DURATION)) {
        console.log('Serving channel stats from cache');
        res.json(cachedChannelStats);
      } else {
        console.log('Fetching new channel stats');
        const channelStats = await getChannelStats();
        res.json(channelStats);
      }
    } catch (error) {
      console.error('Error in /api/stats:', error);
      res.status(500).json({ error: 'Failed to fetch channel stats' });
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
      from: "info@trupodcast.media",
      to: 'info@trupodcast.media',
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
      from: "info@trupodcast.media",
      to: 'info@trupodcast.media',
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
          background-color: white;
          color: #e53e3e;
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


    //Handle Newsletter Data

   // Get the current directory
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   const myPath = path.join(__dirname, 'newsletterData.json');
   const uploadDir = path.join(__dirname, 'uploads');
   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
   // Image upload logic
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, uploadDir);
     },
     filename: (req, file, cb) => {
       cb(null, Date.now() + path.extname(file.originalname));
     },
   });
   
   const upload = multer({ storage });
   
   // Endpoint for uploading images
   app.post('/api/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Store the correct relative path without "server/"
    const relativeImagePath = `uploads/${req.file.filename}`;
  
    // Send both frontend and JSON-friendly paths
    res.json({ imagePath: relativeImagePath });
  });
  
   
   // Save newsletter data to JSON file
   function saveNewsletterData(data) {
     fs.readFile(myPath, (err, fileData) => {
       let newsletters = [];
       if (!err) {
         newsletters = JSON.parse(fileData);
       }
       newsletters.push(data);
       fs.writeFile(myPath, JSON.stringify(newsletters, null, 2), (err) => {
         if (err) throw err;
         console.log('Data saved successfully.');
       });
     });
   }
   
   // Delete a post by ID
   function deletePostById(postId) {
     fs.readFile(myPath, (err, fileData) => {
       if (err) throw err;
       let newsletters = JSON.parse(fileData);
       newsletters = newsletters.filter(post => post.id !== postId);
       fs.writeFile(myPath, JSON.stringify(newsletters, null, 2), (err) => {
         if (err) throw err;
         console.log('Post deleted successfully.');
       });
     });
   }
   
   // Save post endpoint
   app.post('/api/savePost', upload.single('image'), (req, res) => {
    const postData = req.body;
  
    if (req.file) {
      postData.image = `uploads/${req.file.filename}`; // Make sure req.file is correctly handled
    }
  
    fs.readFile(myPath, 'utf8', (err, fileData) => {
      let newsletters = [];
      if (!err && fileData) {
        try {
          newsletters = JSON.parse(fileData);
        } catch (parseErr) {
          console.error('Error parsing JSON:', parseErr);
          return res.status(500).json({ error: 'Failed to parse JSON' });
        }
      }
  
      newsletters.push(postData);
  
      fs.writeFile(myPath, JSON.stringify(newsletters, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing JSON file:', writeErr);
          return res.status(500).json({ error: 'Error saving post' });
        }
        res.status(200).json({ message: 'Post saved successfully', post: postData });
      });
    });
  });
  
  // ────────────────────────────────────────────────────────────────
// PUT /api/updatePost/:id
// ────────────────────────────────────────────────────────────────
app.put(
  '/api/updatePost/:id',
  upload.single('image'),          // allow optional new image upload
  express.json(),                  // parse JSON bodies
  (req, res) => {
    const postId = Number(req.params.id);
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    // Read existing posts
    const data = fs.readFileSync(myPath, 'utf-8');
    let posts = [];
    try {
      posts = JSON.parse(data);
    } catch (err) {
      return res.status(500).json({ error: 'Could not parse posts file' });
    }

    // Find the post
    const idx = posts.findIndex(p => p.id === postId);
    if (idx === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Merge incoming fields
    const updated = {
      ...posts[idx],
      ...req.body,                // title, content, tags, etc.
    };

    // If a new image was uploaded, update its path
    if (req.file) {
      updated.image = `uploads/${req.file.filename}`;
    }

    // Replace & save
    posts[idx] = updated;
    try {
      fs.writeFileSync(myPath, JSON.stringify(posts, null, 2));
    } catch (err) {
      return res.status(500).json({ error: 'Could not write posts file' });
    }

    return res.json({ message: 'Post updated', post: updated });
  }
);

   
   // Get all posts
   app.get('/api/getPosts', async (req, res) => {
  try {
    const fileData = await fs.promises.readFile(myPath, 'utf-8');
    const posts = JSON.parse(fileData);
    res.json(posts);
  } catch (err) {
    console.error('Error reading newsletter data:', err);
    res.status(500).json({ error: 'Failed to read newsletter data' });
  }
});

   
   // Delete a post by ID
   const postsFile = path.join(__dirname, 'newsletterData.json');
const uploadsDir = path.join(__dirname, '');

app.delete('/api/deletePost', (req, res) => {
  const { id, image } = req.body;

  // Read the posts.json file
  fs.readFile(postsFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading posts file:', err);
      return res.status(500).json({ message: 'Failed to read posts file' });
    }

    let posts = JSON.parse(data);

    // Filter out the post to delete
    const updatedPosts = posts.filter((post) => post.id !== id);

    if (posts.length === updatedPosts.length) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Write the updated posts back to the file
    fs.writeFile(postsFile, JSON.stringify(updatedPosts, null, 2), (err) => {
      if (err) {
        console.error('Error writing posts file:', err);
        return res.status(500).json({ message: 'Failed to update posts file' });
      }

      // Delete the image
      const imagePath = path.join(uploadsDir, image);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting image:', err);
          return res.status(500).json({ message: 'Failed to delete image' });
        }

        res.json({ message: 'Post and image deleted successfully' });
      });
    });
  });
});

  app.get('/api/health', (req, res) => {
  res.send('OK');
});

app.set('trust proxy', true);

const frontendDistPath = path.join(__dirname, '../dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  } else {
    res.status(404).send('Not found');
  }
});


// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});


