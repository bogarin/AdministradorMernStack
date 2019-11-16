import tokenService from "../services/token";

async function verifyUser(req, res, next) {
  if (!req.headers.token) {
    return res.status(404).send({
      message: "no token"
    });
  }
  const response = await tokenService.decode(req.headers.token);
  if (!checkIfHasRole(response.rol)) {
    return res
      .status(403)
      .send({ message: "no autorizadotoken no autorizado" });
  }
  next();
}

async function verifyAdministrator(req, res, next) {
  if (!req.headers.token) {
    return res.status(404).send({
      message: "no token"
    });
  }
  const response = await tokenService.decode(req.headers.token);
  return response.rol == "administrador"
    ? next()
    : res.status(403).send({ message: "token no autorizado Admin" });
}

async function verifyStorer(req, res, next) {
  if (!req.headers.token) {
    return res.status(404).send({
      message: "no token"
    });
  }
  const response = await tokenService.decode(req.headers.token);
  return response.rol == "administrador" || rol == "almacenero"
    ? next()
    : res.status(403).send({ message: "no autorizado" });
}

async function verifySeller(req, res, next) {
  if (!req.headers.token) {
    return res.status(404).send({
      message: "no token"
    });
  }
  const response = await tokenService.decode(req.headers.token);
  return response.rol == "administrador" || rol == "vendedor"
    ? next()
    : res.status(403).send({ message: "no autorizado" });
}
function checkIfHasRole(rol) {
  return rol == "administrador" || rol == "almacenero" || rol == "vendedor"
    ? true
    : false;
}

module.exports = {
  verifyUser,
  verifyAdministrator,
  verifyStorer,
  verifySeller
};
