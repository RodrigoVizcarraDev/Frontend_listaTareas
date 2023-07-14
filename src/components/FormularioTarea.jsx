import { Form, Button, FormText } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { crearTarea, eliminarTarea, obtenerListaTareas } from "../helpers/queries";

const FormularioTarea = () => {

    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    const [tareas, setTareas] = useState([]);

    // CICLO DE VIDA
    useEffect(() => {
        obtenerListaTareas().then((respuesta) => {
            if (respuesta) {
                setTareas(respuesta);
            } else {
                Swal.fire(
                    "Error",
                    "Intente realizar la operacion en unos minutos",
                    "error"
                );
            }
        });
    }, []);

    const onSubmit = (tarea) => {
        crearTarea(tarea).then((respuesta) => {
            console.log(respuesta.status);
            if (respuesta.status === 201) {

                obtenerListaTareas().then((respuesta) => {
                    setTareas(respuesta)
                })

                Swal.fire(
                    "Tarea creada",
                    `La tarea ${tarea.nombreTarea} fue creada`,
                    "success"
                );
                reset();
            } else {
                Swal.fire(
                    "Error al crear la tarea",
                    `La tarea ${tarea.nombreTarea} no pudo ser creada`,
                    "error"
                );
            }
        });
        reset();
    };

    function borrarTarea(idTarea) {
        Swal.fire({

            title: "Esta seguro de que quiere eliminar la tarea?",
            text: "El siguiente cambio no puede ser revertido",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3f3",
            cancelButtonColor: "#f33",
            confirmButtonText: "Si, quiero borrar",
            cancelButtonText: "Me arrepenti",

        }).then((respuesta) => {
            if(respuesta.isConfirmed){

                eliminarTarea(idTarea).then((respuesta) => {

                    if(respuesta.status === 200){
                        obtenerListaTareas().then((respuesta) => {
                            if(respuesta){
                                setTareas(respuesta)
                                
                            }
                        })

                        Swal.fire(
                            "Tarea eliminada",
                            "La tarea elimina correctamente",
                            "success"
                        );

                    }else{

                        Swal.fire(
                            "No se pudo borrar la tarea",
                            "Error al intentar borrar intentelo más tarde",
                            "error"
                        );

                    }
                })
            }
        })
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
                        {...register("nombreTarea", {
                            required: "El nombre de la tarea es requerido",
                            minLength: {
                                value: 2,
                                message:
                                    "El nombre de la tarea debe tener como minimo 2 caracteres",
                            },
                            maxLength: {
                                value: 70,
                                message:
                                    "El nombre de la tarea solo puede tener hasta 70 caracteres",
                            },
                        })}
                    />
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form.Group>
                <FormText className="text-danger">
                    {errors.nombreTarea?.message}
                </FormText>
            </Form>
            <ListaTareas
                listaTareas={tareas}
                borrarTarea={borrarTarea}
                setTareas={setTareas}
            ></ListaTareas>
        </>
    );
};

export default FormularioTarea;
