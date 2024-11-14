import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../database/database.js';
import { Usuario } from './usuario.js';
import { Animal } from './animal.js';

export const Adoption = sequelize.define('aoption', {
    id_adoption: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_user',
        },
    },
    id_animal: {
        type: DataTypes.INTEGER,
        references: {
            model: Animal,
            key: 'id_animal',
        },
    },
    date_adoption: {
        type: DataTypes.DATE,
    },
    
});
export default Adoption;