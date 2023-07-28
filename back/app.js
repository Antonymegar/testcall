// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000; // Choose a port for your backend server
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post('/getCallToken', async (req, res) => {
  try {
    // const apiKey = 'YOUR_API_KEY'; // Replace with your Africa's Talking API Key
    const apiKey = '011e71674c68f32683e297768ab50020b6fe9d60b0e8d94bfaf96d0a3a14539e';
    // Request body with required parameters from the client
    const requestBody = {
            username:'voice-x',
            phoneNumber:'+254730731027',
            clientName:'callRepresentativeName',
            incoming:'true',
            outgoing:'true',
            expire:`${3 * 60 * 60}s`
    }

    const headers = {
      'Content-Type': 'application/json',
      apiKey,
    };

    // Make a POST request to the endpoint that generates the token with headers
    const response = await axios.post('https://webrtc.africastalking.com/capability-token/request', requestBody, {
      headers: headers,
    });

    if (response.data && response.data.token) {
      res.json({ token: response.data.token }); // Return the generated token to the client
    } else {
      throw new Error('Failed to get token');
    }
  } catch (error) {
    res.status(500).json({ error: 'Error generating token: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
