import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllData = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  insertIntoDb,
  getAllData,
  getSinglePost,
};
