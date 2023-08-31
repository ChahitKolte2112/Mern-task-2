import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../model/User";
import { ObjectId } from "mongoose";
const prisma = new PrismaClient();


interface UserResponse {
  id : ObjectId,
  email : string,
  name : string,
  mobileNum:string,

}

export const setToken = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.userData;
    // Generating the Access Token
    const accessToken = jwt.sign(
      {
        id: userData!._id,
        email: userData!.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      }
    );
    // Generating the Refresh Token
    const refreshToken = jwt.sign(
      {
        email: userData!.email,
        id: userData!._id,
      },
      process.env.REFRESH_JWT_SECRET!
    );

    const finalToken = `${accessToken} ${refreshToken}`;
    console.log(finalToken);
    res.set(
      "Set-Cookie",
      cookie.serialize("token", finalToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // At developmet Cookie will be insecure as we do not have SSL with us
        sameSite: "strict",
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME!, 10),
        path: "/", //cookie valid for whole site
      })
    );
    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, mobileNum } = req.body;
    /*
        Will Check if Any User Already Exists with these credintials
    */
    const checkUser = await User.findOne({
      $or:[
        {email: email },
        {mobileNum : mobileNum}
      ]
     
    })
    if (checkUser) {
      return res.status(401).json({
        message: "User with this email/password already exists",
      });
    }

    const passwordHash = await brcypt.hash(password, 10);

    

    const userData  : any = await User.create({
      name : name,
      password: passwordHash,
      email:email,
      mobileNum : mobileNum,
    })
    
    res.locals.userData = userData;
    
    return next();

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credential, password } = req.body;
    /* Check if there is any user exists in database */
    let user : any= await User.findOne({
      $or:[
        {mobileNum:credential},
        {email : credential}
      ] 
    })
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const matchPassword = await brcypt.compare(password, String(user.password));

    if (matchPassword) {
      res.locals.userData = user;

      return next();
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const Me = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.userData;
   
    const user = await User.findById({
      _id : id
    })
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ logOut: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
