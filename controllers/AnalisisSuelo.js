import AnalisisSuelo from '../models/AnalisisSuelo.js';

const httpsAnalisisSuelo={
getAnalisisSuelo: async (req, res) => {
    try {
        const analisis= await AnalisisSuelo.find()
        .populate("idparcela")
        .populate("idempleado")
        res.json(analisis);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
},
getAnalisisSueloID: async (req, res) => {
    try {
        const {id}= req.params;
        const analisis = await AnalisisSuelo.findById(id);
        if(!analisis){
            return res.status(404).json({error:"Analisis no encontrado"});
                    }
                res.json(analisis);
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
},
getAnalisisSueloActivos: async (req, res) => {
    const analisis = await AnalisisSuelo.find({estado: 1})
    .populate("idparcela")
    .populate("idempleado")
    res.json({ analisis })
},
getAnalisisSueloInactivos: async (req, res) => {
    const analisis = await AnalisisSuelo.find({estado: 0})
    .populate("idparcela")
    .populate("idempleado")
    res.json({ analisis })
},
postAnalisisSuelo: async (req, res) => {
    try {
        const { idparcela,idempleado,muestra,cultivo,laboratorio,resultados,recomendaciones } = req.body;
        const analisis = new AnalisisSuelo({ idparcela,idempleado,muestra,cultivo,laboratorio,resultados,recomendaciones });
        await analisis.save();
        res.status(201).json({ analisis });
      } catch (error) {
        res.status(400).json({ error: "No se pudo crear el analisis de suelo" });
        console.log(error);
      }
},
putAnalisisSuelo: async (req, res) => {
    try {
        const { id } = req.params;
        const { idparcela,idempleado,muestra,cultivo,laboratorio,resultados,recomendaciones  } = req.body;
        const analisisActualizado = await AnalisisSuelo .findByIdAndUpdate(id, { idparcela,idempleado,muestra,cultivo,laboratorio,resultados,recomendaciones  }, { new: true });
        res.json({ analisisActualizado });
    } catch (error) {
        res.status(400).json({ error: "No se pudo actualizar el analisis de suelo" });
    }
},
putActivarAnalisisSuelo: async (req, res) => {
  try {
    const { id } = req.params;
    const analisisActivo = await AnalisisSuelo.findByIdAndUpdate(id, { estado: 1}, { new: true });
    if (!analisisActivo) {
      return res.status(404).json({ message: "Analisis de suelo no encontrado" });
    }
    res.json({ analisisActivo });
    } catch (error) {
      res.status(400).json({ error: "No se pudo activar el analisis de suelo" });
      console.log(error);
    }
},
putDesactivarAnalisisSuelo: async (req, res) => {
  try {
    const { id } = req.params;
    const analisisDesactivado= await AnalisisSuelo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
    if (!analisisDesactivado) {
      return res.status(404).json({ message: "Analisis de suelo no encontrado" });
    }
    res.json({ analisisDesactivado });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo desactivar el analisis de suelo" });
    }
}


}
export default httpsAnalisisSuelo;