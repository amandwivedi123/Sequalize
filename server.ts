import App from "./app";
import { sequelize } from "./config/db";
import env from "dotenv";
env.config();
import fs from "fs";
const PORT = process.env.PORT || 3000;
import {seedUsers} from "./seeders/users-seed";


(async () => {
    // await seedUsers();
  try {
    const connection = await sequelize.authenticate();
    console.log("✅ MySQL connected");

    // await sequelize.sync({ alter: true });
    // console.log("✅ Database synced");

    App.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
  }
})();