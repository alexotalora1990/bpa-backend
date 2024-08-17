import Parcela from "../models/Parcelas.js"

const httpsParcelas = {
  getParcelas: async (req, res) => {
    try {
      const parcelas = await Parcela.find()
      
      res.json({ parcelas });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los parcelas" });
    }
  },
  getParcelasID: async (req, res) => {
    try {
      const { id } = req.params;
      const parcelas = await Parcela.parcelaById(id);
      if (!parcelas) {
        return res.status(404).json({ error: "Parcela no encontrada" });
      }
      res.json({ parcelas });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la parcela" });
    }
  },
  getParcelasActivas: async (req, res) => {
    try {
      const parcelaActiva = await Parcela.find({ estado: 1 })
      .populate("idfincas")
      res.json({ parcelaActiva });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las parcelas Activas" });
    }
  },
  getParcelasInactivas: async (req, res) => {
    try {
      const parcelaDesactivada = await Parcela.find({ estado: 0 });
      res.json({ parcelaDesactivada });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener las parcelas desactivadas" });
    }
  },
  postParcela: async (req, res) => {
    try {
      const { idfincas, ubicacion, numero, cultivoAnterior, cultivoActual, descripcion, area, asistenteTecnico } = req.body;
      const nuevaParcela = new Parcela({ idfincas, ubicacion, numero, cultivoAnterior, cultivoActual, descripcion, area, asistenteTecnico });
      await nuevaParcela.save();
      res.status(201).json({ nuevaParcela });
    } catch (error) {
      res.status(400).json({ error: "No se pudo crear la parcela" });
    }
  },
  putParcela: async (req, res) => {
    try {
      const { id } = req.params;
      const { idfincas, ubicacion, numero, cultivoAnterior, cultivoActual, descripcion, area, asistenteTecnico } = req.body;
      const parcelaActualizada = await Parcela.findByIdAndUpdate(id, { idfincas, ubicacion, numero, cultivoAnterior, cultivoActual, descripcion, area, asistenteTecnico }, { new: true });
      res.json({ parcelaActualizada });
    } catch (error) {
      res.status(400).json({ error: "No se pudo actualizar la parcela" });
    }
  },
  putActivarParcela: async (req, res) => {
    try {
      const { id } = req.params;
      const parcelaActiva = await Parcela.findByIdAndUpdate(id, { estado: 1 }, { new: true });
      if (!parcelaActiva) {
        return res.status(404).json({ message: "Parcela no encontrada" });
      }
      res.json({ parcelaActiva });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo activar la Parcela" });
    }
  },
  putDesactivarParcela: async (req, res) => {
    try {
      const { id } = req.params;
      const parcelaDesactivada = await Parcela.findByIdAndUpdate(id, { estado: 0 }, { new: true });
      if (!parcelaDesactivada) {
        return res.status(404).json({ message: "parcela no encontrada" });
      }
      res.json({ parcelaDesactivada });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo desactivar la parcela" });
    }
  }
};

export default httpsParcelas;
