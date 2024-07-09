import express from "express";
import { getUser, login, signUp } from "../controllers/userController.js";
import { middleware } from "../middleware/middleware.js";

const userRouter = express.Router()

userRouter.get("/get-user", middleware.checkSession, getUser)

userRouter.post("/sign-up", middleware.checkSignUpRequest, signUp)

userRouter.post("/login", middleware.checkLoginRequest, login)


export default userRouter