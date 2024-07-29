import { Router } from "express";
import {  creatTask, getAlltask, LoginUser, logOutUser, registerUser } from "../controllers/user.Controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";



const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(LoginUser)
router.route("/logout").post(verifyJwt,logOutUser)
router.route("/create").post(verifyJwt,creatTask)
router.route("/alltask").get(verifyJwt,getAlltask)



export default router