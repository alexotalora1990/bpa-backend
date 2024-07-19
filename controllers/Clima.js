import Clima from "../models/Clima.js"


const httpsClima= {
    getClima: async (req,res) => {
        try {
            const clima = await Clima.find();
            res.json({ clima });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los climas" });
        }
    },
    getClimaID: async (req, res) => {
        try {
            const { id } = req.params;
            const clima = await Clima.findById(id);
            if (!clima) {
                return res.status(404).json({ error: "Clima no encontrado" });
            }
            res.json({ clima });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el clima" });
        }
    },
   
    postClima: async (req, res) => {
      try {
        const { idfinca,idempleado,tipo,horaInicio,horaFinal,tempMin, tempMax    } = req.body;
        const clima= new Clima({ idfinca,idempleado,tipo,horaInicio,horaFinal,tempMin, tempMax  });
        await clima.save();
        res.status(201).json({ clima });
      } catch (error) {
        res.status(400).json({ error: "No se pudo crear el clima" });
        console.log(error);
      }
    },
    putClima: async (req, res) => {
        try {
            const { id } = req.params;
            const { idfinca,idempleado,tipo,horaInicio,horaFinal,tempMin, tempMax   } = req.body;
            const climaActualizado = await Clima.findByIdAndUpdate(id, { idfinca,idempleado,tipo,horaInicio,horaFinal,tempMin, tempMax   }, { new: true });
            res.json({ climaActualizado });
        } catch (error) {
            res.status(400).json({ error: "No se pudo actualizar el clima" });
        }
    }
    
};

export default httpsClima

