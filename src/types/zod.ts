import { password } from "bun";
import * as z from "zod"; 



export const signUpZod = z.object({
    name: z.string(),
    email: z.email("Invalid Email"),
    password: z.string().min(6, "Password must be >6"),
    role: z.enum(["STUDENT", "INSTRUCTOR"],"role must be STUDENT or INSTRUCTOR")
})
export const LoginZod = z.object({
    email: z.email("Invalid Email"),
    password: z.string(),
})
