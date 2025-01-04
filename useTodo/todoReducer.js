export const todoReducer = (initialState = [], action) => { // recibimos un arreglo con la info normal y un action para agregar
    switch (action.type) {
        // siempre se debe regresar un nuevo state
        case '[TODO] Add Todo':
            // initialState es la data que ya estaba y action.payload la nueva que se va a insertar
            return [ ...initialState, action.payload ];

        case '[TODO] Remove Todo':
            return initialState.filter( todo => todo.id !== action.payload );

        case '[TODO] Toggle Todo':
            return initialState.map( todo => {

                if(todo.id === action.payload){ // suponiendo que el id del action definido es el mismo que el de la tarea del todo 
                    return {
                        ...todo, // esparcimos el todo que se pasa al principio del map 
                        done: !todo.done // se le cambia el valor al done 
                    }
                } 
                return todo;
            });
        
        case '[TODO] Count Todo': 
            return initialState.length;

        case '[TODO] Pending Todo':
            return initialState.filter( todo => !todo.done ).length
    
        default:
            // si no se cumple la condición del case devuelve la data original sin cambios
            return initialState;
    }
}