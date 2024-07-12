import Riego from "../models/Riego.js"

const httpRiegos= {
    getRiegos: async (req,res) => {
        try {
            const riegos = await Riego.find();
            res.json({ riegos });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los riegos" });
        }
    },
    getRiegosID: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findById(id);
            if (!riego) {
                return res.status(404).json({ error: "Riego no encontrado" });
            }
            res.json({ riego });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el riego" });
        }
    },
    getRiegosActivos: async (req, res) => {
        try {
          const riegoActivo = await Riego.find({ estado: 1});
          res.json({ riegoActivo });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener los riegos activos" });
        }
      },
    getRiegosInactivos: async (req, res) => {
        try {
          const riegoDesactivado = await Riego.find({ estado: 0 });
          res.json({ riegoDesactivado });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener los riegos desactivados" });
        }
      },
    postRiego: async (req, res) => {
        try {
            const { idcultivo,idempleado, diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua } = req.body;
            const nuevoRiego = new Riego({ idcultivo,idempleado, diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua});
            await nuevoRiego.save();
            res.status(201).json({ nuevoRiego });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear el riego" });
            console.log(error);
        }
    },
    putRiego: async (req, res) => {
        try {
            const { id } = req.params;
            const { idcultivo,idempleado, diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua } = req.body;
            const riegoActualizado = await Riego.findByIdAndUpdate(id, { idcultivo,idempleado, diasTransplante,estadoFenológico,horaInicio,horaFin,dosis,cantidadAgua }, { new: true });
            res.json({ riegoActualizado });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el riego" });
        }
    },
    putRiegoActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const riegoActivo = await Riego.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!riegoActivo) {
            return res.status(404).json({ message: "Riego no encontrado" });
          }
          res.json({ riegoActivo});
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar el riego" });
          console.log(error);
        }
    },
    putRiegoDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const riegoDesactivado= await Riego.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!riegoDesactivado) {
            return res.status(404).json({ message: "Riego no encontrado" });
          }
          res.json({ riegoDesactivado });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar el riego" });
        }
    }

  
};

export default httpRiegos;
