import express from 'express'
import env from "dotenv";
import userRouter from "./routes/users/user.route";
import routes from "./routes";


const app = express();
app.use(express.json());

app.get("/", (req :any , res :any) => {
  res.send("API is running 🚀");
});

app.use("/", routes);


export default app;
