let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById("btn3")
let pantallaInicial = document.getElementById('pantalla-inicial')
let cargarTarea = document.getElementById('cargar-tarea')
let listadoTareas = document.getElementById("listado-tareas")
let ingresarTarea = document.getElementById("ingresarTarea")
let img1 = document.getElementById("img1")
let contenedorIconos = document.getElementById("contenedorIconos")
let cantidadDias = document.getElementById("cantidadDias")



btn1.addEventListener('click', () => {
    pantallaInicial.style.display = 'none'
    cargarTarea.style.display = 'flex'
})

btn2.addEventListener('click', () => {
    cargarTarea.style.display = 'none'
    listadoTareas.style.display = 'flex'
    //guardo el valor del input en variable
    let tareaIngresada = ingresarTarea.value
    //guardo la cantiadad de dias en variable
    let venceEn = cantidadDias.value
    //a la tercer pantalla le agrego un div con un h3, un P y un button
    listadoTareas.innerHTML += `<div class="container-tarea"> <h3>` + tareaIngresada + `</h3> <p class="tiempo-restante"> RECORDAR EN ` + venceEn + ` DIAS</p> 
    <button class="tareaHecha">Hecho </button> </div>`
})

btn3.addEventListener('click', () => {
    cargarTarea.style.display = 'flex'
    listadoTareas.style.display = 'none'
})