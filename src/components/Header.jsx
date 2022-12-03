import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({presupuesto, setPresupuesto, validPre, setValidPre, gastos, setGastos})=>{

    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {validPre ? 
                <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setGastos={setGastos} setValidPre={setValidPre} setPresupuesto={setPresupuesto}/>
             : 
                <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} setValidPre={setValidPre}/>
            }
        </header>
    )
}

export default Header;