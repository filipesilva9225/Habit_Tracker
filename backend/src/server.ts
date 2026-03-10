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
