import { createContext, useState } from "react";
//for products

export const ProductsContext = createContext({
    editID:null,
    setEditId: ()=>{}
})

const ProductsContextContainer =({children})=>{
    const [editID,setEditId]=useState(null)
    return(
        <ProductsContext.Provider value={{editID,setEditId}}>
            {children}
        </ProductsContext.Provider>
    )
}
export default ProductsContextContainer