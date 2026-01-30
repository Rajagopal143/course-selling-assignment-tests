import bcrypt from "bcrypt"
import type { role } from "./generated/prisma/enums"
import jwt from "jsonwebtoken"
import { Config } from "./config"
type jwtData ={
    userid: string
    role:role
}

export const hashPassword = (password: string) => {
   return bcrypt.hash(password,10)
}

export const validatePassword = (password:string, validatePassword:string) => {
    return bcrypt.compare(password, validatePassword);
}


export const createJwt = (data: jwtData)=>{
    const token = jwt.sign(data, Config.JWTSECERETKEY)
    return token;
}