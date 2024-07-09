import express from "express";
import userRouter from "./userRouter.js";
import { middleware } from "../middleware/middleware.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter)

rootRouter.use(middleware.errorHandle);

export default rootRouter;