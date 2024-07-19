import Produccion from "../models/Produccion.js";

const httpProduccion= {
    getProduccion: async (req,res) => {
        try {
            const produccion = await Produccion.find();
            res.json({ produccion });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las producciones" });
        }
    },
    getProduccionID: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await    Produccion.findById(id);
            if (!produccion) {
                return res.status(404).json({ error: "Produccion no encontrada" });
            }
            res.json({ produccion });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la produccion" });
        }
    },
    getProduccionActivas: async (req, res) => {
        try {
          const produccionActiva = await Produccion.find({ estado: 1});
          res.json({ produccionActiva });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las producciones Activas" });
        }
      },
    getProduccionInactivas: async (req, res) => {
        try {
          const produccionDesactivada = await Produccion.find({ estado: 0 });
          res.json({ produccionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las producciones desactivadas" });
        }
      },
    postProduccion: async (req, res) => {
        try {
            const { idcultivo,Numlote, especie,cantidad,cantidadTrabajadores,observaciones } = req.body;
            const nuevaProduccion = new Produccion({idcultivo,Numlote, especie,cantidad,cantidadTrabajadores,observaciones });
            await nuevaProduccion.save();
            res.status(201).json({ nuevaProduccion });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear la produccion" });
            console.log(error);
        }
    },
    putProduccion: async (req, res) => {
        try {
            const { id } = req.params;
            const { idcultivo,numlote, especie,cantidad,cantidadTrabajadores,obsrvaciones  } = req.body;
            const produccionActualizada = await Produccion.findByIdAndUpdate(id, { idcultivo,numlote, especie,cantidad,cantidadTrabajadores,obsrvaciones}, { new: true });
            res.json({ produccionActualizada });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar la Produccion" });
        }
    },
    putProduccionActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const produccionActiva = await Produccion.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!produccionActiva) {
            return res.status(404).json({ message: "Produccion no encontrada" });
          }
          res.json({ produccionActiva });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar la produccion" });
          console.log(error);
        }
    },
    putProduccionDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const produccionDesactivada= await Produccion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!produccionDesactivada) {
            return res.status(404).json({ message: "Produccion no encontrada" });
          }
          res.json({ produccionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar la produccion" });
        }
    }

  
};

export default httpProduccion;
