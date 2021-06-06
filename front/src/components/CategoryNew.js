import React, { useState,  useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";

import { BACKEND } from '../const/backend';

//Components
import Header from './Header';

function CategoryNew() {
    let history = useHistory();

    //ESTADO PARA ADMINISTRAR LOS DATOS DEL INPUT
    const [data, setData] = useState({
        name: ''
    })

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })

    }

    const sendDatos =  (event) => {
        event.preventDefault()
        
         fetch(`${BACKEND}/category`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name: data.name})
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
                  <h5>Agregar Nueva Categoria</h5>
            </div>

           <div className="mt-3 ms-2 me-2">
              <form onSubmit={sendDatos}>
                  <div className="mb-3">
                      <label htmlFor="Name" className="form-label badge bg-info" style={{
                          fontSize: '0.8em',
                      }}>Nombre Categoria</label>
                      <input type="text" name="name" className="form-control" id="Name" required onChange={handleInputChange} minLength="4" />
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
  
  export default CategoryNew;