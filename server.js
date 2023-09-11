const express = require('express');
const app = express();
const port = 3000;

// Function to format a number with leading zero if it's less than 10
function formatWithLeadingZero(num) {
  return num < 10 ? `0${num}` : num;
}

// Defining an endpoint that takes two query parameters
app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // First checking if both parameters are provided
  if (!slack_name || !track) {
    return res.status(400).json({ error: 'Both parameters are required' });
  }

  // Getting the current UTC time and day of the week
  const currentDate = new Date();
  const currentUTC = `${currentDate.getUTCFullYear()}-${formatWithLeadingZero(currentDate.getUTCMonth() + 1)}-${formatWithLeadingZero(currentDate.getUTCDate())}T${formatWithLeadingZero(currentDate.getUTCHours())}:${formatWithLeadingZero(currentDate.getUTCMinutes())}:${formatWithLeadingZero(currentDate.getUTCSeconds())}Z`;
  const currentDayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Calculating the time difference between the provided track parameter and the current UTC time
  const providedTime = new Date(track);
  const timeDifferenceInSeconds = Math.abs(providedTime - currentDate) / 1000;

  // Validating if the time difference is within +/- 2 minutes
  if (timeDifferenceInSeconds > 120) {
    return res.status(400).json({ error: 'Time difference exceeds +/- 2 minutes' });
  }

  const responseData = {
    "slack_name": slack_name,
    "current_day": currentDayOfWeek,
    "utc_time": currentUTC,
    "track": track,
    "github_file_url": "https://github.com/ferdinard7/task1/blob/main/server.js",
    "github_repo_url": "https://github.com/ferdinard7/task1/tree/main",
    "status_code": 200
  };

  res.json(responseData);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
