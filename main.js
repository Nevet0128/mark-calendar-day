const d = document
const $calendario = d.querySelector('.calendario')

const diasEnMeses = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

const nombreDias = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const diaDeInicioMes = [
  6, //'D'
  2, //'X'
  2, //'X'
  5, //'S'
  0, //'L'
  3, //'J'
  5, //'S'
  1, //'M'
  4, //'V'
  6, //'D'
  2, //'X'
  4, //'V'
]

function traerCalendario() {
  if (!localStorage.getItem('calendario')) {
    let calendarioObjeto = {
      Enero: {},
      Febrero: {},
      Marzo: {},
      Abril: {},
      Mayo: {},
      Junio: {},
      Julio: {},
      Agosto: {},
      Septiembre: {},
      Octubre: {},
      Noviembre: {},
      Diciembre: {},
    }
    window.localStorage.setItem('calendario', JSON.stringify(calendarioObjeto))

    return calendarioObjeto
  }

  let calendarioGuardado = JSON.parse(localStorage.getItem('calendario'))

  return calendarioGuardado
}

function addTextNode(text) {
  const newContent = d.createTextNode(text)
  return newContent
}

const buscarMarked = /marked/
const calendarioGuardado = traerCalendario()

//Agregando las secciones con sus respectivos nombres a cada mes
for (mes = 1; mes <= 12; mes++) {
  //div para cada mes
  const seccionMes = d.createElement('div')
  seccionMes.className = 'meses'

  //asignando nombres del mes
  const nombreMes = d.createElement('p')
  nombreMes.className = 'titulo-mes'

  switch (mes) {
    case 1:
      nombreMes.appendChild(addTextNode('Enero'))
      break
    case 2:
      nombreMes.appendChild(addTextNode('Febrero'))
      break
    case 3:
      nombreMes.appendChild(addTextNode('Marzo'))
      break
    case 4:
      nombreMes.appendChild(addTextNode('Abril'))
      break
    case 5:
      nombreMes.appendChild(addTextNode('Mayo'))
      break
    case 6:
      nombreMes.appendChild(addTextNode('Junio'))
      break
    case 7:
      nombreMes.appendChild(addTextNode('Julio'))
      break
    case 8:
      nombreMes.appendChild(addTextNode('Agosto'))
      break
    case 9:
      nombreMes.appendChild(addTextNode('Septiembre'))
      break
    case 10:
      nombreMes.appendChild(addTextNode('Octubre'))
      break
    case 11:
      nombreMes.appendChild(addTextNode('Noviembre'))
      break
    case 12:
      nombreMes.appendChild(addTextNode('Diciembre'))
      break

    default:
      console.log('Error en switch')
      break
  }

  //agregando el nombre de los días
  const seccionNombreDia = d.createElement('div')
  seccionNombreDia.className = 'nombre-dias'
  for (let i = 0; i <= 6; i++) {
    let contenedor = d.createElement('b')
    let nombreDia = d.createTextNode(nombreDias[i])
    contenedor.appendChild(nombreDia)
    seccionNombreDia.appendChild(contenedor)
  }

  //Agregando los días al mes
  const seccionDias = d.createElement('div')
  seccionDias.className = 'seccion-dias'

  //Entra cuando los meses no empiezan el lunes
  //para rellenar los días en los que no empieza en lunes
  if (diaDeInicioMes[mes - 1] > 0) {
    for (let i = 0; i < diaDeInicioMes[mes - 1]; i++) {
      const dias = d.createElement('div')
      dias.className = 'dia-relleno'
      seccionDias.appendChild(dias)
    }
  }

  //Agregando los dias de los meses
  for (let contador = 1; contador <= diasEnMeses[mes]; contador++) {
    const dias = d.createElement('p')
    dias.className = 'numero-dia'
    dias.classList.add(nombreMes.textContent)

    const numDia = d.createTextNode(contador)

    dias.appendChild(numDia)
    seccionDias.appendChild(dias)

    //Si en el objeto guardado está guardado el dia de ese mes, entonces se le pone el fondo verde
    if (calendarioGuardado[nombreMes.textContent][contador]) {
      dias.classList.add('marked')
    }
  }

  seccionMes.appendChild(nombreMes)
  seccionMes.appendChild(seccionNombreDia)
  seccionMes.appendChild(seccionDias)

  $calendario.appendChild(seccionMes)
}

d.addEventListener('click', (e) => {
  //console.log(e.target)
  if (
    e.target.matches('p') &&
    e.target.parentNode.className === 'seccion-dias'
  ) {
    let hasMarked = buscarMarked.test(e.target.classList)
    let calendario = JSON.parse(window.localStorage.getItem('calendario'))
    if (!hasMarked) {
      // Añadir fondo verde
      console.log('Marcado')
      e.target.classList.add('marked')
      calendario[e.target.parentNode.parentNode.firstElementChild.textContent][
        e.target.textContent
      ] = 'marked'
      window.localStorage.setItem('calendario', JSON.stringify(calendario))
    } else {
      // Remover fondo verde
      console.log('Eliminado')
      e.target.classList.remove('marked')
      delete calendario[
        e.target.parentNode.parentNode.firstElementChild.textContent
      ][e.target.textContent]
      window.localStorage.removeItem('calendario', JSON.stringify(calendario))
    }
  }
})
