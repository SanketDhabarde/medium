import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@sanketdhabarde/common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid body" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      select: {
        id: true,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ msg: "User created", token });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid body" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    if (user.password !== body.password) {
      c.status(401);
      return c.json({ error: "Incorrect passoword" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});
