import { Sponsorship } from '../models/sponsorship.js';
import { Usuario } from '../models/usuario.js';
import { Animal } from '../models/animal.js';

export const getSponsorship = async (req, res) => {
    try {
        const { id_sponsorship } = req.params;
        const sponsorship = await Sponsorship.findOne({
            where: {
                id_sponsorship,
            },
            include: [{ model: Usuario }, { model: Animal }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createSponsorship = async (req, res) => {
    const { user_id, animal_id, sponsorship_date_start, sponsorship_date_end, amount_donate, donacion_id } = req.body;
    try {
        const newSponsorship = await Sponsorship.create({
            user_id,
            animal_id, sponsorship_date_start,
            sponsorship_date_end,
            amount_donate,
            donacion_id
        });
        res.json(newSponsorship);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteSponsorship = async (req, res) => {
    try {
        const { id_sponsorship } = req.params;
        await Sponsorship.destroy({
            where: {
                id_sponsorship,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}