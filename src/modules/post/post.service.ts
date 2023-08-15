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

const getAllData = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "asc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const total = await tx.post.count();

    return { data: result, total };
  });
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateData = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteData = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};

const LearnAggrate = async () => {
  const result = await prisma.post.aggregate({
    _avg: {
      authorId: true,
      categoryId: true,
    },
    _count: {
      authorId: true,
    },
    _sum: {
      authorId: true,
    },
  });
  const result2 = await prisma.post.groupBy({
    by: ["title"],
  });
  return { result, result2 };
};

export const PostService = {
  insertIntoDb,
  getAllData,
  getSinglePost,
  updateData,
  deleteData,
  LearnAggrate,
};
