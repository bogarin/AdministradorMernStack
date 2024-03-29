import routex from "express-promise-router";
import CtrlCategoria from "../controllers/CategoriaControllers";
const router = routex();
router.post("/add", CtrlCategoria.add);
router.get("/query", CtrlCategoria.query);
router.get("/list", CtrlCategoria.list);
router.put("/update", CtrlCategoria.update);
router.put("/activate", CtrlCategoria.activate);
router.put("/deactivate", CtrlCategoria.deactivate);
router.delete("/remove", CtrlCategoria.remove);
module.exports = router;
