import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { signinSchema, signupSchema } from '@amjuz/medium-blog'
import { cors } from "hono/cors";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

  userRouter.get('/test',(c)=>{
    return c.json({
      message: "hey there"
    })
  })

  userRouter.use("/*",cors());

  userRouter.post('/signup',async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
  
    //zod
    
    try{
        const {success} = signupSchema.safeParse(body);
    
        if(!success) {
          c.status(411);
          return c.text("Invalid credentials")
    
        }
        console.log("signupSchema validated");
    
        const userExists = await prisma.user.findFirst({
          where: {
            email: body.email
          },
        })
        console.log("reached 1");
        
        if(userExists){
    
          c.status(411);
          return c.text("User already exists");
        }
        console.log("reached 2");
  
        const dbuser = await prisma.user.create({
          data : {
            name: body.name,
            email: body.email,
            password: body.password
          }
        })
        console.log("reached 3");
  
        const jwt = await sign({
          id: dbuser.id
        }, c.env.JWT_SECRET)
        console.log("reached 4");
  
        return c.text(jwt);
    
    }catch(e) {
  
        c.status(411);
        console.error
        return c.text('Invalid')
    }
    
    
  })
  
  
  // ----------------------------------------------
  
  userRouter.post('/signin', async (c) => {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    try {
  
      const { success } = signinSchema.safeParse(body);
    
      if(!success) {
        c.status(411);
        c.json({
          message: "Invalid credentials"
        })
      }
    
      console.log("siginSchema validated");
  
      const dbuser = await prisma.user.findFirst({
        where : {
          email: body.email,
          password: body.password
        }
      })
  
      if(!dbuser){
        c.status(403);
        return c.json({
        message: "Unauthorized"
      })
      }
  
      const jwt = await sign({
        id: dbuser?.id
      }, c.env.JWT_SECRET);
  
      c.status(200);
      return c.json({
        token: jwt,
        message: "Signed In"
      });
  
      
  
    } catch(e) {
  
      c.status(411);
      return c.json({
        message: "Invalid"
      })
    }
  
  })
  