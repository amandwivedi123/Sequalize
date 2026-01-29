import { Router } from "express";
import Customer from "./customer.model";

const router = Router();

router.get("/getAllCustomers", async (req, res) => {
  try {
    const customer =  Customer.findAll();

    // if (!customer) {
    //   res.status(400).json({ message: " No customer found" });
    // }
    res.json({message : "Customer fetched successfully" , data : customer});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/createCustomer", async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body, "req.body");
    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const customer = await Customer.create({
      name,
      email,
    });
    res.status(201).json(customer);
  } catch (error: any) {
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
});

router.get("/getCustomerById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    console.log(customer, "customer");
    if (!customer) {
      return res.status(400).json({ message: "No customer found" });
    }
    res.json({ message: "Got customer successfully", data: customer });
  } catch (error: any) {
    console.log(error, "error");
    return res.status(500).json({ message: error.message });
  }
});

router.put("/updateCustomer/:id", async (req, res: any) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const customer: any = await Customer.findByPk(id);

    if (!customer) {
      res.status(404).json({ message: "No user found" });
    }
    if (email && email != customer.email) {
      const existingEmail = await Customer.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({ message: " Email already in use" });
      }
    }
    await customer.update({
        name : name ??  customer.name,
        email : email ?? customer.email
    })
    res.json({message : "Customer updated successfully" , data : customer})
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deleteCustomer/:id", async (req, res: any) => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const customer = await Customer.findByPk(id);
    console.log(customer, "customer");
    if (!customer) {
      return res.status(400).json({ message: "No customer found" });
    }
    await customer.destroy();
    res.json({ message: "Customer deleted successfully", data: customer });
  } catch (error: any) {
    console.log(error, "error");
    return res.status(500).json({ message: error.message });
  }
});

export default router;
