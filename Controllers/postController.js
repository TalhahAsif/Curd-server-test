const { middlewares } = require("../Middleware");
const postModel = require("../Modals/postSchema");

 const PostController = {
    createPost: (req, res) => {
      const headers = req.headers
      // console.log(headers.authorization)
      postModel.create(req.body, (err, post) => {
        console.log(req.body , "body")
        if (err) {
          res.json({
            messege:"Something went wrong"
          })
        } else {
          res.json({
            message: "The Post is succesfully created",
            post: post,
          });
        }
      });
    },

    getPost: (req, res) => {
        postModel.find((err, post) => {
          if (err) {
            res.json({
              massege: `Something went Wrong`,
            });
          } else {
            res.json({
              massege: "Post founded",
              post,
            });
          }
        });
      },

     updatePost: (req, res) => {
        const { id, post } = req.body;
        postModel.findByIdAndUpdate(id, { post }, {new: true} ,(err, post) => {
          if(err){
            res.json({
              message: "error" ,
              err: err,
            }
            )
          }else{
            res.json({
              message: "post updated",
              post: post,
            })
          }
        });
      },

      deletePost: (req, res) => {
        const { id } = req.body;
        console.log(req.body)
        postModel.findByIdAndDelete(id ,(err, post) => {
          if(err){
            res.json({
              message: "error" ,
              err: err,
            }
            )
          }else{
            res.json({
              message: "post is deleted successfully",
              post: post,
            })
          }
        });
      }
  }


  module.exports = PostController