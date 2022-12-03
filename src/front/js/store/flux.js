import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      currentUser: null,
  
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      syncTokenFromSessionStorage: () => {
        const token =sessionStorage.getItem("token");
        if (token && token !== "" && token !== undefined) setStore({token: token})

      },
      checkUser: () => {
        console.log("checkeando usuario");
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
          })
        }
      },
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({token: null});


      },
      login: async (email, password, navigate) => {
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        }
        try{
        const res = await fetch(`${process.env.BACKEND_URL}/api/token`, options)
        if (res.status !== 200) {
          alert("There has been some error");
          return false;
        }
        const data = await res.json()    
        sessionStorage.setItem("token", data.access_token)
        setStore({token: data.access_token})        
        navigate("/private");
        return true;
      
      }
      catch(error){
        console.log("Error login in")
      }

      //

    },

  },
  };
};

export default getState;