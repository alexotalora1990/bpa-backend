import Factura from "../models/Factura.js"

    const helpersFactura = {
        validarExistaIdFactura:async (id)=>{
            const existe = await Factura.findById(id)
            if (existe==undefined){
                throw new Error ("Id de la factura no existe")
            }
        }
}

export default helpersFactura 