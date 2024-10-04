import React, { createContext, useState, useContext } from 'react';


const SharedContext = createContext();


export function SharedProvider({ children }) {
    const [sharedTab, setSharedTab] = useState({
        Tabname: null,
        TabUrl: null,
        active: 0,
        backendUrl: null
    });

    const [rerender, setRerender] = useState(false)

    const [insertRequest, setInsertRequest] = useState(0)

    const [ employeeAddTab ,setEmployeeAddTab ] = useState({
        candidateId : null,
        status : 0
    });

    // console.log(employeeAddTab)

    return (
        <SharedContext.Provider value={{ sharedTab, setSharedTab, rerender, setRerender, insertRequest, setInsertRequest ,employeeAddTab ,setEmployeeAddTab}}>
            {children}
        </SharedContext.Provider>
    );
}


export function useSharedContext() {
    return useContext(SharedContext);
}
