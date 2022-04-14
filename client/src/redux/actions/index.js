import axios from 'axios';
export const POST_ALUMNO = 'POST_ALUMNO';
export const POST_CONTENIDO = 'POST_CONTENIDO';

export function postAlumnos(payload){
  return async function(dispatch){
    try {
      var json = await axios.post(`http://localhost:4001/alumnos`, payload);
      return dispatch({
        type: POST_ALUMNO,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function postContenido(payload){
  return function(dispatch){
      const postCurso = axios.post(`http://localhost:4001/cursos`, payload.nombre_curso);
      const postMateria = axios.post(`http://localhost:4001/materias`, payload.nombre_materia);
      const postClase = axios.post(`http://localhost:4001/clases`, payload.nombre_clase);
      Promise.All([postCurso, postMateria, postClase])
      .then(json =>{
        return dispatch({
          type: POST_CONTENIDO,
          payload: json,
        });
      })
      .catch(error => console.error(error))
  }
}