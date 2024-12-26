import express from "express";
import userRoutes from "./routes/usuario.routes.js";
import animalRoutes from "./routes/animal.routes.js";
import requestRoutes from "./routes/request.routes.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import bcrypt from "bcrypt";
import { Usuario } from "./models/usuario.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
const allowedOrigins = ["http://127.0.0.1:5501"];

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("middleware");
  const token = req.cookies.access_token;
  req.session = { usuario: null };
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_LEY);
      req.session.usuario = data;
    } catch (err) {
      console.error("Error al verificar el token:", err.message);
    }
  }
  next();
});

app.post("/api/auth/me", (req, res) => {
  const { token } = req.body
  console.log("api");
  console.log(token);
  var rol=0
  if (!token)
    return res.status(401).json({ error: "Usuario no autenticado" });
  
  jwt.verify(token, process.env.SECRET_LEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token no válido" });
    console.log(token);
    rol = user.rol;
    console.log(rol);
  });

  res.json({ rol });
});

app.get("/", (req, res) => {
  const { usuario } = req.session;
  console.log("user:  " + usuario);
  // Implementación de registro
});

app.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const usuario = await Usuario.findOne({
      where: { email },
    });
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Correo no encontrado",
      });
    }
    const isValid = bcrypt.compareSync(password, usuario.password);
    if (!isValid) {
      return res.status(403).json({
        error: true,
        msg: "Datos incorrectos",
      });
    }
    const token = jwt.sign(
      { id_user: usuario.id_user, name: usuario.name, rol: usuario.rol_id },
      process.env.SECRET_LEY,
      { expiresIn: "1h" }
    );
    console.log("login    " + token);

    res.send({
      rol: usuario.rol_id,
      usuario,
      token,
      
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Error en el login.",
    });
  }
});

app.post("/register", async (req, res) => {
  const { name, lastname, phone, email, address, password, rol_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({
      name,
      lastname,
      phone,
      email,
      address,
      password: hashedPassword,
      rol_id:2,
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/protected", (req, res) => {
  const { usuario } = req.session;
  if (!usuario)
    return res
      .status(403)
      .send({ message: "Acceso denegado. No hay token en la cookie." });
  res.render("protected/", data);
});

app.use(userRoutes);
app.use("/animals", animalRoutes);
app.use("/", requestRoutes);
export default app;
