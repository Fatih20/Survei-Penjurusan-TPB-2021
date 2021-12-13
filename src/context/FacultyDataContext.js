import React, {useState, useContext} from "react";

const FacultiesData = React.createContext();

export function useFacultiesData (){
    return useContext(FacultiesData);
}

const importedFacultiesData = require("../data/facultyData.json");

export default function FacultiesDataProvider ({children}){
    const[facultiesData, setFacultiesData] = useState(importedFacultiesData);
    return (
        <FacultiesData.Provider value={facultiesData}>
            {children}
        </FacultiesData.Provider>
    )
}