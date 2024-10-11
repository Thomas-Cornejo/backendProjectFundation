import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';


export const Breed = sequelize.define('breeds', {
    id_breed: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    specie_id: {
        type: DataTypes.INTEGER,
    }
},);

export default Breed;