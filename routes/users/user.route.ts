import { Router } from "express";
import User from "./user.model";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body, "req.body");
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users, "users");
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/updateUser/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    console.log(req.body, "req.body");
    console.log(req.params, "req.params");

    const user: any = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name: name ?? user?.name,
      email: email ?? user?.email,
      password: hashedPassword ?? user?.password,
    });

    return res.json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deleteUser/:id", async (req: any, res: any) => {
  try {
    // const { id } = req.params;

    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(user, "user");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
});

export default router;