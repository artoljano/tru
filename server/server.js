import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

// YouTube API key and channel ID (replace with your actual values)
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;  // YouTube API Key from environment
const CHANNEL_ID = 'UCwy24lZawSkq3mWqF68p2YA';  // Replace with the YouTube channel ID
 // Optionally, use a playlist ID instead

// Enable CORS to allow frontend requests from different origins
app.use(cors());

// Helper function to get video duration
const getVideoDuration = async (videoId) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });
    const duration = response.data.items[0]?.contentDetails?.duration;
    return duration || 'N/A'; // Return 'N/A' if no duration is found
  } catch (error) {
    console.error('Error fetching video duration:', error);
    return 'N/A'; // Return 'N/A' in case of an error
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
    // Make a request to the YouTube API to get videos from the channel
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,  // Fetch videos from the channel
        maxResults: 10,          // Limit the number of results (you can adjust this)
        order: 'date',           // Order by the latest video
        key: YOUTUBE_API_KEY,    // Your YouTube API Key
      },
    });

    // Map over the response data to format it as episode data
    const episodes = await Promise.all(response.data.items.map(async (item) => {
      const durationIso = await getVideoDuration(item.id.videoId); // Get video duration
      const formattedDuration = formatDuration(durationIso); // Format the duration

      return {
        id: item.id.videoId,               // Video ID for the YouTube video
        title: item.snippet.title,          // Video title
        description: item.snippet.description,  // Video description
        date: item.snippet.publishedAt,     // Video published date
        youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,  // YouTube URL
        image: item.snippet.thumbnails.high.url,  // Video thumbnail URL
        guest: item.snippet.title,          // Optionally, extract guest info from the title
        category: 'General',               // You can add custom category or fetch it if available
        tags: item.snippet.title.split(' '),  // Basic tags based on title (you can improve this)
        duration: formattedDuration,        // Formatted duration
      };
    }));

    return episodes;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return [];
  }
};

// API endpoint to get episodes from the YouTube channel
app.get('/api/episodes', async (req, res) => {
  const episodes = await getYouTubeVideos(); // Fetch episodes with durations
  res.json(episodes);  // Send the episodes as the response
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
