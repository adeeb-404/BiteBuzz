import express from "express";
const PORT = 3000;

const app = new express();

app.get("/", (req, res) => res.send("<h1>Temp text</h1>"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
