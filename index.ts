import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const getAllUsers = await prisma.user.findMany();
  // console.log(getAllUsers);
  const postUser = await prisma.user.create({
    data: {
      email: "tan@gmail.com",
      name: "tanvir",
      age: 21,
    },
  });
  console.log(postUser);
};

main();
