import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";

import { DataContext } from '../../context/DataConext';

import { BACKEND } from '../../const/backend';

//Accordion
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import swal from 'sweetalert';

import Modal from 'react-modal';

import { faEdit, faTrash, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Components
import Header from '../Header';


function FinanzasAdmin() {
    var distinct = [];
    var filtroDesdeHasta = false;

    const { user, iduser } = useContext(DataContext) 
    
    //ESTADO QUE CONTROLA TODOS LOS DATOS DE LA TABLA FINANZAS
    const [datos, setDatos] = useState([])

    //ESTADO UTILIZADO PARA LISTAR LOS DATOS DE LA TABLA CATEGORIAS
    const [categorys, setCategorys] = useState([])

    //ESTADO UTILIZADO COMO ESPEJO DE datos PARA PODER REALIZAR OPERACIONES
    const [results, setResults] = useState([])

    //ESTADO USADO EN MODAL PARA EDITAR
    const [editCat, setEditCat] = useState([])
    const [editDatos, setEditDatos] = useState([])

    //SE UTILIZA PARA REFRESCAR EL useEffect
    const [refrescar, setRefrescar] = useState(true)

    //PERMITE ABRIR O CERRAR EL MODAL PARA EDITAR
    const [modalIsOpen, setModalIsOpen] = useState(false)

    
    useEffect(async () => {  
        await fetch(`${BACKEND}/listar/${iduser.idUsr}`)
           .then(response=> response.json())
           .then ((data) =>{
              setDatos(data)
              setResults(data)
           })

           await fetch(`${BACKEND}/category`)
           .then(response=> response.json())
           .then ((data) =>{
              setCategorys(data)
              
           })
          
            setRefrescar(false)    
          
   }, [refrescar]);

    
    
    const openModal = (param) => {
        let dat= results.filter(data => data.id === parseInt(param))
        let categ = categorys.filter(category => category.id === parseInt(dat[0].id_categoria))
        
        setEditDatos(dat)
        setEditCat(categ)
        
        setModalIsOpen(true)
    }
    const sendDatos =  (event) => {
        let categoria = document.getElementById('categoria').value;
        let concepto = document.getElementById('concepto').value;
        let monto = document.getElementById('monto').value;
        let fecha = document.getElementById('fecha').value;
        let tipo = document.getElementById('tipo').value;

        if(categoria.length==0 || concepto.length==0 || monto.length ==0 || fecha.length ==0 || tipo.length==0){
            swal("😡😡😡", "Complete todos los datos, antes de editar", "error");
        }else{
            fetch(`${BACKEND}/finanzas/${editDatos[0].id}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                                        categoria: parseInt(categoria),
                                        concepto: concepto.toUpperCase(),
                                        monto: parseFloat(monto),
                                        fecha: fecha,
                                        tipo: tipo.toUpperCase()
                                     })
            })
            .then(response=>{
                if (response.status==200){
                    setRefrescar(true)
                    swal("Buen Trabajo!", "Movimiento actualizado correctamente! 😀😀😀", "success");
                    setModalIsOpen(false)
                }
             })    
        }
        
    }

    const deleteCat = (event) =>{
        swal({
                title: "Movimientos",
                text: "¿Desea eliminar el movimiento seleccionado?",
                icon: 'warning',
                buttons: ["Cancelar", "Confirmar"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`${BACKEND}/finanzas/${event}`,{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "DELETE"
                    })

                    .then(response => {
                        if (response.status == 200){
                            setRefrescar(true)
                            swal("Buen Trabajo!", "Movimiento eliminado correctamente! 😀😀😀", "success");
                        }else{
                            swal("😡😡😡", "Ocurrio un error al eliminar!", "error");
                        }
                    })
                } else {
                  
                }
              });
    }

    
    const infos = (param) =>{
        let cat = categorys.filter(category => category.id === parseInt(param))

        let counts = datos

        let countTotals = counts.filter(count => count.id_categoria === parseInt(param))
    
        let total= 0;
        for(let i=0; i < countTotals.length; i++){
            total=total + parseFloat(countTotals[i].monto)
        }

        if (cat.length == 0){
            cat = ['']
        }

        const found = distinct.find(element => element == param);

        if (found == undefined){
            distinct.push(param)
              //----------------------------------------------
              return (
                <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    <span className="fw-bold text-primary">
                    {"(" + countTotals.length + ") - " + cat[0].nombre + " - $" + total}
                    </span>
                    </AccordionItemButton>
                </AccordionItemHeading>
                
                <AccordionItemPanel className="table text-center">
                    <table className="table  table-striped" style={{fontSize: '0.8em'}}>
                            <thead >
                                <tr>
                                    <th>Fecha</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                {
                    datos.filter(result => result.id_categoria ==param).map((dataR, iR)=> {
                    return(
                                    <tr>
                                        <td>{dataR.fecha.substr(0,10).split('-').reverse().join('/')}</td>
                                        <td>{dataR.concepto}</td>
                                        <td>{dataR.monto}</td>
                                        <td className="d-inline-flex" >
                                            <button className="btn btn-outline-success me-1" style={{fontSize: '0.8em'}}
                                                            data-toggle="tooltip" data-placement="top" title="Modificar"
                                                            id={dataR.id}
                                                            name={dataR.id}
                                                            onClick={ ()=>openModal(dataR.id) }
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="text-success" style={{
                                                            fontSize: '1em'
                                                        }} /> 
                                                    </button>

                                                    

                                                    <button className="btn btn-outline-danger" style={{fontSize: '0.7em'}}
                                                            data-toggle="tooltip" data-placement="top" title="Eliminar"
                                                            name={dataR.id}
                                                            onClick={ () => deleteCat(dataR.id) }
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="text-danger" style={{
                                                            fontSize: '1em'
                                                        }} /> 
                                                </button>
                                                
                                        </td>
                                    </tr>
                        )
                        })
    
                }
            </tbody>             
            </table>
           </AccordionItemPanel>
           
           </AccordionItem>
           )
           
            }
    }

    function selectDates(){
        const desde = document.getElementById('desde').value
        const hasta = document.getElementById('hasta').value

        let dat = []
       
        if (hasta == ''){
             dat = results.filter(data => data.fecha.substr(0,10).split('-').join('-') === desde)
            
            setDatos(dat)
             
        }else if(desde > '' && hasta >''){
            dat = results.filter(data => data.fecha.substr(0,10).split('-').join('-') >= desde && data.fecha.substr(0,10).split('-').join('-') <= hasta )
            
            setDatos(dat)
        }
        
    }
    
    return (
        <div className="container mt-2" style={{ maxWidth: '55rem' }}>
            <Header />
            <div className="card">
                <div className="bg-dark text-light  ">
                  <h2 className="text-center">Administrar Movimientos</h2>
                  <NavLink exact strict to="/main">
                        <button className="btn btn-outline-primary text-light">
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="text-light" style={{
                                                                    fontSize: '2em'
                                                                }} 
                            /> 
                        </button>
                    </NavLink>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <div>
                        <span>Desde: </span>
                        <input type="date" id="desde" onChange={selectDates} />
                    </div>

                    <div className="ms-5">
                        <span>Hasta: </span>
                        <input type="date" id="hasta" onChange={selectDates} />
                    </div>
                </div>

                <div className="mt-5">
                    <Accordion allowZeroExpanded>
                        {
                            datos.map( data => { return infos(data.id_categoria)})
                              
                        }
                    </Accordion>
                </div>

                <div>

                </div>
                
            </div>
    
            <Modal isOpen={modalIsOpen} ariaHideApp={false} className="">
                <div className="bg-dark text-light" style={{ maxWidth:'25em', margin: 'auto', marginTop: '10px'}}>
                    <div className="mb-3">
                            <label htmlFor="Categoria" className="form-label badge bg-info" style={{
                                fontSize: '0.8em',
                            }}>Fecha</label>
                            {editDatos.map((data,i)=> {
                                return(
                                    <input key={i} id="fecha" type="date" name="fecha" className="form-control" 
                                    required style={{maxWidth: '20.3rem'}}
                                    
                                    defaultValue={data.fecha.substr(0,10)}
                                />
                                )
                            } )}
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Categoria" className="form-label badge bg-info" style={{
                                fontSize: '0.8em',
                            }}>Categoria</label>
                            <select id="categoria"  name="categoria" className="form-select text-dark" required 
                                        style={{maxWidth: '20.3rem'}}
        
                                >
                                    
                                    {
                                        editCat.map((data, i) =>{ return <option key={i} value={data.id}>{data.nombre}</option> })
                                    }
                                    
                                    {
                                        categorys.map((data,i) => {
                                            return <option key={i} value={data.id} className="text-dark" > {data.nombre} </option>
                                        })
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
                                    {editDatos.map((data,i) => {
                                        return(
                                            <option key={i} value={data.tipo}>{data.tipo}</option>         
                                        )
                                    })}
                                    <option value="EGRESO">EGRESO</option>
                                    <option value="INGRESO">INGRESO</option>
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="Concepto" className="form-label badge bg-info" style={{
                                fontSize: '0.8em',
                            }}>Concepto</label>
                             {editDatos.map((data,i) => {
                                        return(
                                            <input key={i} type="text" id="concepto" name="concepto" className="form-control" 
                                                    defaultValue={data.concepto}
                                                    placeholder="Ingrese el concepto" 
                                                    style={{maxWidth: '20.3em', textTransform: 'uppercase'}} 
                                                    required
                                            
                                    />     
                                        )
                                    })}
                            
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="Monto" className="form-label badge bg-info" style={{
                                fontSize: '0.8em',
                            }}>Concepto</label>
                             {editDatos.map((data,i) => {
                                        return(
                                            <input key={i} type="number" id="monto" name="monto" className="form-control" 
                                                defaultValue={data.monto}
                                                placeholder="Ingrese el monto" 
                                                style={{maxWidth: '20.3em'}} step="0.1" 
                                                lang="nb" 
                                                required 
                                        />
                                        )
                                    })}
                          
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
                    </div>
               
               
        </Modal>
    </div>
    );
  }
  
  export default FinanzasAdmin;