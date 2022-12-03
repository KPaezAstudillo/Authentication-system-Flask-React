import React, { useContext } from 'react'
import { Context } from "../store/appContext";


export default function Private() {
    const { store, actions } = useContext(Context);
    const redirect = () => {
        let time= setTimeout(function () {
            window.location.href = "/";
            window.clearTimeout(time);		// clear time out.
        }, 3000);
    }
    return (
        <>
        {
            (store.token && store.token !== "" && store.token !== undefined) ? 
                <div className='container bg-primary my-5'>
                    You are logged in! This view is private
                </div> : 
                <div className='container bg-danger my-5' onLoad={redirect()}> You are not loggen in! Being redirected now </div>
        }
        </>
    )
}
