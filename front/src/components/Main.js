import React, { useState, useEffect, useContext } from 'react';


import { BACKEND } from '../const/backend';

//Context
import { DataContext } from '../context/DataConext';

//Components
import Header from './Header';
import NavMain from './NavMain';

function Main() {
    //SE USA PARA GUARDAR TODOS LOS MOVIMIENTOS DEL USUARIO
    const [datos, setDatos] = useState([]);

    //SE USA PARA GUARDAR EL TOTAL DE INGRESOS
    const [ingresos, setIngresos] = useState(0);

    //SE USA PARA GUARDAR EL TOTAL DE EGRESOS
    const [egresos, setEgresos] = useState(0);

    const { user, iduser } = useContext(DataContext) 

    useEffect(async () => {  
         await fetch(`${BACKEND}/listar/${iduser.idUsr}`)
            .then(response=> response.json())
            .then ((data) =>{
                setDatos(data)
                if(data[0].Ingresos==null){
                    setIngresos(0)    
                }else{
                    setIngresos(data[0].Ingresos)
                }
                
                if (data[0].Egresos ==null){
                    setEgresos(0)    
                }else{
                    setEgresos(data[0].Egresos)
                }
                
            })
    }, [false]);
    return (
      <div className="container mt-2 mb-4 border border-3 border-warning">
          <Header />
          <div className="row border text-center mt-2 mb-2">
              <h6 style={{
                  fontSize: '0.7em',
                  textAlign: 'right'
              }}>
                  Hola!!!, {user.nombre} 
                    <a href="/login"><p className="text-danger">Cerrar</p></a>
                </h6>
          </div>
          <NavMain />
          
          <div className="card">
              <h6 className="border bg-info text-light" style={{
                     fontSize: '0.8em',
                     fontWeight:'bold',
                     fontFamily: 'SansSerif'
                 }}>Resumen de tus finanzas</h6>
             
              <div className="card-body text-center">
                    <div className="mb-1 ingresos">
                        Ingresos: $ { ingresos }
                    </div>
                    <div className="mt-1 mb-1 egresos">
                        Egresos: $ { egresos }
                    </div>
                    
                    <div className="mt-3 saldo">
                        Saldo: $ { parseFloat(ingresos) - parseFloat(egresos) }
                    </div>
              </div>
           </div>
           <div className="card mt-2">
              <div className="" >
                 <h6 className="border bg-dark text-light"  style={{
                     fontSize: '0.8em',
                     fontWeight:'bold',
                     fontFamily: 'SansSerif'
                 }}>Ultimos 10 movimientos</h6>
               <div>
                 <table className="table table-responsive table-striped table-hover tabla">
                     <thead>
                         <tr>
                             <th>Fecha</th>
                             <th>Tipo</th>
                             <th>Concepto</th>
                             <th>Monto</th>
                         </tr>
                     </thead>

                     <tbody  style={{
                                    fontSize: '0.8em',
                                    fontFamily: 'Arial'
                                }}>
                     {
                         datos.slice(0,10).map((data, i) => {
                                return(
                                    <tr key={i}>
                                        
                                        <td>{data.fecha.substr(0,10).split('-').reverse().join('/')}</td>
                                        <td style={ data.tipo=='INGRESO' ? 
                                                { color:'green'} 
                                                : {color:'red'}}
                                           >{data.tipo.toUpperCase()}
                                        </td>
                                        <td>{data.concepto.toUpperCase()}</td>
                                        <td style={ data.tipo=='INGRESO' ? 
                                                { color:'green'} 
                                                : {color:'red'}}>
                                                    ${data.monto}
                                        </td>
                                    </tr>     
                                
                             )
                         })
                     }
                     </tbody>
                    </table>
                 </div>
              </div>
          </div>
       
      </div>
    );
  }
  
  export default Main;