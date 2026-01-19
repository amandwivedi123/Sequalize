import { Request, Response } from "express";
import User from "./user.model";

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body, "Userrrrrrrrrrrrrr");
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
