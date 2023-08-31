import { NextFunction, Request, Response } from "express";

import Post from "../model/SocialMediaPost";
import { ObjectId } from "mongoose";
export const create = async (req: Request, res: Response) => {
    try {
        const { title, image, description } = req.body;
        console.log(title, image, description);
        if (!title || !description) {
            res.status(401);
            throw new Error("Please Provide all the filled");
        }
        const obj = {
            user: res.locals.userData.id,
            title,
            image,
            description,
        };
        const response = await Post.create({
            user: res.locals.userData.id,
            title,
            image,
            description,
        });

        // await Post.findByIdAndUpdate(
        //     {
        //         _id: response?._id,
        //     },
        //     {
        //         $push: {
        //             comments: {
        //                 userId: res.locals.userData?._id,
        //                 comment: "hello this is kanha",
        //             },
        //         },
        //     }
        // );

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
export const getall = async (req: Request, res: Response) => {
    try {
        const response = await Post.find({ user: res.locals.userData.id });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
export const deletepost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await Post.findByIdAndDelete(req.params.id);
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Expense Data not found",
            });
        }
        return res.status(200).json({
            message: "Deleted Successfully",
            success: true,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
export const updatepost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(400);
            throw new Error("Expense Data not Found");
        }

        if (post.user.toString() !== res.locals.userData.id) {
            res.status(401);
            throw new Error("User not authorized");
        }
        const response = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            response,
            message: "updated sucessfully",
        });
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const userId: ObjectId = res.locals?.userData?._id;
        console.log(userId);

        await Post.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $push: {
                    likes: {
                        userId: userId,
                    },
                },
            }
        );
        const updatePost = await Post.findById({
            _id: postId,
        });
        return res.json(updatePost);
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: error.message,
        });
    }
};
