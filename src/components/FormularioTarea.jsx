import { Form, Button, FormText } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

const FormularioTarea = () => {
    //traemos las tareas del localStorage
    const tareaLocalStorage = JSON.parse(localStorage.getItem("listaTareas")) || [];

    // react hook form
    const {register, handleSubmit, formState:{errors},reset} = useForm();

    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState(tareaLocalStorage);

    // CICLO DE VIDA
    useEffect(()=>{
        localStorage.setItem("listaTareas", JSON.stringify(tareas));
    }, [tareas]);


    const onSubmit = (tarea) => {
        console.log(tarea);
        setTareas([...tareas, { id: Date.now(), text: tarea.nombreTarea }]);
        reset();
        Swal.fire(
            "Listo",
            "Tarea creada correctamente",
            "success"
        )
    };

    function borrarTarea(nombreTarea){
        let copiaTareas = tareas.filter((itemTarea) => itemTarea.text !== nombreTarea);
        setTareas(copiaTareas);
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                    className="mb-3 d-flex gap-1"
                    controlId="formBasicEmail"
                >
                    <Form.Control
                        type="text"
                        placeholder="Ingrese una tarea"
                        // onChange={(e) => setTarea(e.target.value)}
                        // value={tarea}
                        {...register("nombreTarea",{
                            required: "El nombre de la tarea es requerido",
                            minLength: {
                                value: 2,
                                message: "El nombre de la tarea debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 70,
                                message: "El nombre de la tarea solo puede tener hasta 70 caracteres"
                            }
                        })}
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
                <FormText className="text-danger">
                        {errors.nombreTarea?.message}
                </FormText>
            </Form>
            <ListaTareas listaTareas={tareas} borrarTarea={borrarTarea}></ListaTareas>
        </>
    );
};

export default FormularioTarea;
