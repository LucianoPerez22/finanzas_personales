import React, { createContext, useState } from "react";

export const DataContext = createContext();

const nombre = '';
const idUsr = 0;
const modal_control = false;

export const DataProvider = ( {children} ) =>{
    const [user, setUser] = useState( { nombre } )
    const [iduser, setIduser] = useState( { idUsr } )
    const [modalRegister, setModalRegister] = useState( { modal_control } )
    return(
        <DataContext.Provider value={{
            user,
            iduser,
            modalRegister,
            setUser,
            setIduser,
            setModalRegister
        }}>
            { children }
        </DataContext.Provider>
    )
}
