const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Si el navegador pide algo que no existe, enviamos el index.html para evitar el 404
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
