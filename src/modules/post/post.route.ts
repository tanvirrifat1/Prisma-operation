import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.insertIntoDb);

router.get("/:id", PostController.getSinglePost);

router.patch("/:id", PostController.updateData);

router.delete("/:id", PostController.deleteData);

router.get("/", PostController.getAllData);

export const PostRoutes = router;
