const URL_TAREA = import.meta.env.VITE_API_TAREA;


// funcion agregar tarea

export const crearTarea = async (tarea) => {
    try {
        const respuesta = await fetch(URL_TAREA, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(tarea)
        });
        return respuesta; 
    } catch (error) {
        console.log(error);
    }
}