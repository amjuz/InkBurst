import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { date, number, string, z } from "zod";
import { BlogPostSchema, BlogUpdateSchema} from '@amjuz/medium-blog'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


    //   --------- MIDDLEWARE ----------------
    blogRouter.use('/*', async (c, next) => {
        
        console.log("control reached middleware")
        
        try {

            const authHeader = c.req.header("authorization") || "";
            
            if(!authHeader){

                console.log("but failed to find auth header")
                c.status(411);
                return c.json({
                    message: "Couldn't find auth header"
                })
            }
            
            const verifiedUser = await verify(authHeader, c.env.JWT_SECRET);
            
            if (verifiedUser){
                
                c.set("userId", verifiedUser.id );
                console.log("user has been verified ")
                await next();
                console.log("control has reached beyond next()")
                
            } else {
                
                console.log("control reached else block of middleware ")
                c.status(403);
                return c.json({
                    message: "Unauthorized"
                })
            }
            
        } catch(e) {
            
            c.status(411);
            c.json({
                message: "Error occurred in middleware"
            })
        }
        
        
    })

    blogRouter.get('/auth',async (c) => {
        c.status(200);
        return c.json({
            msg: "token found"
        })
    })

// ------- get blog--------------


    blogRouter.get('/post/:id',async (c) => {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        if(!prisma){
            console.log("db connection unsuccessful")
        }

        const blogId = c.req.param("id");

        const blog = await prisma.post.findFirst({
            where: {
                id : Number(blogId)
            },
            select: {
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
                     
        if(!blog){
            return c.json({
                message: "blog not found"
            })
        }

        return c.json({
            blog: blog
        })
    })
    
   
//   -----------  POST BLOG -----------------      


    type BlogPost = z.infer<typeof BlogPostSchema>;

    blogRouter.post('/post',async (c)=> {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const body: BlogPost = await c.req.json();
        const authorId = c.get("userId")
        
        
        try{
            const { success } = BlogPostSchema.safeParse(body);

            if(!success){
                c.status(411)
                return c.json({
                    message: "Request failed due to invalid parameters"
                })
            }

            const newBlog = await prisma.post.create({
                data: {
                    title: body.title,
                    content: body.content,
                    createdAt: new Date,
                    authorId: Number(authorId),
                    genre: body.genre,
                    photoUrl: body.photoUrl ? body.photoUrl : "",
                    published: true
                }
            });

            
            return c.json({
                message: newBlog,
                id: newBlog?.id
            })

        } catch (e) {
            console.log(e)
        }

        
    })
    
    
    //--------- update Blog ----------  


    blogRouter.put('/update', async(c) => {
        
        console.log("reached inside update route")
    
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        
        const body = await c.req.json();
        try {


            const { success } = BlogUpdateSchema.safeParse(body);

            if(!success){
                console.log("Update schema validation error")

                c.status(411);
                return c.json({
                    message: "Request failed due to invalid parameters"
                })
            }

            const updateBlog = await prisma.post.update({
                where: {
                    id: body.id
                },
                data: {
                    title: body.title,
                    content: body.content,
                    genre: body.genre,
                    
                }
            })

            return c.json({
                id: updateBlog?.id,
                updatesBlog: updateBlog 
            })

        } catch (e) {

            c.status(411);
            c.json({
                message: "Error while updating Blog Post"
            })
        }

    })

//--------- Blog bulk --------------------

    blogRouter.get('/bulk', async(c) => {

        try {
            console.log("control reached inside bulk req")

            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL
            }).$extends(withAccelerate());
    
            const allBlog = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    genre: true,
                    createdAt: true,
                    photoUrl: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            
            return c.json({
                allBlog
            })

        } catch (e){

            c.status(411);
            c.json({
                message: "Error occurred while fetching bulk request "
            })
        }
    })
    
