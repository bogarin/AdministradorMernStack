import routerx from "express-promise-router";
import categoriaRouter from "./CategoriaRoute";
import articuloRouter from "./ArticuloRoute";
import usuarioRouter from "./UsuarioRoute";
import personaRouter from "./PersonaRoute";
import IngresoRouter from "./IngresoRoute";
import VentaRouter from "./VentaRoute"
const router = routerx();
router.use("/categorias", categoriaRouter);
router.use("/articulos", articuloRouter);
router.use("/usuarios", usuarioRouter);
router.use("/personas", personaRouter);
router.use("/ingresos", IngresoRouter);
router.use("/ventas", VentaRouter);

module.exports = router;
