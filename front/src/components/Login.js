import React, { useState, useContext } from 'react';

//Context
import { DataContext } from '../context/DataConext';

//Components
import Header from './Header';
import Register from './Register';

//SweetAlert
import swal from 'sweetalert';

import { BACKEND } from '../const/backend';

function Login() {
    const { user, iduser, modalRegister, setUser, setIduser, setModalRegister } = useContext(DataContext)

    //ESTADO PARA GUARDAR LOS DATOS QUE INGRESA EL USUARIO
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })


    const handleInputChange = (event) => {
        setInfo({
            ...info,
            [event.target.name] : event.target.value
        })

    }

    const sendDatos =  (event) => {
        event.preventDefault()
        
         fetch(`${BACKEND}/login/${info.email}/${info.password}`)
        .then(response=> response.json())
        .then ((data) =>{
           if (data != "INVALIDO"){
               setIduser({idUsr: data[0].id})
               setUser({nombre: data[0].email})
               
           }else{
                swal("😡😡😡", "USUARIO O PASS INCORRECTOS", "error");
           }
        })
            
    }

    function registrar() {
        setModalRegister({modal_control: true})
    }
    
    return (
      

      <div className="container mt-2 justify-content-center" style={{ maxWidth: '50rem' }}>
            <Header />
         
            { modalRegister.modal_control == true ? <Register /> :
          
          <div className="card">
                <form onSubmit={sendDatos}>
                    <div className="mb-3 mt-4 ms-2 me-2">
                        <label htmlFor="Email" className="form-label fw-bold" style={{
                            fontSize: '0.8em',
                        }}>Email</label>
                        <input type="email" name="email" className="form-control" 
                                id="Email" aria-describedby="emailHelp" required onChange={handleInputChange}  
                               
                        />
                    </div>
                    <div className="mb-3 ms-2 me-2">
                        <label htmlFor="Password" className="form-label fw-bold" style={{
                            fontSize: '0.8em',
                        }}>Password</label>
                        <input type="password" name="password" className="form-control" id="Password" required 
                                onChange={handleInputChange} minLength="4" 
                                
                        />
                    </div>
                  
                    <div className="d-flex justify-content-between mt-5 ms-2 me-2">
                        <button type="submit" className="btn btn-primary">
                            Enviar</button>
                        <button type="button" className="btn btn-info text-light" onClick={registrar}>
                            Registrar
                        </button>
                    </div>
                    
                </form>
             </div>
            }
                 
      </div>
    );
  }
  
  export default Login;