import { Sequelize } from "sequelize";

const db = process.env.DB_NAME || "sichai_sathi";
const user = process.env.DB_USER || "roshs";
const password = process.env.DB_PASS || "admin";

const sequelize = new Sequelize(db, user, password, {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
  logging: false, // Disable logging, optional
});

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true }); // Creates or updates tables
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
export { syncDb };
export default sequelize;
