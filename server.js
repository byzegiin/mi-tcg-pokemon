import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Servir el frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

// Endpoint proxy a TCGDex
app.get('/api/cards', async (req, res) => {
    const name = req.query.name;
    if (!name) return res.status(400).json({ error: 'Falta el parámetro name' });

    try {
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error('Error en la API externa');

        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al obtener las cartas' });
    }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
