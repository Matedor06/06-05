import express from "express";
import * as db from "./util/database.js";

const port = 8080;

const app = express();
app.use(express.json());

app.get("/scores", (req, res) => {
    try {
        const scores = db.getAllScores();
        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve scores" });
    }
});

app.get("/scores/:id", (req, res) => {
    const id = req.params.id;
    try {
        const score = db.getScoreById(id);
        if (score) {
            res.json(score);
        } else {
            res.status(404).json({ error: "Score not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve score" });
    }
});

app.post("/scores", (req, res) => {
    const { game, score } = req.body;
    if (!game || typeof score !== "number") {
        return res.status(400).json({ error: "Invalid input" });
    }
    try {
        const newScore = db.createScore(game, score);
        if (newScore.changes === 1) {
            res.status(201).json({ id: newScore.lastInsertRowid });
        } else {
            res.status(500).json({ error: "Failed to create score" });
        }
    } catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});

app.delete("/scores/:id", (req, res) => {
    const id = req.params.id;
    try {
        const result = db.deleteScore(id);
        if (result.changes === 1) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ error: "Score not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete score" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});