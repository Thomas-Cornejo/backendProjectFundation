// import Sequelize from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// export const sequelize = new Sequelize(process.env.MYSQL_URL, {
//   define: { timestamps: false },
// });
import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});