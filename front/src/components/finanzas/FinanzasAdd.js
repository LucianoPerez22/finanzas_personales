import React, { useState,  useContext, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";

import { BACKEND } from '../../const/backend'

//Components
import Header from '../Header';

//Context
import { DataContext } from '../../context/DataConext';

function FinanzasAdd() {
    let history = useHistory();

    const { iduser } = useContext(DataContext) 

    //ESTADO PARA LISTAR LAS CATEGORIAS
    const [category, setCategory] = useState([])

    useEffect(() =>{
        fetch(`${BACKEND}/category`)
        .then(response=> response.json())
        .then ((data) =>{
            setCategory(data)
           
        })
    }, [false])


    const sendDatos =  (event) => {
        event.preventDefault()
        const id_usuario = iduser.idUsr;
        const fecha = document.getElementById("fecha").value;
        const categoria = document.getElementById("categoria").value;
        const tipo = document.getElementById("tipo").value;
        let concepto = document.getElementById("concepto").value;
        const monto = document.getElementById("monto").value;
        
        concepto = concepto.toUpperCase();

         fetch(`${BACKEND}/finanzas`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                    id_usuario: id_usuario,
                    fecha: fecha,
                    id_categoria: categoria,
                    tipo: tipo,
                    concepto: concepto,
                    monto: monto
                })
        })
        .then(response=>{
            if (response.status==200){
                
                history.push("/main");
                
            }
        })    
        
    }

    return (
        <div className="container mt-2" style={{ maxWidth: '40rem' }}>
            <Header />
        <div className="card">
            <div className="bg-dark text-light text-center">
                  <h5>Nuevo Movimiento</h5>
            </div>

           <div className="mt-3  ms-2 me-2">
              <form onSubmit={sendDatos}>
              <div className="mb-3">
                      <label htmlFor="Categoria" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Fecha</label>
                     <input id="fecha" type="date" name="fecha" className="form-control" 
                            required style={{maxWidth: '20.3rem'}}
                               
                        />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="Categoria" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Categoria</label>
                      <select id="categoria"  name="categoria" className="form-select text-dark" required 
                                style={{maxWidth: '20.3rem'}}
   
                        >
                            {
                                category.map((data => {
                                    return <option value={data.id} className="text-dark" > {data.nombre} </option>
                                }))
                            }
                      </select>
                  </div>

                  <div className="form-group mb-3">
                      <label htmlFor="Tipo" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Tipo</label>
                      <select id="tipo" name="tipo" className="form-select" required 
                                style={{maxWidth: '20.3em'}}
                               
                        >
                            <option value="EGRESO">Egreso</option>
                            <option value="INGRESO">Ingreso</option>
                      </select>
                  </div>

                  <div className="form-group mb-3">
                      <label htmlFor="Concepto" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Concepto</label>
                      <input type="text" id="concepto" name="concepto" className="form-control" 
                                placeholder="Ingrese el concepto" style={{maxWidth: '20.3em', textTransform: 'uppercase'}} required
                                
                        />
                  </div>

                  <div className="form-group mb-3">
                      <label htmlFor="Monto" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Concepto</label>
                      <input type="number" id="monto" name="monto" className="form-control" 
                            placeholder="Ingrese el monto" style={{maxWidth: '20.3em'}} step="0.1" lang="nb" required
                               
                        />
                  </div>
                
                  <div className="d-flex justify-content-between mt-5">
                      <button type="submit" className="btn btn-primary">
                          Enviar</button>
                          
                    <NavLink exact strict to="/main">
                        <button type="button" className="btn btn-danger text-light">
                            Cerrar
                        </button>
                    </NavLink>
                  </div>
                  
              </form>
           </div>
        </div>
    </div>
    );
  }
  
  export default FinanzasAdd;