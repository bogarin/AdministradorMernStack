function CompareToPwdAndUpdateUser(user, oldpwd) {
  if (user.password != oldpwd) {
    return {
      rol: user.rol,
      nombre: user.nombre,
      tipo_documento: user.topo_documento,
      num_documento: user.num_documento,
      direccion: user.direccion,
      telefono: user.telefono,
      email: user.email,
      password: user.password
    };
  }
  return {
    rol: user.rol,
    nombre: user.nombre,
    tipo_documento: user.topo_documento,
    num_documento: user.num_documento,
    direccion: user.direccion,
    telefono: user.telefono,
    email: user.email
  };
}
async function validateUserEmail(req, Usuario, bcrypt) {
  try {
    let user = await Usuario.findOne({ email: req.body.email });
    if (user) {
        let userPassword = user.password;
        let reqPassword=req.body.password;
      let match = await bcrypt.compare(reqPassword, userPassword);
      console.log(match);
      if (match) {
        return user;
      }
      return match;
    }
    console.log("selo brinca?");
    return -1;
  } catch (error) {
    throw error;
  }
}

async function addUserList(Usuario, bcrypt, req) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  return await Usuario.create(req.body);
}

module.exports = {
  CompareToPwdAndUpdateUser,
  validateUserEmail,
  addUserList
};
