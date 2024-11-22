import { DataTypes } from "sequelize";
import { sequelize } from '../database/database.js';

export const SponsorshipAdopted = sequelize.define("sponsorship_adopteds", {
    id_sponsorship_adopted: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sponsorship_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default SponsorshipAdopted;