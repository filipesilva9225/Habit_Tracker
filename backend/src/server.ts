import { db } from './db/connection'
import { habits } from './db/schema'

import express from "express"

import { Request, Response } from "express";
import  cors  from "cors";

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req: Request, res: Response)=> {
    res.send("Habit Tracker API running!")
});

const PORT = 3333;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


app.get('/habits', async (rec, res) => {
    db.select()
})

app.post('/habits', async (req, res) => {
    const { name } = req.body
})