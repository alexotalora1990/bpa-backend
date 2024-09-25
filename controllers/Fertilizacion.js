import Fertilizacion from "../models/Fertilizacion.js";

const httpFertilizacion= {
    getFertilizacion: async (req,res) => {
        try {
            const fertilizacion = await Fertilizacion.find()
            .populate("idcultivo")
            .populate("idempleado")
            .populate("idinsumo")
            res.json({ fertilizacion });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las fertilizaciones" });
        }
    },
    getFertilizacionID: async (req, res) => {
        try {
            const { id } = req.params;
            const fertilizacion = await Fertilizacion.findById(id);
            if (!fertilizacion) {
                return res.status(404).json({ error: "Fertilizacion no encontrada" });
            }
            res.json({ fertilizacion });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la fertilizacion" });
        }
    },
    getFertilizacionActivas: async (req, res) => {
        try {
          const fertilizacionActiva = await Fertilizacion.find({ estado: 1})
          .populate("idcultivo")
          .populate("idempleado")
          .populate("idinsumo")
          res.json({ fertilizacionActiva });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las fertilizaciones Activas" });
        }
      },
    getFertilzacionInactivas: async (req, res) => {
        try {
          const fertilizacionDesactivada = await Fertilizacion.find({ estado: 0 })
          .populate("idcultivo")
          .populate("idempleado")
          .populate("idinsumo")
          res.json({ fertilizacionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las fertilizaciones desactivadas" });
        }
      },
    postFertilizacion: async (req, res) => {
        try {
            const { idcultivo,idempleado,idinsumo,estadoFenologico,tipo,nombreFertilizante,cantidad } = req.body;
            const nuevaFertilizacion = new Fertilizacion({idcultivo,idempleado,idinsumo,estadoFenologico,tipo,nombreFertilizante,cantidad });
            await nuevaFertilizacion.save();
            res.status(201).json({ nuevaFertilizacion });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear la fertilizacion" });
            console.log(error);
        }
    },
    putFertilizacion: async (req, res) => {
        try {
            const { id } = req.params;
            const { idcultivo,idempleado,idinsumo,estadoFenologico,tipo,nombreFertilizante,cantidad  } = req.body;
            const fertilizacionActualizada = await Fertilizacion.findByIdAndUpdate(id, { idcultivo,idempleado,idinsumo,estadoFenologico,tipo,nombreFertilizante,cantidad  }, { new: true });
            res.json({ fertilizacionActualizada });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar la fertilizacion" });
        }
    },
    putFertilizarActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const fertilizacionActiva = await Fertilizacion.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!fertilizacionActiva) {
            return res.status(404).json({ message: "Fertlizacion no encontrada" });
          }
          res.json({ fertilizacionActiva });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar la fertilizacion" });
          console.log(error);
        }
    },
    putFertilizacionDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const fertilizacionDesactivada= await Fertilizacion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!fertilizacionDesactivada) {
            return res.status(404).json({ message: "Fertlizacion no encontrada" });
          }
          res.json({ fertilizacionDesactivada });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar la fertilizacion" });
        }
    }

  
};

export default httpFertilizacion;
