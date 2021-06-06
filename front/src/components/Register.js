import React, { useState,  useContext } from 'react';
import { useHistory } from "react-router-dom";

import swal from 'sweetalert';

import { BACKEND } from '../const/backend';

//Context
import { DataContext } from '../context/DataConext';

function Register() {
    let history = useHistory();

    const { modalRegister, setModalRegister } = useContext(DataContext)

    //ALMACENA LOS DATOS QUE INGRESA EL USUARIO
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })

    }

    const sendDatos =  (event) => {
        event.preventDefault()
        
         fetch(`${BACKEND}/registerUser`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email: data.email, password: data.password})
        })
        .then(response=> response.json())
        .then ((data) =>{
            console.log(data.res)

            if (data.res == 'INVALIDO'){
                swal("😡😡😡", "El usuario ya esta registrado", "error");
            }else{
                setModalRegister({modal_control: false})
            }
        })    
    }

    function registrar() {
        setModalRegister({modal_control: false})
    }
    return(
        <div className="container mt-2" style={{ maxWidth: '50rem' }}>
          <div className="card">
              <div className="bg-dark text-light text-center">
                    <h5>Registro de Usuarios</h5>
              </div>

             <div className="mt-3">
                <form onSubmit={sendDatos}>
                    <div className="mb-3 mt-4 ms-2 me-2">
                        <label htmlFor="Email" className="form-label badge bg-info" style={{
                            fontSize: '0.8em',
                        }}>Email</label>
                        <input type="email" name="email" className="form-control" id="Email" aria-describedby="emailHelp" required onChange={handleInputChange}  />
                    </div>
                    <div className="mb-3 ms-2 me-2">
                        <label htmlFor="Password" className="form-label badge bg-info" style={{
                            fontSize: '0.8em',
                        }}>Password</label>
                        <input type="password" name="password" className="form-control" id="Password" required onChange={handleInputChange} minLength="4" />
                    </div>
                  
                    <div className="d-flex justify-content-between mt-5 ms-2 me-2">
                        <button type="submit" className="btn btn-primary">
                            Enviar</button>
                        
                        
                        <button type="button" className="btn btn-danger text-light" onClick={registrar}>
                            Cerrar
                        </button>
                        
                      
                    </div>
                    
                </form>
             </div>
          </div>
      </div>
      
        
    )
}

export default Register;