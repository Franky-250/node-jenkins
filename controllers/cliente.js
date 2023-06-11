const Cliente = require ("../models/cliente");
const { request, response } = require("express");

//Crear
const createCliente = async (req = request, res = response) => {
  try {
    const data = req.body;
    const email = data.email;
    console.log(data);
    const clienteBD = await Cliente.findOne({ email });
    if (clienteBD) {
      return res.status(400).json({ msg: "Ya existe Cliente" });
    }
    const cliente = new Cliente(data);
    console.log(cliente);
    await cliente.save();
    return res.status(201).json(cliente);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

//Listar
const getCliente = async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const clienteDB = await Cliente.find({ estado }); //select * from estados where estado=?
    return res.json(clienteDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};

//Editar
const editar_cliente = (req = request, res = response) => {
  const { id } = req.params;
  const cliente = req.body;
  const nuevo = {
    nombre: cliente.nombre,
    email: cliente.email
  };
  Cliente.findByIdAndUpdate(id, nuevo, { new: true }).then((result) => {
    res.json(result);
  });
};

//Eliminar
const eliminar_cliente = (req = request, res = response) => {
  const { id } = req.params;
  Cliente.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
};

module.exports = { createCliente, getCliente, editar_cliente, eliminar_cliente };

