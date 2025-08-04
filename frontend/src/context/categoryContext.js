import { createContext, useState } from "react";


//for edit category
export const CategoryContext = createContext({
    editID:null,
    setEditId: ()=>{}
})

const CategoryContextContainer =({children})=>{
    const [editID,setEditId]=useState(null)
    return(
        <CategoryContext.Provider value={{editID,setEditId}}>
            {children}
        </CategoryContext.Provider>
    )
}
export default CategoryContextContainer


