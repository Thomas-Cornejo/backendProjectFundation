import express from 'express'
import userRoutes from './routes/usuario.routes.js'
import animalRoutes from './routes/animal.routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express()

//middlewares
app.use(
    cors({
      origin: "*",
    })
);
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir: './upload'
}));
app.use(userRoutes)
app.use("/animals",animalRoutes);


export default app;