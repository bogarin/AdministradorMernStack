import routerx from "express-promise-router";
import categoriaRouter from "./CategoriaRoute";
import articuloRouter from "./ArticuloRoute";
const router = routerx();
router.use("/categorias", categoriaRouter);
router.use("/articulos", articuloRouter);

module.exports = router;
