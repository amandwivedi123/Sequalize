import { Router } from "express";
import userRouter from "./users/user.route";
import productRouter from "./products/product.routes";
import customerRouter  from "./customers/customer.route"

const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/customers", customerRouter);


export default router;