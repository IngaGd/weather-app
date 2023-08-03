import { useState } from 'react';
import { createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);

    const addMarker = (markerData) => {
        setMarkers((prevMarker) => [...prevMarker, markerData]);
    };

    return (
        <GlobalContext.Provider value={{ markers, addMarker }}>
            {children}
        </GlobalContext.Provider>
    );
};
