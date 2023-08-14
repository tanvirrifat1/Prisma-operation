import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertIntoDB = async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);

  res.send({
    success: true,
    message: "category created!",
    data: result,
  });
};

export const CategoryController = {
  insertIntoDB,
};
