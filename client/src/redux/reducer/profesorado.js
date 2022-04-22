// Importa las actions types que necesites acá:

import { GET_CURSOS, GET_MATERIAS, GET_CLASES, POST_CLASES, PUT_CLASES, PUT_MATERIAS, DELETE_CLASES, DELETE_MATERIAS } from "../actions/types";


const initialState = {
    cursos: [],
    materias: [],
    clases: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CURSOS:
        return {
          ...state,
          cursos: action.payload,
        }
      
      case GET_MATERIAS:
        return {
          ...state,
          materias: action.payload,
        }

      case PUT_MATERIAS:
        return {
          ...state,
        }

      case DELETE_MATERIAS:
        return {
          ...state,
        }

      case GET_CLASES:
        return {
          ...state,
          clases: action.payload,
        }

      case POST_CLASES:
        return {
          ...state,
        }

      case PUT_CLASES:
        return {
          ...state,
        }

      case DELETE_CLASES:
        return {
          ...state,
        }

      default:
        return state;
    }
};

export default rootReducer;