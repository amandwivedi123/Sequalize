import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
  logging: false,
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection  established successfully.");
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
})();