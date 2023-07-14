import { Button, ListGroup, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editarTarea, obtenerListaTareas } from "../helpers/queries";
import Swal from "sweetalert2";

const ItemTarea = ({ tarea, borrarTarea, setTareas }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    const onSubmit = (tareaSubmit) => {
        // console.log(tarea) imprime {nombreTarea: "tarea"}
        //console.log(tarea);
        editarTarea(tareaSubmit, tarea._id).then((respuesta) => {
            if(respuesta.status === 200){

                obtenerListaTareas().then(respuesta => setTareas(respuesta))

                Swal.fire(
                    "Producto editado",
                    "El producto fue editado correctamente",
                    "success"
                );
                reset();
            }else{
                Swal.fire(
                    "Error al intentar editar el producto",
                    "Intentelo de nuevo en unos minutos",
                    "error"
                );
            }

        })
    }

    // State que permite mantener oculto por defecto el modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleOpen = () => {
        setShow(true);
        if(tarea){
            setValue("nombreTarea", tarea.nombreTarea)
        }
    };

    return (
        <>
            <ListGroup.Item className="my-2 bg-secondary text-white fs-3">
                {tarea.nombreTarea}
            </ListGroup.Item>
            <div style={{ margin: "0 auto" }}>
                <Button
                    className="mx-auto"
                    style={{ width: "200px" }}
                    onClick={() => borrarTarea(tarea._id)}
                >
                    Eliminar tarea
                </Button>
                <Button
                    className="mx-auto"
                    style={{ width: "200px" }}
                    onClick={() => handleOpen()}
                >
                    Editar Tarea
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group
                                className="mb-3"
                                controlId="nombreTareaId"
                            >
                                <Form.Label>Tarea</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("nombreTarea", {
                                        required: "El nombre de la tarea es requerido",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre de la tarea debe tener como minimo 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "El nombre de la tarea debe tener como maximo 50 caracteres"
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.nombreTarea?.message}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar cambio
                            </Button>
                        </Form>
                    </Modal.Body>
                    
                </Modal>
            </div>
        </>
    );
};

export default ItemTarea;
