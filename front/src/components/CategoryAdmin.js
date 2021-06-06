import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";

import { BACKEND } from '../const/backend';

import swal from 'sweetalert';

import Modal from 'react-modal';

import { faEdit, faTrash, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Components
import Header from './Header';


function CategoryNew() {
    let history = useHistory();

    const [datos, setDatos] = useState([])

    const [info, setInfo] = useState({
        nombre: ''
    })

    const [idcat, setIdCat] = useState({
        id: 0
    })

    const [refrescar, setRefrescar] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(async () => {  
        await fetch(`${BACKEND}/category`)
           .then(response=> response.json())
           .then ((data) =>{
               setDatos(data)
              setRefrescar(false)
           })
   }, [refrescar]);

    const handleInputChange = (event) => {
        setInfo({
            ...info,
            nombre : event.target.value
        })

    }
    
    const openModal = (event) => {
        setIdCat({id: parseInt(event)})
        setInfo({nombre: ""})
        
        setModalIsOpen(true)
    }
    const sendDatos =  (event) => {
        if(!info.nombre.length>0){
            swal("😡😡😡", "Ingrese el nuevo nombre antes de continuar", "error");
        }else{
            fetch(`${BACKEND}/category/${idcat.id}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({name: info.nombre.toUpperCase()})
            })
            .then(response=>{
                if (response.status==200){
                    setRefrescar(true)
                    swal("Buen Trabajo!", "Categoria actualizada correctamente! 😀😀😀", "success");
                    setModalIsOpen(false)
                }
             })    
        }
    }

    const deleteCat = (event) =>{
        swal({
                title: "Categorias",
                text: "¿Desea eliminar la categoria seleccionada?",
                icon: 'warning',
                buttons: ["Cancelar", "Confirmar"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`${BACKEND}/category/${event}`,{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "DELETE"
                    })

                    .then(response => {
                        if (response.status == 200){
                            setRefrescar(true)
                            swal("Buen Trabajo!", "Categoria eliminada correctamente! 😀😀😀", "success");
                        }else{
                            swal("😡😡😡", "Ocurrio un error al eliminar!", "error");
                        }
                    })
                } else {
                  
                }
              });
    }
    

    return (
        <div className="container mt-2" style={{ maxWidth: '50rem' }}>
            <Header />
            <div className="card">
                <div className="bg-dark text-light  ">
                  <h5 className="text-center">Administrar Categorias</h5>
                  <NavLink exact strict to="/main">
                        <button className="btn btn-outline-primary text-light">
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="text-light" style={{
                                                                    fontSize: '2em'
                                                                }} 
                            /> 
                        </button>
                    </NavLink>
                </div>

                <div>
                    <table className="table table-responsive table-striped table-hover tabla">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody  style={{
                                        fontSize: '0.8em',
                                        fontFamily: 'Arial'
                                    }}>
                        {
                            datos.map((data, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{data.nombre.toUpperCase()}</td>
                                            <td> 
                                                <div className="d-inline-flex p-2">
                                                    <button className="btn btn-outline-success" 
                                                            data-toggle="tooltip" data-placement="top" title="Modificar"
                                                            id={data.id}
                                                            name={data.id}
                                                            onClick={ ()=>openModal(data.id) }
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-success" style={{
                                                            fontSize: '1em'
                                                        }} /> 
                                                    </button>

                                                    <h4 className="me-2 ms-2"> | </h4>

                                                    <button className="btn btn-outline-danger disabled" 
                                                            data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                            name={data.id}
                                                            onClick={ () => deleteCat(data.id) }
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-danger" style={{
                                                            fontSize: '1em'
                                                        }} /> 
                                                    </button>
                                                </div>
                                            
                                            </td>
                                        </tr>     
                                    
                                    )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
    
            <Modal isOpen={modalIsOpen} ariaHideApp={false} className="Modal1">
                <div className="text-center">
                    <span className="badge badge-info mt-2 mb-2 text-dark">Ingrese nuevo nombre</span>
                    <input type="text" name="nombre" onChange={handleInputChange} style={{textTransform:'uppercase'}} />
                </div>
                   
                <div className="text-end">
                <button className="btn btn-primary mt-3 me-2"
                            onClick={sendDatos}
                    >
                        Guardar
                    </button>
                    <button className="btn btn-danger mt-3 me-2"
                            onClick={() => setModalIsOpen(false)}
                    >
                        Cerrar
                    </button>
                </div>
               
               
        </Modal>
    </div>
    );
  }
  
  export default CategoryNew;