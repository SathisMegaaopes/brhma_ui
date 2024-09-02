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

    return (
        <SharedContext.Provider value={{ sharedTab, setSharedTab, rerender, setRerender }}>
            {children}
        </SharedContext.Provider>
    );
}


export function useSharedContext() {
    return useContext(SharedContext);
}
