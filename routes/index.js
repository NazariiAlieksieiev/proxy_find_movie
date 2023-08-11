const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const router = express.Router();
const API_KEY = process.env.API_KEY;

const config = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(config);

router.post('/', async (req, res) => {
  const { sendedMessages } = req.body;
  console.log(sendedMessages)
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Ти сервіс з пошуку фільмів, серіалі, мультиків, мультсеріалів'
        },
        ...sendedMessages
      ]
    }
    )

    const message = completion.data.choices[0].message

    res.status(200).json(message);
  } catch (error) {
    if (error.response.status === 401) {
      return res.status(401).json({
        error: "Please provide a valid API key.",
      });
    }

    res.status(500).json({
      error:
        "An error occurred while generating response. Please try again later.",
    })
  }
})


module.exports = router
