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
    const { id_user } = req.params;
    const user = await Usuario.findOne({
      where: {
        id_user,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, lastname, phone, email, address, password, rol_id } = req.body;
  try {
    const newUser = await Usuario.create({
      name,
      lastname,
      phone,
      email,
      address,
      password,
      rol_id
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, phone,  email, address, password, rol_id } = req.body;

    const user = await Usuario.findByPk(id);
    user.name = name;
    user.lastname = lastname;
    user.phone = phone;
    user.email = email;
    user.address = address;
    user.password = password;
    user.rol_id = rol_id;
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
    
    const usuarios = await Usuario.findAll({
      where: { rol_id: rol },
      include: [{
        model: Rol,
        attributes: ['name']  // Obtiene solo el nombre del rol
      }],
    });
    // Formatea la respuesta para incluir el nombre del rol
    const usuariosConRol = usuarios.map(usuario => ({
      ...usuario.toJSON(),
      rol: usuario.Rol.nombre  // Añade el nombre del rol en lugar del ID
    }));
    res.json(usuariosConRol);
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
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
    });
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: "Correo no encontrado",
      });
    }
    //si la contraseña no coincide
    if (password !== usuario.password) {
      return res.status(403).json({
        error: true,
        msg: "Datos incorrectos",
      });
    }
    res.status(201).json({
      error: false,
      //Muestra el id del usuario
      usuario: usuario.dataValues.id_user,
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
    const { email, password } = req.body;

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
    usuario.password = password;
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

