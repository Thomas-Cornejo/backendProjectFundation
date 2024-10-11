import { Usuario } from "../models/usuario.js";


export const getUsers = async (req, res) => {
  try {
    const user = await Usuario.findAll();
    // console.log(user);
    res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "No se pueden listar los usuarios", error });
  }
};

export const getUser = async (req, res) => {
  
  try {
    const { id } = req.params;
    const user = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, lastname, email, contraseña } = req.body;

  try {
    const newUser = await Usuario.create({
      name,
      lastname,
      email,
      contraseña,
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, cedula, telefono, contraseña } = req.body;

    const user = await Usuario.findByPk(id);
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.cedula = cedula;
    user.telefono = telefono;
    user.contraseña = contraseña;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ----------------Filtrar Usuarios por rol----------------
export const filtrarUsuarios = async (req, res) => {
  try {
    const { rol } = req.params;
    console.log(rol);

    // if (
    //   rol === "Admin" ||
    //   rol === "Veterinario" ||
    //   rol === "Secretario" ||
    //   rol === "Voluntario" ||
    //   rol === "Padrino" ||
    //   rol === "Adoptante"
    // ) {
      const usuarios = await Usuario.findAll({
        where: { rol: rol },
      });
      res.json(usuarios);
    // } else {
    //   res.status(400).json({
    //     msg: "Rol no válido",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo listar los usuarios",
      error,
    });
  }
};

//----------------VERIFICAR ADMIN--------------------
export const verificarAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // verificar si existe
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ error: true, msg: "Usuario no encontrado" });
    }

    // si ID_ROL es 1, es admin
    const esAdmin = usuario.rol === "Admin";

    res.status(200).json({ esAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      msg: "Error al verificar el estado de administrador",
    });
  }
};

//-------------Usuario Login--------------------------
export const usuarioLogin = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({
      where: { email },
    });
    console.log(usuario);
    //si el usuario no existe
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Correo no encontrado",
      });
    }
    //si la contraseña no coincide
    if (contraseña !== usuario.contraseña) {
      return res.status(403).json({
        error: true,
        msg: "Datos incorrectos",
      });
    }
    res.status(201).json({
      error: false,
      usuario: usuario.id,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Error en el login.",
    });
  }
};
// --------------Cambiar Contraseña------------------
export const cambiarContraseña = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Busca el usuario
    const usuario = await Usuario.findOne({
      where: { email },
    });
    //si el usuario no existe
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Correo no encontrado",
      });
    }

    // Actualizar el usuario
    usuario.contraseña = contraseña;
    await usuario.save();
    res.status(200).json({
      error: false,
      msg: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Error al actualizar contraseña",
    });
  }
};

