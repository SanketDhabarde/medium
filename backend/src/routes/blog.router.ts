import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@sanketdhabarde/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: number;
  };
}>();

blogRouter.use("/*", async (c, next) => {
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

blogRouter.post("/", async (c) => {
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

    const blog = await prisma.blog.create({
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

blogRouter.put("/", async (c) => {
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

    const blog = await prisma.blog.update({
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

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        blogImage: true,
        author: {
          select: {
            name: true,
            profileImage: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

blogRouter.get("/:blogId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("blogId");

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
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
