import { createContext, useState } from "react";

const ForceRender = createContext();

const ForceRenderProv = ({children})=>{
const [forceRender,setForceRender]=useState(0)
return(
    <ForceRender.Provider value={{forceRender,setForceRender}}>
        {children}
    </ForceRender.Provider>
)
}
export {ForceRender,ForceRenderProv} 