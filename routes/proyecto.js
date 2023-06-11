const { Router } = require("express");
const {
  createProyecto,
  getProyecto,
  editar_Proyecto,
  eliminar_Proyecto,
} = require("../controllers/proyecto");

const router = Router();

//Crear
router.post("/", createProyecto);

//Listar
router.get("/", getProyecto);

//Editar
router.put("/:id", editar_Proyecto);

//Eliminar
router.delete("/:id", eliminar_Proyecto);

module.exports = router;