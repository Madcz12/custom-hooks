import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url) => {

  // estado con un objeto 
    const [state, setState] = useState({
        data: null, // establecemos la data en null
        isLoading: true, // establecemos el mensaje de cargando...
        hasError: false, // notificación de error 
        error: null, // mensaje de error en consola
    });

    // montamos la función del fetch: 
    useEffect(() => {
      getFetch();
    }, [url]);

    // función para resetear los valores
    const setLoadingState = () => {
      setState({
        data:null,
        isLoading:true,
        hasError: false,
        error: null
      });
    }

    // hacemos la petición a la pokeapi: 
    const getFetch = async() => {

      if(localCache[url]){
        console.log('usando caché')

        setState({
          data: localCache[url],
          isLoading: false, 
          hasError: false, 
          error: null
        })

        return;
      }


      setLoadingState();

      const resp = await fetch(url);

      // sleep 
      await new Promise(resolve => setTimeout(resolve, 1500));

      // si no funciona  la request: 
      if(!resp.ok){
        setState({
          data:null,
          isLoading:false,
          hasError: true,

          error: {
            code: resp.status,
            message: resp.statusText
          }
        });
        return
      }
      // si todo está ok recibimos la respuesta en data y la pasamos al setState
      const data = await resp.json();

      setState({
        data: data,
        isLoading: false, 
        hasError: false, 
        error: null,
      })
      // manejo del cache: permite a la página conservar el primer valor de la petición 
      localCache[url] = data;
    }
  
    // mandamos todo el objeto del useState en el return para desestructurarlo donde lo importemos:
  return {
    data:       state.data,
    isLoading:  state.isLoading,
    hasError:   state.hasError,
  }
}

