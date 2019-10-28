import routex from "express-promise-router";
import CtrlUsuario from "../controllers/UsuarioControllers";
import authUsers from "../middleware/auth";
const router = routex();
router.post("/add", authUsers.verifyAdministrator, CtrlUsuario.add);
router.post("/login", CtrlUsuario.login);
router.get("/query", authUsers.verifyAdministrator, CtrlUsuario.query);
router.get("/list", authUsers.verifyAdministrator, CtrlUsuario.list);
router.put("/update", authUsers.verifyAdministrator, CtrlUsuario.update);
router.put("/activate", authUsers.verifyAdministrator, CtrlUsuario.activate);
router.put(
  "/deactivate",
  authUsers.verifyAdministrator,
  CtrlUsuario.deactivate
);
router.delete("/remove", authUsers.verifyAdministrator, CtrlUsuario.remove);
module.exports = router;
