import routex from "express-promise-router";
import CtrlPersona from "../controllers/PersonaController";
import authUsers from "../middleware/auth";
const router = routex();
router.post("/add", authUsers.verifyUser, CtrlPersona.add);
router.get("/query", authUsers.verifyUser, CtrlPersona.query);
router.get("/list", authUsers.verifyUser, CtrlPersona.list);
router.get("/listClientes", authUsers.verifyUser, CtrlPersona.listClientes);
router.get("/listProveedores", authUsers.verifyUser, CtrlPersona.listProveedores);
router.put("/update", authUsers.verifyUser, CtrlPersona.update);
router.put("/activate", authUsers.verifyUser, CtrlPersona.activate);
router.put(
  "/deactivate",
  authUsers.verifyUser,
  CtrlPersona.deactivate
);
router.delete("/remove", authUsers.verifyUser, CtrlPersona.remove);
module.exports = router;