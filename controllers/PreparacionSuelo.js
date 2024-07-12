import PreparacionSuelo from "../models/PreparacionSuelo.js"

const httpsPreparacionSuelos ={
   
    getPreparacion: async (req,res) => {
        try {
            const preparacion = await PreparacionSuelo.find();
            res.json({ preparacion });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener preparacion de suelos" });
        }
    },

    getPreparacionID: async (req, res) => {
        try {
            const { id } = req.params;
            const preparacion = await PreparacionSuelo.findById(id);
            if (!preparacion) {
                return res.status(404).json({ error: "Preparacion de suelos no encontrado" });
            }
            res.json({ finca });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener preparacion de suelos" });
        }
    },

    getPreparacionActivas: async (req, res) => {
        try {
          const preparacionActiva = await PreparacionSuelo.find({ estado: 1});
          res.json({ preparacionActiva });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener preparacion de suelos activos" });
        }
      },
    
      getPreparacionDesactivadas: async (req, res) => {
        try {
          const preparacionDesactivada = await PreparacionSuelo.find({ estado: 0 });
          res.json({ preparacionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener preparacion de suelos desactivados" });
        }
      },
      
    // Crear 
    postPreparacionSuelo: async (req, res) => {
        try {
            const { idparcela, idempleado,operario, responsable, observaciones, productos, fecha } = req.body;
            const nuevaPreparacion = new PreparacionSuelo({ idparcela, idempleado,operario, responsable, observaciones, productos, fecha });
            await nuevaPreparacion.save();
            res.status(201).json({ nuevaPreparacion }); return
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear prepracion de suelo" });
            console.log(error);
        }
    },

    // Actualizar
    putPreparacion: async (req, res) => {
        try {
            const { id } = req.params;
            const { idparcela, idempleado,operario, responsable, observaciones, productos } = req.body;
            const preparacionActualizada = await PreparacionSuelo.findByIdAndUpdate(id, { idparcela, idempleado,operario, responsable, observaciones, productos }, { new: true });
            res.json({ preparacionActualizada });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar preparacion de suelo" });
        }
    },

    putActivarPreparacion: async (req, res) => {
        try {
          const { id } = req.params;
          const preparacionActiva = await PreparacionSuelo.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!preparacionActiva) {
            return res.status(404).json({ message: "Preparacion de suelos no encontrado" });
          }
          res.json({ preparacionActiva });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar preparacion de suelos" });
          console.log(error);
        }
      },
    
      putDesactivarPreparacion: async (req, res) => {
        try {
          const { id } = req.params;
          const preparacionDesactivada= await PreparacionSuelo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!preparacionDesactivada) {
            return res.status(404).json({ message: "Preparacion de suelos no encontrado" });
          }
          res.json({ preparacionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar la finca" });
        }
      }

  
};

export default httpsPreparacionSuelos;
