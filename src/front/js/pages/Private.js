import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";


export default function Private() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
   
    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
        actions.getMessage();
        console.log("prueba useeffect")
      }
      }, [store.token])
    return (
        <>
        {
            (store.token && store.token !== "" && store.token !== undefined) ? 
                <div className='container bg-primary my-5'>
                    You are logged in! This view is private. The message " {store.message} " comes from an authenticated request (bearer)
                </div> : 
                <div onLoad={navigate("/")}></div>
        }
        </>
    )
}
