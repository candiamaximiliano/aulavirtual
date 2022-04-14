// Importa las actions types que necesites acá:

import { POST_CONTENIDO } from "../actions";


const initialState = {
    cursos: [],
    materias: [],
    clases: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_CONTENIDO:
        return {
          ...state,
          cursos: action.payload[0],
          materias: action.payload[1],
          clases: action.payload[2],
        }
      default:
        return state;
    }
};

export default rootReducer;