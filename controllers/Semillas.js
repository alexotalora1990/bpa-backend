import Semilla from "../models/Semillas.js"

const httpSemillas= {
    getSemillas: async (req,res) => {
        try {
            const semilla = await Semilla.find();
            res.json({ semilla});
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las Semillas" });
        }
    },
    getSemillaID: async (req, res) => {
        try {
            const { id } = req.params;
            const semilla = await Semilla.findById(id);
            if (!finca) {
                return res.status(404).json({ error: "Semilla no encontrada" });
            }
            res.json({ semilla });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la semilla" });
        }
    },
    getSemillasActivas: async (req, res) => {
        try {
          const semillaActiva = await Semilla.find({ estado: 1});
          res.json({ semillaActiva });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las semillas Activas" });
        }
      },
    getSemillasInactivas: async (req, res) => {
        try {
          const semillaDesactivada = await Semilla.find({ estado: 0 });
          res.json({ semillaDesactivada });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las semillas desactivadas" });
        }
      },
      postSemilla: async (req, res) => {
        try {
            const { nombre, fechaVencimiento, especie } = req.body;
            const nuevaSemilla = new Semilla({  nombre, fechaVencimiento, especie, ...req.body });
            await nuevaSemilla.save();
            res.json({ nuevaSemilla });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear el registro de semilla" });
            console.log(error);
        }
    },
    
    putSemilla: async (req, res) => { 
        try {
            const { id } = req.params;
            const {  nombre, fechaVencimiento, especie } = req.body;
            const semillaActualizada = await Semilla.findByIdAndUpdate(id, {  nombre, fechaVencimiento, especie, ...req.body }, { new: true });
            res.json({ semillaActualizada });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar la semilla" });
        }
    },
    putSemillaActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const semillaActiva = await Semilla.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!semillaActiva) {
            return res.status(404).json({ message: "semilla no encontrada" });
          }
          res.json({ semillaActiva });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar la semilla" });
          console.log(error);
        }
    },
    putSemillaDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const semillaDesactivada= await Semilla.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!semillaDesactivada) {
            return res.status(404).json({ message: "Semilla no encontrada" });
          }
          res.json({ semillaDesactivada });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar la semilla" });
        }
    }

  
};

export default httpSemillas;

