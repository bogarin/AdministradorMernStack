import routerx from "express-promise-router";
import categoriaRouter from "./CategoriaRoute";
import articuloRouter from "./ArticuloRoute";
import usuarioRouter from "./UsuarioRoute";
import personaRouter from "./PersonaRoute";
const router = routerx();
router.use("/categorias", categoriaRouter);
router.use("/articulos", articuloRouter);
router.use("/usuarios", usuarioRouter);
router.use("/personas", personaRouter);

module.exports = router;
