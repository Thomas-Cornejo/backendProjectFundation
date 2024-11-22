import { Requests } from "../models/requests.js";
import { Usuario } from '../models/usuario.js'
import { Animal } from "../models/animal.js";
import { jsPDF } from "jspdf";
import nodemailer from "nodemailer";
import fs from "fs";

export const createRequest = async (req, res) => {
    try {
        const { userId, animalId, questions } = req.body;
        const { reason, experience, time, cost, notification, events, availability, question } = questions;

        if (!userId || !animalId) {
            return res.status(400).json({ message: "userId y animalId son requeridos" });
        }
        const user = await Usuario.findByPk(userId); 
        const animal = await Animal.findByPk(animalId);

        if (!user || !animal) {
            return res.status(404).json({ message: "Usuario o animal no encontrado" });
        }

        const userName = user.name; 
        const animalName = animal.name;

        const newRequest = await Requests.create({
            user_id: userId,
            animal_id: animalId,
            status: "pendiente",
            date_request: new Date(),
        });

        const tempDir = "./temp";
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir); 
        }

        const fields = [
            { label: "Nombre del Usuario", value: userName },
            { label: "Nombre del Animal", value: animalName },
            { label: "Razón para apadrinar", value: reason },
            { label: "Experiencia previa", value: experience },
            { label: "Tiempo disponible", value: time },
            { label: "Capacidad económica", value: cost },
            { label: "Notificaciones de salud", value: notification },
            { label: "Interés en eventos", value: events },
            { label: "Disponibilidad para visitas", value: availability },
            { label: "Otras preguntas", value: question },
        ];

        for (const field of fields) {
            if (typeof field.value !== "string" || field.value.trim() === "") {
                console.error(`Error en el campo "${field.label}": El valor es inválido (${field.value})`);
                return res.status(400).json({ message: `El campo "${field.label}" tiene un valor inválido.` });
            }
        }

        
        const doc = new jsPDF();
        doc.text("Cuestionario de Apadrinamiento", 10, 10);
        doc.text(`Nombre del Usuario: ${userName}`, 10, 20);
        doc.text(`Nombre del Animal: ${animalName}`, 10, 30);
        doc.text("Respuestas del formulario:", 10, 40);

        // Generar contenido dinámico del PDF con validación
        const questionAnswers  = [
            { question: "1. ¿Por qué te gustaría apadrinar un animal?", answer: reason },
            { question: "2. ¿Has apadrinado algún animal antes?", answer: experience },
            { question: "3. ¿Cuánto tiempo estás dispuesto a comprometerte para el apadrinamiento?", answer: time },
            { question: "4. ¿Estás dispuesto a cubrir gastos asociados con el cuidado animal?", answer: cost },
            { question: "5. ¿Te gustaría recibir actualizaciones periódicas sobre el animal que apadrines?", answer: notification },
            { question: "6. ¿Estás interesado en participar en actividades o eventos organizados por la fundación?", answer: events },
            { question: "7. ¿Cuál es tu disponibilidad para participar en el cuidado y apoyo del animal?", answer: availability },
            { question: "8. ¿Tienes alguna pregunta o inquietud sobre el proceso de apadrinamiento?", answer: question },
        ];

        let yOffset = 50;
        for (const { question, answer } of questionAnswers) {
            doc.text(question, 10, yOffset);
            doc.text(answer, 10, yOffset + 10, { maxWidth: 180 });
            yOffset += 30;
        }

        const pdfPath = `${tempDir}/questionnaire_${newRequest.id_request}.pdf`;
        doc.save(pdfPath)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "f40549589@gmail.com", 
                pass: "pvxe mlgc ahuh tutp", 
            },
        });
        
        const mailOptions = {
            from: '"Fundación Mi Mejor Amigo" <f40549589@gmail.com>', 
            to: "dmnfndcnnml@gmail.com", 
            subject: "Nueva Solicitud de Apadrinamiento",
            text: `El usuario ${userName} ha enviado una nueva solicitud para apadrinar a ${animalName}. Se adjunta el cuestionario en formato PDF.`,
            attachments: [
                {
                    filename: `questionnaire_${newRequest.id_request}.pdf`,
                    path: pdfPath,
                },
            ],
        };
        
        await transporter.sendMail(mailOptions);

        fs.unlinkSync(pdfPath);

        res.status(201).json({ message: "Solicitud creada y correo enviado exitosamente" });
    } catch (error) {
        console.error("Error al manejar la solicitud:", error);
        res.status(500).json({ message: "Error al crear la solicitud." });
    }
};

export const getRequests = async (req, res) => {
    try {
        const { status } = req.query;

        const whereClause = status ? { status } : {};
        const requests = await Requests.findAll({ where: whereClause });

        res.status(200).json({ message: 'Solicitudes obtenidas con éxito', data: requests });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las solicitudes' });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { id_request } = req.params;
        const { status } = req.body;

        if (!status || !['pendiente', 'aprobada', 'rechazada'].includes(status)) {
            return res.status(400).json({ message: 'Estado inválido o no proporcionado' });
        }

        const request = await Requests.findByPk(id_request);
        if (!request) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }
        request.status = status;
        await request.save();

        res.status(200).json({ message: 'Estado actualizado con éxito', data: request });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al actualizar el estado' });
    }
};