import Proceso from "../models/Procesos.js"

const httpProcesos= {
    getProcesos: async (req,res) => {
        try {
            const procesos = await Proceso.find().populate('idempleado').populate('idcultivo');
            res.json({ procesos });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los procesos" });
        }
    },
    getProcesosID: async (req, res) => {
        try {
            const { id } = req.params;
            const proceso = await Proceso.findById(id);
            if (!proceso) {
                return res.status(404).json({ error: "Proceso no encontrado" });
            }
            res.json({ proceso });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el proceso" });
        }
    },
    getProcesosActivos: async (req, res) => {
        try {
          const procesoActivo = await Proceso.find({ estado: 1});
          res.json({ procesoActivo });
             } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener los procesos activos" });
        }
      },
    getProcesosInactivos: async (req, res) => {
        try {
          const procesoDesactivado = await Proceso.find({ estado: 0 });
          res.json({ procesoDesactivado });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error al obtener los procesos desactivados" });
        }
      },
    postProceso: async (req, res) => {
        try {
            const { idcultivo,idempleado, tipo,descripcion, fechaInicio, fechaFinal } = req.body;
            const nuevoProceso = new Proceso({ idcultivo, idempleado, tipo,descripcion, fechaInicio, fechaFinal });
            await nuevoProceso.save();
            res.status(201).json({ nuevoProceso });
        } catch (error) {
            res.status(400).json({ error: "No se pudo crear el proceso" });
            console.log(error);
        }
    },
    putProceso: async (req, res) => {
        try {
            const { id } = req.params;
            const { idcultivo,idempleado, tipo,descripcion, fechaInicio, fechaFinal } = req.body;
            const procesoActualizado = await Proceso.findByIdAndUpdate(id, { idcultivo,idempleado, tipo,descripcion, fechaInicio, fechaFinal }, { new: true });
            res.json({ procesoActualizado });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el proceso" });
        }
    },
    putProcesoActivar: async (req, res) => {
        try {
          const { id } = req.params;
          const procesoActivo = await Proceso.findByIdAndUpdate(id, { estado: 1}, { new: true });
          if (!procesoActivo) {
            return res.status(404).json({ message: "Proceso no encontrado" });
          }
          res.json({ procesoActivo});
        } catch (error) {
          res.status(400).json({ error: "No se pudo activar el proceso" });
          console.log(error);
        }
    },
    putProcesoDesactivar: async (req, res) => {
        try {
          const { id } = req.params;
          const procesoDesactivado= await Proceso.findByIdAndUpdate(id, { estado: 0 }, { new: true });
          if (!procesoDesactivado) {
            return res.status(404).json({ message: "Proceso no encontrado" });
          }
          res.json({ procesoDesactivado });
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: "No se pudo desactivar el proceso" });
        }
    }

  
};

export default httpProcesos;
