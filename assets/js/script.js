// Construimos el arreglo de objetos
const ArregloTareas = [
  { id: 1, name: 'Estudiar para APIs', realizada: false  },
  { id: 2, name: 'Ver tutoriales de React', realizada: false  },
  { id: 3, name: 'Realizar pruebas', realizada: false  },
  { id: 4, name: 'Aprender Base de datos', realizada: false },
  { id: 5, name: 'Investigar sobre Node', realizada: false  },
  { id: 6, name: 'Crear un SaaS', realizada: false  }
]

// Declarmos los controles que vamos a utilizar

const inputNuevaTarea = document.querySelector('#nueva-tarea')
const listaTareas = document.querySelector('#lista-tareas')
const botonAgregar = document.querySelector('.btn-agregar')
let totalTareas = document.querySelector('.total-tareas')
let  totalRealizadas = document.querySelector('.total-realizadas')

// agregar tareas desde el inputn box, con el botón agregar
botonAgregar.addEventListener('click', () => {
  if (inputNuevaTarea.value === '') return

  // calculamos el siguiente ID
  const nuevoId = ArregloTareas.length > 0 ? Math.max(...ArregloTareas.map(tarea => tarea.id)) +1 : 1 //si el arreglo está vacío usamos 1 como primer avalor

  ArregloTareas.push( { id: nuevoId, name: inputNuevaTarea.value, realizada: false }) /* agregamos el texto del input al arreglo */
  inputNuevaTarea.value = '' /*Limpiamos el control input */
  renderizarTareas()
  console.log(ArregloTareas)
})

const actualizarTarea = (id) => {
  const tarea = ArregloTareas.find((tarea) => tarea.id === id)
  if (tarea) { //si la tarea existe
    tarea.realizada = !tarea.realizada
    console.log(tarea)
    renderizarTareas()
  }
}

const borrarTarea = (id) => {
  const index = ArregloTareas.findIndex(tarea => tarea.id === id)
  if (index !== -1) { // verificamos que el índice sea valido
    ArregloTareas.splice(index, 1)
    renderizarTareas()
  }
}



const renderizarTareas = () => {
  const htmlArray = ArregloTareas.map(tarea => `

    <tr>
      <td class="id">${tarea.id}</td>
      <td class="tarea ${tarea.realizada ? 'realizada' : ''}" onClick="actualizarTarea(${tarea.id})">
        ${tarea.name}
      </td>
      <td class="realizada">
        ${
          tarea.realizada
            ? '<i class="fa-solid fa-circle-check" onClick="actualizarTarea(' + tarea.id + ')"></i>'
            : '<i class="fa-regular fa-eye-slash" onClick="actualizarTarea(' + tarea.id + ')"></i>'
        }
      </td>

      <td class="acciones">
        <i class="fa-regular fa-trash-can" onClick="borrarTarea(${tarea.id})"></i>
      </td>
    </tr>
  `

).join('') // Para reemplazar la coma que agrega el Map (eemplazamos la coma por 'vacio')

  const tareasRealizadas = ArregloTareas.filter(tarea => tarea.realizada).length
  console.log(tareasRealizadas)
  listaTareas.innerHTML = htmlArray
  totalRealizadas.innerHTML = tareasRealizadas
  totalTareas.innerHTML = ArregloTareas.length

}

renderizarTareas()