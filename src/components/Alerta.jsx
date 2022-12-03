const Alerta = ({tipo, mensaje})=>{
    return (
        <div className={`alerta ${tipo}`}>{mensaje}</div>
    )
}

export default Alerta;