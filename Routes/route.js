const express = require("express")
const authController = require("../Controllers/controler")
const PostController  = require("../Controllers/postController")
const middlewares = require("../Middleware")
const router = express.Router()


//////// Login and Signup

router.post("/signup",authController.signup)
router.post("/login",authController.login)
router.get("/users",authController.users)

/////////// Get, create, post, put and delete Post

router.post("/posts", middlewares.authmiddleware, PostController.createPost)
router.get("/posts", PostController.getPost)
router.put("/posts", PostController.updatePost)
router.delete("/posts", PostController.deletePost)

module.exports = router