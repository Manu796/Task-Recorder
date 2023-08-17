let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let btn3 = document.getElementById("btn3")
let pantallaInicial = document.getElementById('pantalla-inicial')
let cargarTarea = document.getElementById('cargar-tarea')
let listadoTareas = document.getElementById("listado-tareas")
let ingresarTarea = document.getElementById("ingresarTarea")
let img1 = document.getElementById("img1")
let seleccionarImg = document.getElementById('touch2')
let contenedorIconos = document.getElementById("contenedorIconos")
let cantidadDias = document.getElementById("cantidadDias")

let tarea = []


btn1.addEventListener('click', () => {
    pantallaInicial.style.display = 'none'
    cargarTarea.style.display = 'flex'
})


btn2.addEventListener('click', () => {
    //desaparece pantalla 2
    cargarTarea.style.display = 'none'
    //aparece pantalla 3
    listadoTareas.style.display = 'flex'
    //guardo el valor del input en variable
    let tareaIngresada = ingresarTarea.value
    //guardo la cantiadad de dias en variable
    let venceEn = cantidadDias.value
    //a la tercer pantalla le agrego un div con un h3, un P y un button
    
    //creo objeto
    function Objeto(imagen,  titulo, dias){
        this.imagen = imagen
        this.titulo = titulo
        this.dias = dias
    }

    //funcion constructora
    function agregarObjeto(imagen, titulo, dias){
        let elementosCard = new Objeto(imagen, titulo, dias)
        tarea.push(elementosCard)
    }

    agregarObjeto("imagen", tareaIngresada, venceEn)

    tarea.map((tarea)=>{
        listadoTareas.innerHTML += `<div class="container-tarea"> <h3>` + tareaIngresada + `</h3> <p class="tiempo-restante"> Recordar en ` + venceEn + ` dias</p> 
    <button class="tareaHecha">Hecho </button> </div>`
    })
})

touch2.addEventListener('click', ()=>{

})

//al hacer click en boton agregar de pantalla 3
btn3.addEventListener('click', () => {
    listadoTareas.style.display = 'none'
    cargarTarea.style.display = 'flex'
})