import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "df49yfhlh",
    api_key: "283586487158823",
    api_secret: "2V788XHzxanKt3Vi88arK4LDCbI",
});

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
    folder: "Animales",
});
};

export const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
};

export const updateImage = async (filePath, public_id) => {
    await cloudinary.uploader.destroy(public_id);
    return await cloudinary.uploader.upload(filePath, {
    folder: "Animales",
});
};
// Troste