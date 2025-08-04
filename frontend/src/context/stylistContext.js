import { createContext, useState } from "react";


//for edit stylist
export const StylistContext = createContext({
    editID:null,
    setEditId: ()=>{}
})

const StylistContextContainer =({children})=>{
    const [editID,setEditId]=useState(null)
    return(
        <StylistContext.Provider value={{editID,setEditId}}>
            {children}
        </StylistContext.Provider>
    )
}
export default StylistContextContainer


