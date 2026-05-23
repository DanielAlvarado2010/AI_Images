import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: "*", // Cambia el puerto si tu frontend usa otro
    credentials: true,
  }),
);
app.use(express.json());

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_AI_URL = `https://purple-recipe-b41c.danielalvarado1498.workers.dev`;

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch(CLOUDFLARE_AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "image/jpeg",
      },
      body: JSON.stringify({ prompt }),
    });
    console.log("Respuesta del backend:", response);
    const imageBuffer = await response.buffer();
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudflare error response:", errorText);
      return res.status(500).json({ error: errorText });
    }
    res.set("Content-Type", "image/jpeg");
    res.json(imageBuffer);
  } catch (err) {
    console.error("Error generando imagen IA:", err);
    res.status(500).json({ error: "Error generando imagen" });
  }
});

app.listen(4000, () => console.log("Backend escuchando en puerto 4000"));
