import bcrypt from "bcryptjs";

 async function getHash(password) {
     return await bcrypt.hash(password, 10);
 }

 module.exports=getHash