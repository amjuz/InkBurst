import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { number, string, z } from "zod";

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
            }
        })
                     
        if(!blog){
            return c.json({
                message: "blog not found"
            })
        }

        return c.json({
            message: 'new route',
            id : blogId,
            blog: blog
        })
    })
    
   
//   -----------  POST BLOG -----------------      

    const BlogPostSchema = z.object({
        title: z.string(),
        content: z.string(),
    })

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
                    authorId: Number(authorId)
                }
            });

            
            return c.json({
                message: body,
                id: newBlog?.id
            })

        } catch (e) {
            console.log(e)
        }

        
    })
    
    
    //--------- update Blog ----------  

    const BlogUpdateSchema = z.object({
        id: z.number(),
        title: z.string(),
        content: z.string()
    })

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
                    content: body.title
                }
            })

            return c.json({
                id: updateBlog?.id 
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
    
            const allBlog = await prisma.post.findMany();
            
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
    
    // blogRouter.get('/:id',async (c)=> {

    //     console.log("Control reached id route")

    //     const prisma = new PrismaClient({
    //         datasourceUrl: c.env.DATABASE_URL
    //     }).$extends(withAccelerate());

    //     const id = c.req.param("id");

    //     const blog = await prisma.post.findFirst({
    //         where:{
    //             id: Number(id)
    //         }
    //     })
    //     c.json({
    //         blog: blog
    //     })
    //     console.log("hey")
    // })