import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,        // database
  process.env.DB_USER!,        // username
  process.env.DB_PASSWORD!,    // ✅ password (FIXED)
  {
    host: process.env.DB_HOST || "127.0.0.1", // ✅ FIXED
    dialect: "mysql",                          // ✅ REQUIRED
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection  established successfully.");
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
})();