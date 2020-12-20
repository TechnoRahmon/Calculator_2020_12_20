import { useEffect , useRef } from 'react';



//Hook
export default function useEventListener( eventname , handler, element= window ){
    // create a ref that stores handler 
    const savedHandler = useRef();


    //update ref.current value if handler if changes.
    useEffect(()=>{
            savedHandler.current = handler
    },[handler])




    useEffect(()=>{

        // make sure  element supports addEventListener
        const isSupport = element && element.addEventListener ; 
        if(!isSupport) return; 

        //Create event listener that calls handler function stored  in ref
        const eventListener = event => savedHandler.current(event); 
        
        
        // Add evenet listener
        element.addEventListener(eventname , eventListener); 


        //Remove event listener on cleanup 
        return()=>{
                element.removeEventListener(eventname , eventListener)
        }


    },[eventname , element ]) // re-run if eventanme or element changes




}
