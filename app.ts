import express from 'express'
import env from "dotenv";
import userRouter from "./routes/users/user.route";
import { registerRoutes } from "./routes/route-index";

const app = express();
app.use(express.json());

app.get("/", (req :any , res :any) => {
  res.send("API is running 🚀");
});

registerRoutes(app);

export default app;
