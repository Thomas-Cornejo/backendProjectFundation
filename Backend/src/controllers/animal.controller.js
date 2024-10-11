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
        const { id_animal } = req.params;
        const animal = await Animal.findOne({
            where: {
                id_animal,
            },
        });   
        if (!animal) return res.status(404).json({ message: "Animal not found" });
        res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAnimal = async (req, res) => {
    const { name, breed_id, date_entry, stimated_date_birth, sex, size, color, history, status_id } = req.body;
    console.log(req.files); 
    let image = null;
    let image_id = null;

    if (req.files && req.files.image) { // Verifica si hay un archivo
        const result = await uploadImage(req.files.image.tempFilePath);
        fs.remove(req.files.image.tempFilePath);
        image = result.secure_url;
        image_id = result.public_id;
    }

    try {
        const newAnimal = await Animal.create({
            name,
            breed_id,
            date_entry,
            stimated_date_birth,
            sex,
            size,
            color,
            history,
            status_id,
            image,
            image_id,
        });
        res.json(newAnimal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateAnimal = async (req, res) => {
    let image = null;
    let image_id = null;
    try {
        const { id_animal } = req.params;
        const animal = await Animal.findByPk(id_animal);
        console.log(animal)
        const { name, breed_id, date_entry, stimated_date_birth, sex, size, color, history, status_id } = req.body;
        if (!req.files) {
            //actualiza con la imagen actual
            await animal.update({
                color: colorame,
                breed_id,
                date_entry,
                stimated_date_birth,
                weigth,
                sex,
                size,
                color,
                history,
                status_id,
            });
        } else {
            const result = await updateImage(
            req.files.image.tempFilePath,
            animal.dataValues.id_image
            );
            fs.remove(req.files.image.tempFilePath);
            image = result.secure_url;
            id_image = result.public_id;
            // Actualizar el usuario
            await animal.update({
                name,
                breed_id,
                date_entry,
                stimated_date_birth,
                weigth,
                sex,
                size,
                color,
                history,
                status_id,
                image,
                image_id,
            });
        }
        res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAnimal = async (req, res) => {
    try {
        const { id_animal } = req.params;
        const animal = await Animal.findOne({
            where: {
                id,
            },
        });
        if (animal.id_image) {
            await deleteImage(animal.image_id);
        }
        await animal.destroy({
            where: {
                id_animal,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};