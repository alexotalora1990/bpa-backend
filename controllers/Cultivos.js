import Cultivo from "../models/Cultivo.js"

const httpsCultivos= {
    getCultivos: async (req,res) => {
        try {
            const cultivo = await Cultivo.find().populate('idparcela');
            res.json({ cultivo });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los cultivos" });
        }
    },
    getCultivoID: async (req, res) => {
        try {
            const { id } = req.params;
            const cultivo = await Cultivo.findById(id);
            if (!cultivo) {
                return res.status(404).json({ error: "Cultivo no encontrada" });
            }
            res.json({ cultivo });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el cultivo" });
        }
    },
    getCultivosActivos: async (req, res) => {
      try {
        const cultivosActivos = await Cultivo.find({ estado: 1}).populate('idparcela');
        res.json({ cultivosActivos });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los Cultivos Activos" });
      }
    },
    getCultivosInactivos: async (req, res) => {
      try {
        const cultivosInactivos = await Cultivo.find({ estado: 0 }).populate('idparcela');
        res.json({ cultivosInactivos });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los cultivos desactivados" });
      }
    },
    postCultivo: async (req, res) => {
      try {
        const { idparcela,nombre,tipo } = req.body;
        const cultivo = new Cultivo({ idparcela,nombre,tipo });
        await cultivo.save();
        res.status(201).json({ cultivo });
      } catch (error) {
        res.status(400).json({ error: "No se pudo crear el cultivo" });
        console.log(error);
      }
    },
    putCultivo: async (req, res) => {
        try {
            const { id } = req.params;
            const { idparcela,nombre,tipo  } = req.body;
            const cultivoActualizado = await Cultivo.findByIdAndUpdate(id, { idparcela,nombre,tipo  }, { new: true });
            res.json({ cultivoActualizado });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el cultivo" });
        }
    },
    putActivarCultivo: async (req, res) => {
      try {
        const { id } = req.params;
        const cultivoActivo = await Cultivo.findByIdAndUpdate(id, { estado: 1}, { new: true });
        if (!cultivoActivo) {
          return res.status(404).json({ message: "Cultivo no encontrado" });
        }
        res.json({ cultivoActivo });
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar el cultivo" });
          console.log(error);
        }
    },
    putDesactivarCultivo: async (req, res) => {
      try {
        const { id } = req.params;
        const cultivoDesactivado= await Cultivo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        if (!cultivoDesactivado) {
          return res.status(404).json({ message: "Cultivo no encontrado" });
        }
        res.json({ cultivoDesactivado });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar el cultivo" });
        }
    }
};

export default httpsCultivos;

