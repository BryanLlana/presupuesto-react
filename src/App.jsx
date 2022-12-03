import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import generarId from './helpers/generarId.js';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import './index.css';
import { useEffect } from 'react';

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [validPre, setValidPre] = useState(false);
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? []);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(()=>{
    const gastosFiltradosTotal = gastos.filter(gasto => gasto.categoria === filtro);
    setGastosFiltrados(gastosFiltradosTotal);
  }, [filtro]);

  useEffect(()=>{
    if(presupuesto > 0){
      setValidPre(true);
    }
  }, []);

  const handledModal = () => {
    setModal(true);

    setTimeout(()=>{
      setAnimarModal(true)
    }, 500);
  }

  const eliminarGasto = id => {
    let gastosFiltrados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosFiltrados);
  }


  const addGastos = gasto => {
    if(gasto.id){
      let gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(()=>{
      setModal(false);
    }, 500)

    setGastoEditar({});
  }


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header presupuesto={presupuesto} setPresupuesto={setPresupuesto} validPre={validPre} setValidPre={setValidPre} gastos={gastos} setGastos={setGastos}/>

      {validPre && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}/>
            <ListadoGastos gastos={gastos} handledModal={handledModal} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}/>
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handledModal} />
          </div>
        </>
      )}

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} addGastos={addGastos} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}/>}
    </div>
  )
}

export default App
