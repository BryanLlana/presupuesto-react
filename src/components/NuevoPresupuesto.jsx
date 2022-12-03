import { useState } from "react";
import Alerta from "./Alerta";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setValidPre})=>{

    const [mensaje, setMensaje] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();

        if(!presupuesto || presupuesto <= 0){
            setMensaje('Presupuesto no válido')
            return;
        }

        setValidPre(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handleSubmit} className="formulario">
                <div className="campo">
                    <label>Definir Presupuesto</label>

                    <input 
                        type="number" 
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange={e=>setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añadir"/>

                {mensaje && <Alerta tipo='error' mensaje={mensaje}/>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto;