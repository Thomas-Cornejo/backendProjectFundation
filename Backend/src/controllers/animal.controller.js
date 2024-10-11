import { Animal } from "../models/animal.js";
import {
    deleteImage,
    updateImage,
    uploadImage,
} from "../Libs/cloudinary.animal.js";
import fs from "fs-extra";
export const getAnimals = async (req, res) => {
    try {
        const animal = await Animal.findAll();
        res.json(animal);
    } catch (error) {
        return res
            .status(500)
            .json({ msg: "No se pueden listar los animales", error });
    }
};

export const getAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findOne({
            where: {
                id,
            },
        });   
        if (!animal) return res.status(404).json({ message: "Animal not found" });
        res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAnimal = async (req, res) => {
    const { name, age, race, gender, weigth } = req.body;
    console.log(req.files);
    let imagen = null;
    let id_imagen = null;
    if (req.files.imagen) {
        const result = await uploadImage(req.files.imagen.tempFilePath);
        fs.remove(req.files.imagen.tempFilePath);
        imagen = result.secure_url;
        id_imagen = result.public_id;
    }
    try {
        const newAnimal = await Animal.create({
            name,
            age,
            race,
            gender,
            weigth,
            imagen,
            id_imagen,
        });
        res.json(newAnimal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAnimal = async (req, res) => {
    let imagen = null;
    let id_imagen = null;
    try {
        const { id } = req.params;
        const animal = await Animal.findByPk(id);
        console.log(animal)
        const { name, age, race, gender,  weigth } = req.body;
        if (!req.files) {
            //actualiza con la imagen actual
            await animal.update({
                name,
                age,
                race,
                gender,
                weigth,
            });
        } else {
            const result = await updateImage(
            req.files.imagen.tempFilePath,
            animal.dataValues.id_imagen
            );
            fs.remove(req.files.imagen.tempFilePath);
            imagen = result.secure_url;
            id_imagen = result.public_id;
            // Actualizar el usuario
            await animal.update({
                name,
                age,
                race,
                gender,
                date,
                weigth,
                imagen,
                id_imagen,
            });
        }
        res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const animal = await Animal.findOne({
            where: {
                id,
            },
        });
        if (animal.id_imagen) {
            await deleteImage(animal.id_imagen);
        }
        await animal.destroy({
            where: {
                id,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};