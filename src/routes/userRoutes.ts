import express from "express";
import * as userService from "../controllers/user-controllers/userController";
const userRouter = express.Router();
import configuredMulterMiddleware from "../middlewares/image-upload";

userRouter.get("/ucenik", userService.getAllUsers);

userRouter.get("/editUcenik/:id", userService.getEditUser);

userRouter.get("/ucenikProfile/:id", userService.getUser);

userRouter.get("/noviUcenik", userService.getNewUser);

userRouter.post("/noviUcenik", configuredMulterMiddleware, userService.addUser);

userRouter.post("/editUcenik/:id", configuredMulterMiddleware, userService.updateUser);

userRouter.post("/ucenikProfile/:id", userService.updatePassword);

userRouter.delete("/deleteUcenik/:id", userService.deleteUser);

//getRentedBooks za ucenika
userRouter.get("/ucenikIzdate/:id", userService.getRentedBooks);

userRouter.get('/api/users', userService.getAllUsersAPI); // samo JSON za imena ucenika

export default userRouter;
