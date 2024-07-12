import Siembra from '../models/siembra.js';
import moongose from "mongoose"

const httpSiembras = { 

  getSiembras: async (req, res) => {
    try {
      const siembras = await Siembra.find();
      res.json(siembras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSiembrasID: async (req, res) => {
    try {
      const { id } = req.params;
      const siembra = await Siembra.findById(id);
      if (!siembra) {
        return res.status(404).json({ error: "Siembra no encontrada" });
      }
      res.json(siembra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  postSiembras: async (req, res) => {
    try { 
      const {idcultivos,idempleados,idinventario,fechasiembra,fechacosecha,transplante,cultivoanterior}=req.body;
      const nuevaSiembra = new Siembra({idcultivos,idempleados,idinventario,fechasiembra,fechacosecha,transplante,cultivoanterior});
      await nuevaSiembra.save();
      console.log(nuevasiembra);
      res.json({ message: "Cliente creado satisfactoriamente", nuevaSiembra });
    } catch (error) {
      console.log(error)
      res.status(400).json({ err: "No se pudo crear la siembra"});
    }
  },
  
  putSiembras: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const siembra = await Siembra.findByIdAndUpdate(id, updates, { new: true });
      if (!siembra) {
        return res.status(404).json({ error: "Siembra no encontrada" });
      }
      res.json(siembra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putSiembrasActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const siembra = await Siembra.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      if (!siembra) {
        return res.status(404).json({ error: "Siembra no encontrada" });
      }
      res.json(siembra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putSiembrasDesactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const siembra = await Siembra.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!siembra) {
        return res.status(404).json({ error: "Siembra no encontrada" });
      }
      res.json(siembra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getSiembrasByEstado: async (req, res) => {
    try {
      const { estado } = req.params;
      const siembras = await Siembra.find({ estado: Number(estado) });
      res.json(siembras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getSiembrasActivo: async (req,res) => {
    const Siembras = await Siembra.find({estado: 1})
    res.json({ Siembras })
  },
  getSiembrasInactivo: async (req,res) => {
    const Siembras = await Siembra.find({estado: 0})
    res.json({ Siembras })
  },
  getSiembrasByFechas: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: "Las fechas de inicio y fin son requeridas" });
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      const siembras = await Siembra.find({
        fechasiembra: {
          $gte: start,
          $lte: end
        }
      });
      res.json(siembras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getSiembrasByEmpleado: async (req, res) => {
    try {
      const {id} = req.params;
      
      const siembras = await Siembra.find({ idempleados: id });

      // Responder con la lista de siembras encontradas
      res.json(siembras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
}

export default httpSiembras;
