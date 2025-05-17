import { Sequelize } from "sequelize";

const connectionString = process.env.DB_CONNECTION || ''
const environment = process.env.ENVIRONMENT || ''

const sequelize = new Sequelize(connectionString)

export default sequelize

export async function DBconnectionTest() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: environment === 'localhost' });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
