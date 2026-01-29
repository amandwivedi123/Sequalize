import { Router } from "express";
import Product from "./product.modal";

const router = Router();

router.post("/createProduct", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if(!name || !description || !price || !category){
        return res.status(400).json({message : "All fields are required"});
    }
 const products =  await Product.create({
    name,
    description,
    price,
    category,
 })
 res.status(201).json({message : "Product created successfully" , data : products});
  } catch (err: any) {
    console.log(err, "ERROR");
    return res.status(500).json({ message: err.message });
  }
});
router.get("/getAllProducts", async (req, res) => {
  try {
    const product: any = await Product.findAll();
    console.log(product);

    if(!product) {
        res.status(400).json({message : "No Products found"})
    }
    res.json({message : "Products fetched successfully" , data : product});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
