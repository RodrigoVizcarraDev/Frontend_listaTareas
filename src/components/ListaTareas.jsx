import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({listaTareas, borrarTarea}) => {
    return (
        <ListGroup>
            {listaTareas.map((tarea) => <ItemTarea key={tarea.id} textoTarea={tarea.text} borrarTarea={borrarTarea}></ItemTarea> )}
        </ListGroup>
    );
};

export default ListaTareas;
