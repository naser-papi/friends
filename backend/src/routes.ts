import express from "express";
import {upload} from "./configs";
import {login, register} from "./controllers/Auth";
import {verifyTokenMW} from "./middleware/AccessManagment";
import {addRemoveFriend, getUseFriends, getUser, getUserPosts} from "./controllers/User";
import {createPost, getPostFeed, likePost} from "./controllers/Post";

const withErrorHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
    res.send("MERN server is ready to move on");
})

/*Auth Routes*/
apiRouter.post("/auth/register", upload.single("picture"), register)
apiRouter.post("/auth/login", upload.single("picture"), login)


/*User Routes*/
apiRouter.get("/user/:id", verifyTokenMW, withErrorHandler(getUser))
apiRouter.get("/user/:id/friends", verifyTokenMW, withErrorHandler(getUseFriends))
apiRouter.get("/user/:id/posts", verifyTokenMW, withErrorHandler(getUserPosts))
apiRouter.patch("/user/:id/:friendId", verifyTokenMW, withErrorHandler(addRemoveFriend))

/*Post Routes*/
apiRouter.post("/post", verifyTokenMW, upload.single("picture"), withErrorHandler(createPost))
apiRouter.get("/post", verifyTokenMW, withErrorHandler(getPostFeed))
apiRouter.post("/post/:id", verifyTokenMW, withErrorHandler(likePost))


export default apiRouter;