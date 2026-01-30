import express from "express";
import { Config } from "./src/config";
import AuthRouter from "./src/routes/auth";


const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to course selling api")
})

app.use('/api/auth',AuthRouter)

app.listen(Config.PORT, () => {
    console.log("server is lisenting on port ",Config.PORT)
})
