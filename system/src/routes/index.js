import routerx from "express-promise-router";
import categoriaRouter from "./CategoriaRoute";
import articuloRouter from "./ArticuloRoute";
import usuarioRouter from "./UsuarioRoute";
const router = routerx();
router.use("/categorias", categoriaRouter);
router.use("/articulos", articuloRouter);
router.use("/usuarios", usuarioRouter);

module.exports = router;
