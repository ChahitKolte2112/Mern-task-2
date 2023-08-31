import {Request,Response,Router} from "express";
import { verifyToken } from "../middleware/auth";
import {
    create,getall,deletepost,updatepost,likePost
} from '../controllers/post.contoller'
const router = Router();
router.post('/add-post',verifyToken,create);
router.get('/all-post',verifyToken,getall);
router.delete('/delete-post/:id',verifyToken,deletepost);
router.put('/update-post/:id',verifyToken,updatepost);
router.get('/like-post/:postId',verifyToken,likePost)
export default router;