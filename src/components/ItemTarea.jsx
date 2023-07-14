import { Button, ListGroup, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { set } from "react-hook-form";

const ItemTarea = ({ textoTarea, borrarTarea }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleOpen = () => {
        setShow(true);
    };

    return (
        <>
            <ListGroup.Item className="my-2 bg-secondary text-white fs-3">
                {textoTarea}
            </ListGroup.Item>
            <div style={{ margin: "0 auto" }}>
                <Button
                    className="mx-auto"
                    style={{ width: "200px" }}
                    onClick={() => borrarTarea(textoTarea)}
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
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Tarea</Form.Label>
                                <Form.Control
                                    type="text"
                                />
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
