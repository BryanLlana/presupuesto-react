import Gasto from "./Gasto";

const ListadoGastos = ({gastos, handledModal, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
        {filtro ? 
          (<>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta Categoría'}</h2>
            {gastosFiltrados.map(gasto=>
                <Gasto key={gastosFiltrados.id}  gasto={gasto} handledModal={handledModal} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
            )}
          </>)
        :
          (<>
            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
            {gastos.map(gasto=>
                <Gasto key={gasto.id}  gasto={gasto} handledModal={handledModal} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
            )}
          </>)
        }

    </div>
  )
}

export default ListadoGastos;
