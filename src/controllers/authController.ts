import type { Request, Response } from "express"
import { LoginZod, signUpZod } from "../types/zod"
import { createJwt, hashPassword, validatePassword } from "../utils";
import {prisma} from '../db'
export const signUp = async (req:Request, res:Response) => {
    try {
        const data = signUpZod.parse(req.body);
        const hashedPassword =await hashPassword(data.password)
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })
        res.status(200).json({message:"user Created successfully"})
    } catch (e) {
        res.status(404).json({error:JSON.parse(e.message)[0].message})
    }
} 


export const login = async(req:Request,res:Response) => {
    try {
        const data = LoginZod.parse(req.body);
        const user = await prisma.user.findUnique({
            where: {
                email:data.email
            }
        })
        if (!user) {
           return res.status(404).json({error: "user not found"})
        }
        const hashedPassword = await validatePassword(data.password, user.password)
        
        if (!hashedPassword) {
            return res.status(404).json({error: "Invalid Password"})
        }
        const jwtToken =  createJwt({
            userid: user.id, role: user.role
        })

        res.status(200).json({ message: "Login successfully" ,token:jwtToken})
    } catch (e) {
        res.status(404).json({ error: JSON.parse(e.message)[0].message })
    }
}