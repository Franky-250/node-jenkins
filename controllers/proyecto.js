const Cliente = require('../models/cliente')
const { request, response} = require('express')
const Etapas = require('../models/etapas')
const Proyecto = require('../models/proyecto')
const Universidad = require('../models/universidad')
const TipoProyecto = require('../models/tipoProyecto')

// crear

const createProyecto= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { etapas, cliente, universidad, tipoProyecto } = data;
        //validando etapas
        const etapasDB = await Etapas.findOne({
            _id: etapas._id,
            
        })// select * from usuarios where _id=? and estado=true
        if(!etapasDB){
            return res.status(400).json({msg: 'etapa invalida'})
        }
        // validando Cliente
        const clienteDB = await Cliente.findOne({
            _id: cliente._id,
         
        })// select * from marcas where _id=? and estado=true
        if(!clienteDB){
            return res.status(400).json({msg: 'Cliente invalido'})
        }
        // validando universidad
        const universidadDB = await Universidad.findOne({
            _id: universidad._id,
           
        })// select * from estados where _id=? and estado=true
        if(!universidadDB){
           return res.status(400).json({msg: 'Universidad invalida'})
        }
        // validando tipoProyecto
        const tipoProyectoDB = await TipoProyecto.findOne({
            _id: tipoProyecto._id,
           
        })// select * from tipoequipos where _id=? and estado=true
        if(!tipoProyectoDB){
           return res.status(400).json({msg: 'tipoProyecto invalido'});
        } 
        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}




//listar todos
const getProyecto = async (req = request, 
    res = response) => {
        try{
           console.log('Petición...');
            const proyectoDB = await Proyecto.find()//select * from Proyecto
                .populate({
                    path: 'cliente'                    
                })

                .populate({
                    path: 'tipoProyecto'                    
                })

                .populate({
                    path: 'universidad'                   
                })

                .populate({
                    path: 'etapas'                  
                })
                
            return res.json(proyectoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar Proyecto
const editar_Proyecto = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        const proyecto  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyecto)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}
//Eliminar
const eliminar_Proyecto = (req = request, res = response) => {
    const { id } = req.params;
    Proyecto.findByIdAndDelete(id).then((result) => {
      res.json(result);
    });
  };


module.exports = { createProyecto, getProyecto, editar_Proyecto, eliminar_Proyecto }