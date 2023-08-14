import { Response, Request } from "express";
import { PostService } from "./post.service";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertIntoDb(req.body);

    res.send({
      success: true,
      message: "post created successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllData = async (req: Request, res: Response) => {
  console.log(req.query);
  const options = req.query;
  try {
    const result = await PostService.getAllData(options);

    res.send({
      success: true,
      message: "get post successfully!",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const userID: number = parseInt(req.params.id);
    const result = await PostService.getSinglePost(userID);

    res.send({
      success: true,
      message: "get single post successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  insertIntoDb,
  getAllData,
  getSinglePost,
};
