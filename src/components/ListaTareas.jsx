import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({listaTareas, borrarTarea, setTareas}) => {
    return (
        <ListGroup>
            {listaTareas.map((tarea, posicion) => <ItemTarea key={posicion} tarea={tarea} borrarTarea={borrarTarea} setTareas={setTareas}></ItemTarea> )}
        </ListGroup>
    );
};

export default ListaTareas;
