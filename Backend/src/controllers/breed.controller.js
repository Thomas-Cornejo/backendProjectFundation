import { Breed } from '../models/breed.js'
export const getBreeds = async (req, res) => {
    try {
        const breeds = await Breed.findAll(); 
        res.json(breeds);
    } catch (error) {
        return res.status(500).json({ msg: "Error al obtener razas", error });
    }
};
