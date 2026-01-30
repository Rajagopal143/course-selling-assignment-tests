import { Router } from "express";
import { login, signUp } from "../controllers/authController";

const AuthRouter = Router();


AuthRouter.post('/signup',signUp)
AuthRouter.post('/login',login)

export default AuthRouter