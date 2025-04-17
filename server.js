const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

// Configurez votre clé API OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Utilisation d'une variable d'environnement pour sécuriser la clé
});
const openai = new OpenAIApi(configuration);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Route POST pour envoyer des messages à l'API OpenAI
app.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error('Erreur avec OpenAI API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la communication avec OpenAI' });
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
