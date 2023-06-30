import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";

const FormularioTarea = () => {
    //traemos las tareas del localStorage
    const tareaLocalStorage = JSON.parse(localStorage.getItem("listaTareas")) || [];

    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState(tareaLocalStorage);

    // CICLO DE VIDA
    useEffect(()=>{
        localStorage.setItem("listaTareas", JSON.stringify(tareas));
    }, [tareas]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setTareas([...tareas, { id: Date.now(), text: tarea }]);
        setTarea("");
    };

    function borrarTarea(nombreTarea){
        let copiaTareas = tareas.filter((itemTarea) => itemTarea.text !== nombreTarea);
        setTareas(copiaTareas);
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group
                    className="mb-3 d-flex gap-1"
                    controlId="formBasicEmail"
                >
                    <Form.Control
                        type="text"
                        placeholder="Ingrese una tarea"
                        onChange={(e) => setTarea(e.target.value)}
                        value={tarea}
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
            <ListaTareas listaTareas={tareas} borrarTarea={borrarTarea}></ListaTareas>
        </>
    );
};

export default FormularioTarea;
