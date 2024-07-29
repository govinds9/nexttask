import { Router } from "express";
import { Auth, LoginUser, registerUser } from "../controllers/user.Controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";



const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(LoginUser)
router.route("/Auth").get(verifyJwt,Auth)



export default router