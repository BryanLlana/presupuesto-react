import { useEffect, useState } from "react";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setValidPre})=>{

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(()=>{
        const gastadoTotal = gastos.reduce((total, gasto)=>total+gasto.cantidad, 0);
        const disponibleTotal = presupuesto - gastadoTotal;
        const porcentajeTotal = ((gastadoTotal / presupuesto) * 100).toFixed(2);
        setGastado(gastadoTotal);
        setDisponible(disponibleTotal);

        setTimeout(()=>{
            setPorcentaje(porcentajeTotal);
        }, 500);
    }, [gastos])

    const formatearPre = presupuesto => {
        return presupuesto.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handledResetApp = ()=>{
        const resultado = confirm('¿Deseas reiniciar la app?');

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setValidPre(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar styles={buildStyles({
                    pathColor: disponible < 0 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: disponible < 0 ? '#dc2626' : '#3b82f6'
                })} value={porcentaje} text={`${porcentaje}% Gastado`}></CircularProgressbar>
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handledResetApp}>Resetear App</button>
                <p><span>Presupuesto: </span>{formatearPre(presupuesto)}</p>
                <p className={disponible < 0 ? 'negativo' : ''}><span>Disponible: </span>{formatearPre(disponible)}</p>
                <p><span>Gastado: </span>{formatearPre(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;