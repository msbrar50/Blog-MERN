import express from "express"

import { login, logout, myprofile, register, updateProfile } from "../controllers/user_controller.js"

const router = express.Router()

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/myprofile").get(myprofile)

router.route("/updateprofile").post(updateProfile)

export default router;