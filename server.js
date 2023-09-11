const express = require('express');
const app = express();
const port = 3000;

// Defining an endpoint that takes two query parameters
app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // First checking if both parameters are provided
  if (!slack_name || !track) {
    return res.status(400).json({ error: 'Both parameters are required' });
  }

  // Getting the current UTC time and day of the week
  const currentUTC = new Date().toISOString();
  const currentDayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Calculating the time difference between the provided param2 and the current UTC time
  const providedTime = new Date(track);
  const timeDifferenceInSeconds = Math.abs(providedTime - new Date()) / 1000;

  // Validating if the time difference is within +/- 2 minutes
  if (timeDifferenceInSeconds > 120) {
    return res.status(400).json({ error: 'Time difference exceeds +/- 2 minutes' });
  }

  const responseData = {
    "slack_name": slack_name,
    "current_day": currentDayOfWeek,
    "utc_time": currentUTC,
    "track": track,
    "github_file-url": "https://github.com/ferdinard7/task1/blob/main/server.js",
    "github_repo_url": "https://github.com/ferdinard7/task1/tree/main",
    "status_code": 200
  };

  res.json(responseData);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
