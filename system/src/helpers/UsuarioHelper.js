function CompareToPwdAndUpdateUser(user,oldpwd) {
    if (user.password != oldpwd) {
        return  {
            rol: user.rol,
            nombre: user.nombre,
            tipo_documento: user.topo_documento,
            num_documento: user.num_documento,
            direccion: user.direccion,
            telefono: user.telefono,
            email: user.email,
            password: user.password
        }
    }
    return  {
        rol: user.rol,
        nombre: user.nombre,
        tipo_documento: user.topo_documento,
        num_documento: user.num_documento,
        direccion: user.direccion,
        telefono: user.telefono,
        email: user.email
    }
}
async function validateUserEmail(req,Usuario,bcrypt) {
    try {
        let user = await Usuario.findOne({ email: req.body.email });
    if (user) {
        return await bcrypt.compare(req.body.password, user.password);
    }
        return -1;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    CompareToPwdAndUpdateUser,
    validateUserEmail
}