import Parcela  from "../models/Parcelas.js"

    const helpersParcelas= {
        validarExistaIdParcela:async (id)=>{
            const existe = await Parcela.findById(id)
            if (existe==undefined){
                throw new Error ("Id de parcela no existe")
            }
        }
}

export default helpersParcelas

