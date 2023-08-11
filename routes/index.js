const openAI = require('openai')
const express = require('express');
const router = express.Router();
const needle = require('needle');

const API_KEY = process.env.API_KEY;
const API_REQUEST = process.env.OPENAI_REQ

router.post('/', async (req, res) => {
  const { sendedMessages } = req.body;
  console.log(sendedMessages)
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };
    
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', 
        content: 'Ти сервіс з пошуку фільмів, серіалі, мультиків, мультсеріалів'},
        ...sendedMessages
      ]
    };
    
    const respApi = await needle('post', API_REQUEST, data, { headers });
    const message = respApi.body.choices[0].message

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({error})
  }
})


module.exports = router
