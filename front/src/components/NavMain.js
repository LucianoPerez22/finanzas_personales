import { faBook, faChartLine, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function NavMain() {
    return (
     <div className="container mt-1 mb-2">
         <div className="row align-items-start border">
             <div className="card  col text-center">
                 <div className="bg-secondary text-light" style={{
                     fontSize: '0.8em',
                     fontWeight:'bold'
                 }}>
                     <p>Categorias</p>
                 </div>
                 <div>
                    <NavLink exact strict to="/categoryNew">
                        <button className="btn btn-outline-danger mb-1 mt-1" style={{
                            fontSize: '0.8em',
                            fontWeight:'bold'
                        }}>
                        <FontAwesomeIcon icon={faPlusCircle} className="text-danger" /> 
                        Agregar
                        </button>
                    </NavLink>

                    <NavLink exact strict to="/categoryList">
                        <button className="btn btn-outline-success mb-1 mt-1" style={{
                                fontSize: '0.8em',
                                fontWeight:'bold'
                            }}>
                                <FontAwesomeIcon icon={faBook} className="text-success" /> 
                                Administrar
                        </button>
                    </NavLink>
                 </div>
             </div>

             <div className="card col text-center">
                 <div className="bg-success text-light" style={{
                     fontSize: '0.8em',
                     fontWeight:'bold'
                 }}>
                     <p>Finanzas</p>
                 </div>
                 <div>
                     <NavLink exact strict to="/finanzasAdd">
                        <button className="btn btn-outline-danger mb-1 mt-1" style={{
                        fontSize: '0.8em',
                        fontWeight:'bold'
                    }}><FontAwesomeIcon icon={faBook} className="text-danger" /> Agregar</button>
                    </NavLink>
                    <NavLink exact strict to="/finanzasAdmin">
                        <button className="btn btn-outline-success mb-1 mt-1" style={{
                        fontSize: '0.8em',
                        fontWeight:'bold'
                    }}><FontAwesomeIcon icon={faChartLine} className="text-success" /> Administrar</button>
                 </NavLink>
                 </div>
             </div>
         </div>

     </div>
    );
  }
  
  export default NavMain;