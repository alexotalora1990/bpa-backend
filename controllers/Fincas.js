import Finca from "../models/Fincas.js"

const httpFincas= {
    getFincas: async (req,res) => {
        try {
            const fincas = await Finca.find()
            .populate("idadministrador")
            res.json({ fincas })
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los fincas" });
        }
    },
    getFincasID: async (req, res) => {
        try {
            const { id } = req.params;
            const finca = await Finca.findById(id);
            if (!finca) {
                return res.status(404).json({ error: "Finca no encontrada" });
            }
            res.json({ finca });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la finca" });
        }
    },
    getFincasActivas: async (req, res) => {
        try {
          const fincaActiva = await Finca.find({ estado: 1})
          .populate("idadministrador")
          res.json({ fincaActiva });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener los fincas Activas" });
        }
      },
    getFincasInactivas: async (req, res) => {
        try {
          const fincaDesactivada = await Finca.find({ estado: 0 });
          res.json({ fincaDesactivada });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener las fincas desactivadas" });
        }
      },
    postFinca: async (req, res) => {
        try {
            const { idadministrador,area, nombre,rut, direccion, ubicacion, departamento,ciudad,limites } = req.body;
            const nuevaFinca = new Finca({ idadministrador, area, nombre,rut, direccion, ubicacion,departamento,ciudad, limites });
            await nuevaFinca.save();
            res.status(201).json({ nuevaFinca });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear la finca" });
            console.log(error);
        }
    },
    putFinca: async (req, res) => {
        try {
            const { id } = req.params;
            const { area, nombre,rut, direccion, ubicaion,departamento,ciudad,limites, idadministrador } = req.body;
            const fincaActualizada = await Finca.findByIdAndUpdate(id, { area, nombre,rut, direccion, ubicaion,departamento,ciudad,limites, idadministrador  }, { new: true });
            res.json({ fincaActualizada });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar la finca" });
        }
    },
    putFincaActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const fincaActiva = await Finca.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!fincaActiva) {
            return res.status(404).json({ message: "Finca no encontrada" });
          }
          res.json({ fincaActiva });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar la finca" });
          console.log(error);
        }
    },
    putFincaDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const fincaDesactivada= await Finca.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!fincaDesactivada) {
            return res.status(404).json({ message: "Finca no encontrada" });
          }
          res.json({ fincaDesactivada });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar la finca" });
        }
    }

  
};

export default httpFincas;
