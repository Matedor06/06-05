import Database from 'better-sqlite3';

const db = new Database('./database/database.sqlite')

db.prepare(`Create Table If Not Exists scores (id INTEGER PRIMARY KEY AUTOINCREMENT, game TEXT , score Integer)`).run();

export const getAllScores = () => db.prepare(`SELECT * FROM scores ORDER BY score DESC`).all();
export const getScoreById = (id) => db.prepare(`SELECT * FROM scores WHERE id = ?`).get(id);
export const createScore = (game, score) => db.prepare(`INSERT INTO scores (game, score) VALUES (?, ?)`).run(game, score);
export const deleteScore = (id) => db.prepare(`DELETE FROM scores WHERE id = ?`).run(id);

const scores = [
    {game: 'Game A', score: 100 },
    {game: 'Game B', score: 200 },
    {game: 'Game C', score: 150 },
    {game: 'Game D', score: 300 }
]
/*
for (const score of scores) {
    createScore(score.game, score.score);
}*/