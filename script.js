const card = document.getElementById('card')

// Formateo de la fecha
const formattedDate = new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long'
})

// consumo de api
const getData = async () => {
  const res = await fetch('https://api.gael.cloud/general/public/clima')
  const data = await res.json()
  return data
}

// funcion en la cual le hago el recorrido a la api
async function renderClimas() {
  const climas = await getData()
  console.log(climas)

  let estacion = ''
  // Aquí comienzo a hacer el recorrido
  climas.forEach((clima) => {
    // hago este if para saber que imagen ocupar segun el clima
    let img = ''
    if (clima.Estado === 'Nublado') {
      img = '<img src="https://www.meteored.cl/css/v3/svgs/comun/symbols/color/5n.svg" alt="cubierto">'
    } else if (clima.Estado === 'Despejado') {
      img = '<img src="https://www.meteored.cl/css/v3/svgs/comun/symbols/color/1.svg" alt="Despejado">'
    } else if (clima.Estado === 'Cubierto y nevadas') {
      img = '<img src="https://www.meteored.cl/css/v3/svgs/comun/symbols/color/24.svg" alt="Cubierto y nevadas">'
    } else if (clima.Estado === 'Cubierto') {
      img = '<img src="https://www.meteored.cl/css/v3/svgs/comun/symbols/color/4.svg" alt="Cubierto">'
    }

    // Aquí comienzo a imprimir las cards
    estacion += `
          <div class="card">
            <div class="container">
              ${img}
            </div>

            <div class="card-header">
              <span>${clima.Estacion}<br>Chile</span>
              <span>${formattedDate}</span>
            </div>

            <span class="temp">${clima.Temp}°</span>

            <div class="temp-scale">
              <span>Celcius</span>
            </div>
          </div>`
    card.innerHTML = estacion
  })
}

renderClimas()
