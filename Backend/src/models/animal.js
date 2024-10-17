import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';

export const Animal = sequelize.define('animals', {
    id_animal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    breed_id: {
        type: DataTypes.INTEGER,
    },
    date_entry: {
        type: DataTypes.DATE,
    },
    stimated_date_birth: {
        type: DataTypes.DATE,
    },
    sex: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    image_id: {
        type: DataTypes.STRING,
    },
    history: {
        type: DataTypes.TEXT,
    },
    state_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    }
}); 
export default Animal;