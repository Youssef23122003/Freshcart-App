import axios from "axios";

import { createContext, useEffect, useState } from "react";

export let CounterContext= createContext()


export default function CounterContextProvider(props){

useEffect(()=>{
},[])

    return <CounterContext.Provider >

{props.children}
    </CounterContext.Provider>
}