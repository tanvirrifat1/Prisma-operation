import { Request, Response } from "express";
import { UserService } from "./user.service";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "Profile created or update successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUser();
    res.send({
      success: true,
      message: "Get user successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id); // Parse the string to a number
    const result = await UserService.getSingleUser(userId);
    res.send({
      success: true,
      message: "Get single user successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const result = await UserService.deleteUser(userId);
    res.send({
      success: true,
      message: "Get single user successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const UserController = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUser,
  getSingleUser,
  deleteUser,
};
