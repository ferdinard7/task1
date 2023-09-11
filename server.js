const express = require('express');
const app = express();
const port = 3000;

// Defining an endpoint that takes two query parameters
app.get("/api/data", (req, res) => {
  const { param1, param2 } = req.query;

  // First checking if both parameters are provided
  if (!param1 || !param2) {
    return res.status(400).json({ error: 'Both parameters are required' });
  }

  // Getting the current UTC time and day of the week
  const currentUTC = new Date().toUTCString();
  const currentDayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Calculating the time difference between the provided param2 and the current UTC time
  const providedTime = new Date(param2);
  const timeDifferenceInSeconds = Math.abs(providedTime - new Date()) / 1000;

  // Validating if the time difference is within +/- 2 minutes
  if (timeDifferenceInSeconds > 120) {
    return res.status(400).json({ error: 'Time difference exceeds +/- 2 minutes' });
  }

  const responseData = {
    "slack_name": param1,
    "current_day": currentDayOfWeek,
    "utc_time": currentUTC,
    "track": "backend",
    "github_file-url": "omo",
    "github_repo_url": "",
    "status_code": 200
  };

  res.json(responseData);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
