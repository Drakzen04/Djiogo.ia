import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  const q = question.toLowerCase();

  // Identité de Djiogo.IA
  if (
    q.includes("créateur") ||
    q.includes("qui t'a créé") ||
    q.includes("qui es-tu")
  ) {
    return res.json({
      reponse: `🤖 Je suis Djiogo.IA

Créateur : Gomez Djiogo  
Date de création : 2026  
Objectif : Aider au développement d’applications, au code moderne et à l’innovation technologique.`
    });
  }

  try {
    const response = await fetch("https://api.z.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": "Bearer f97bfbe75f1d4e0381f8fa415a0aeb5e.ldBJj94fkOi0r2Fa",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();

    res.json({
      reponse: data.reply || "Je réfléchis encore..."
    });
  } catch (err) {
    res.json({ reponse: "❌ Erreur serveur IA" });
  }
});

app.listen(PORT, () => {
  console.log("Djiogo.IA en ligne sur le port " + PORT);
});

