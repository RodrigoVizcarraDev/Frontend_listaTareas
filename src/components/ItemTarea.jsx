import { Button, ListGroup } from "react-bootstrap";

const ItemTarea = ({ textoTarea, borrarTarea }) => {
    return (
        <>
            <ListGroup.Item className="my-2 bg-secondary text-white fs-3">{textoTarea}</ListGroup.Item>
            <Button
                className="mx-auto"
                style={{ width: "200px" }}
                onClick={() => borrarTarea(textoTarea)}
            >
                Eliminar tarea
            </Button>
        </>
    );
};

export default ItemTarea;
