import Sequelize from "sequelize";


const DB_NAME = "fundaciondb"
const DB_USER = "root"
const DB_PASSWORD = ""    
export const sequelize = new Sequelize('fundaciondb', 'root', '',{
  host: "localhost",
  dialect: "mysql",
});
