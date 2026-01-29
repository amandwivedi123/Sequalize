import express from 'express'
import env from "dotenv";
import userRouter from "./users/user.route";


const app = express();
app.use(express.json());

app.get("/", (req :any , res :any) => {
  res.send("API is running 🚀");
});

app.use("/users", userRouter);

export default app;
