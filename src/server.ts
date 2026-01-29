import App from "./app";
import { sequelize } from "./config/db";
import env from "dotenv";
env.config();
import fs from "fs";
const PORT = process.env.PORT || 3000;

import User  from "./routes/users/user.model";


(async () => {
  try {
    const connection = await sequelize.authenticate();
    console.log("✅ MySQL connected");
    // 2️⃣ Sync models (DEV ONLY)
    // await sequelize.sync({ alter: true });
    // console.log("✅ Database synced");

    App.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
  }
})();