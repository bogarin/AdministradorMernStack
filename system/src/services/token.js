import jwt from "jsonwebtoken";
import User from "../models/Usuario";
import config from "./config";

async function asignToken(_id) {
  return jwt.sign({ _id: _id }, config.secret_token, {
    expiresIn: "1d"
  });
}

async function decode(token) {
    try {
        const { _id } = await jwt.verify(token, config.secret_token);
        const user = await User.findOne({ _id, estado: 1 });
        return user ? user : false;
    } catch (error) {
      return await checkToken(token);
    }
}

async function encode(_id) {
  return await asignToken(_id)
}


async function checkToken(token) {
  let id = null
  try {
    const { _id } = await jwt.decode(token);
    id = _id;
  } catch (error) {
    return false;    
  }
  const user = await User.findOne({ _id: id, estado: 1 });
  if (user){
    const token = asignToken(id);
    return { token, rol: user.rol };
  }
  return false;
}

module.exports = {
    encode,
    decode
}
