import { Application } from "express";
import userRouter from "./users/user.route";

export const registerRoutes = (app: Application) => {
  app.use("/users", userRouter);
};