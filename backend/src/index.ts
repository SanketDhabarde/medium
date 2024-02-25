import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {
  signinInput,
  signupInput,
  createPostInput,
  updatePostInput,
} from "@sanketdhabarde/common-app";

const app = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: number };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization");
    const authToken = authHeader?.split(" ")[1];
    if (!authToken) {
      c.status(403);
      return c.json({ error: "Add auth token" });
    }
    const token = await verify(authToken, c.env.JWT_SECRET);
    if (token) {
      c.set("userId", token.id);
      await next();
    }
  } catch (error) {
    c.status(403);
    return c.json({ error: "Invalid token" });
  }
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
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
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

app.post("/api/v1/signin", async (c) => {
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

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const { success } = createPostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid body" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "Author not found" });
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

app.put("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = updatePostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid body" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "Author not found" });
    }

    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: user.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ msg: "updated post" });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

app.get("/api/v1/blog/:blogId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const blogId = c.req.param("blogId");

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
        authorId: userId,
      },
    });

    if (!blog) {
      return c.json({ error: "blog not found" });
    }

    return c.json({ blog });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

export default app;
