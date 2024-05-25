import { z } from "zod";

export const signupSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
});

export const signinSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const BlogPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    genre: z.string(),
    photoUrl: z.string().optional()
})

export const BlogUpdateSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    genre: z.string(),
    photoUrl: z.string().optional()
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema> 
export type BlogPost = z.infer<typeof BlogPostSchema> 
export type BlogUpdate = z.infer<typeof BlogUpdateSchema> 

