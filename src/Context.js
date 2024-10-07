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

    // const [insertRequest, setInsertRequest] = useState(0) //This is old change beacuse it has a default , if a page refresh means , it act as a update request...

    const [insertRequest, setInsertRequest] = useState('') //To replace the above , this is added as a new one....

    const [ employeeAddTab ,setEmployeeAddTab ] = useState({
        candidateId : null,
        status : 0
    });



    

    return (
        <SharedContext.Provider value={{ sharedTab, setSharedTab, rerender, setRerender, insertRequest, setInsertRequest ,employeeAddTab ,setEmployeeAddTab}}>
            {children}
        </SharedContext.Provider>
    );
}


export function useSharedContext() {
    return useContext(SharedContext);
}
