const URL_TAREA = import.meta.env.VITE_API_TAREA;

// funcion agregar tarea

export const crearTarea = async (tarea) => {
    try {
        console.log(tarea);
        const respuesta = await fetch(URL_TAREA, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tarea),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

// funcion obtener lista de tareas

export const obtenerListaTareas = async () => {
    try {
        const respuesta = await fetch(URL_TAREA);

        const listaTareas = respuesta.json();

        return listaTareas;
    } catch (error) {
        console.log(error);
    }
};

export const eliminarTarea = async (idTarea) => {
    try {
        const respuesta = fetch(URL_TAREA + "/" + idTarea, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
