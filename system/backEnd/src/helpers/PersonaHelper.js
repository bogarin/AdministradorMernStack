function UpdatePersona(persona) {
        return  {
            tipo_persona: persona.tipo_persona,
            nombre: persona.nombre,
            tipo_documento: persona.topo_documento,
            num_documento: persona.num_documento,
            direccion: persona.direccion,
            telefono: persona.telefono,
            email: persona.email,
        }
}

module.exports = {
    UpdatePersona
}