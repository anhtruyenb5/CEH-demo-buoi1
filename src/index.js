import express from "express"
import cors from "cors"
import rootRouter from "./routes/rootRouter.js";
import session from "express-session";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(session({
    secret: 'BI_MAT',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json())
app.use(express.static("."))
app.listen(8080)
app.use(rootRouter)
