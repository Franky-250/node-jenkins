const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Número requerido'],
        unique: [true, 'Numero en uso']
    },
    titulo: {
        type: String,
        required: [true, 'titulo requerido']
    },

    fechaIniciacion: {
        type: Date,
        default: new Date()
    },
    fechaEntrega: {
        type: Date,
        default: new Date()
    },

    valor: {
        type: Number,
        required: [true, 'Número requerido'],
        
    },

    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    // TODO: colocar el resto de atributos
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },

    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    
    etapas: {
        type: Schema.Types.ObjectId,
        ref: 'Etapas',
        required: true
    } 
    // TODO: colocar el resto de atributos
})

module.exports = model('Proyecto', ProyectoSchema)
