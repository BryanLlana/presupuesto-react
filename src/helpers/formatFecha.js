const formatFecha = fecha => {
    const date = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return date.toLocaleDateString('es-ES', opciones);
}

export default formatFecha;