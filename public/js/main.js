let tarea = JSON.parse(localStorage.getItem('Tareas')) || []

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById("btn3")
let pantalla1 = document.getElementById('pantalla1') //div pantalla 1
let pantalla2 = document.getElementById('pantalla2') //formulario que contiene toda la pantalla 2
let pantalla3 = document.getElementById("pantalla3") //div pantalla 3
let inputTarea = document.getElementById("inputTarea") //guarda el input
let imgContenedor = document.getElementById("imgContenedor") //GUARDA EL UL
const todosLi = imgContenedor.querySelectorAll('li') //guarda todos los li que encuentra en el Ul 
let cantidadDias = document.getElementById("cantidadDias")
const imgSeleccionada = document.querySelector('#imgSeleccionada') //img seleccionada
const containerUlPantalla3 = document.querySelector('.containerUlPantalla3') //container UL pantalla 3
const containerUlPantalla2 = document.querySelector('#containerUlPantalla2') //container UL pantalla 2  
const btnSeleccionarImg = document.querySelector('#btnSeleccionImg') // boton que guarda la img selecciona
let seleccionado = [] //array vacio que luego se le agrega la ruta y el alt de la img  

//Al hacer click en btn1 se oculta pantalla1 y se muestra pantalla2
btn1.addEventListener('click', () => {
    pantalla1.style.display = 'none'
    pantalla2.style.display = 'flex'
})


//Al hacer click en el boton, se le quita o se le agrega la clase d-none al UL
btnSeleccionarImg.addEventListener('click', () => {
    containerUlPantalla2.classList.toggle('d-none') //muestra u oculta la lista de Li's
})

//Recorro los Li con foreach
todosLi.forEach((li) => {
    li.addEventListener('click', (e) => { //Los Li se hacen clickeables
        const srcImg = li.querySelector('img').src //guarda la ruta de la img
        const altTxt = li.querySelector('img').alt //guarda el alt de la img
        imgSeleccionada.src = srcImg
        imgSeleccionada.alt = altTxt
        imgSeleccionada.classList.remove('d-none') //Hago visible la img seleccionada

        containerUlPantalla2.classList.add('d-none') //oculto el ul

        seleccionado = [srcImg, altTxt] // relleno el array con la ruta y el alt de la img seleccionada
    })
})

//Funcion para calcular los dias
function agregarDias(dias) {
    let fechaActual = new Date() //variable que guarda un nuevo objeto de fecha
    fechaActual.setDate(fechaActual.getDate() + dias) //setea una fecha a partir de la fecha actual mas los dias que se ingresen
    return fechaActual
}

//Al hacer click en boton agregar tarea 
pantalla2.addEventListener('submit', (e) => {
    e.preventDefault() //previene que se envie el formulario porque sino se recarga la pagina

    if (e.target.inputTarea.value == '')
        return alert('Ponele un nombre a la tarea') // chequea que el input no este vacio

    if (seleccionado.length == 0)
        return alert('Selecciona una imagen') // chequea que el array "seleccionado" no este vacio

    const tareaPendiente = { //el objeto en este caso es una tarea
        titulo: inputTarea.value, //esto sale del valor del input
        tiempo: agregarDias(parseInt(cantidadDias.value)), //esto sale del select 
        srcImg: seleccionado[0], //posicion 1 en array
        altTxt: seleccionado[1] //posicion 2 en array
    }

    tarea.push(tareaPendiente) //le agrego al array tarea la nueva tarea que estoy creando
    localStorage.setItem('Tareas', JSON.stringify(tarea)) //le paso al localstorage el array (tarea) que yo quiero guardar en L.S

    seleccionado = [] //se vacia nuevamente para que se borre lo que se habia agregado antes
    imgSeleccionada.classList.add('d-none') //se oculta la imagen seleccionada


    pantalla2.reset() //resetea formulario
    pantalla2.style.display = 'none' //oculta pantalla 2
    pantalla3.style.display = 'flex' //muestra pantalla 3
    obtenerTareas() //llamada a la funcion
})


const obtenerTareas = () => {
    //Limpio el Html. Vacia listado de tareas para crearlo de nuevo y no agregar nuevamente lo ultimo agregado
    containerUlPantalla3.innerHTML = ''

    //------------------Verifica si hay alguna tarea cargada ---------------------------
    if (tarea.length == 0)
        return containerUlPantalla3.innerHTML = `<li class="card">No hay tareas</li>`

    //------------------------------------TIEMPO--------------------------------------
    function tiempoRestante(tiempo) {
        let fechaActual = new Date() //fecha actual
        let fechaTarea = new Date(tiempo) //le paso el tiempo en el futur que quiero que me avise
        let tiempoRestante = fechaTarea - fechaActual //la fecha mas grande que es la que viene, menos la de ahora.

        let dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24))
        return dias
    }
    //------------------------------------COLORES TAREAS-------------------------
    tarea.forEach((tareaPendiente, index) => { //agarro el array de localstorage y reemplaza las tareas
        let tiempo = tiempoRestante(tareaPendiente.tiempo)

        let bg = ''
        if (tiempo < 2) {
            bg = 'bg-red'
        } else if (tiempo < 5) {
            bg = 'bg-orange'
        } else if (tiempo > 7) {
            bg = 'bg-green'
        }

        //---------------------------------TAREA NUEVA-------------------------------
        //Modelo template string para crear una tarea 
        containerUlPantalla3.innerHTML += `<li class="card ${bg}" >
        <img src="${tareaPendiente.srcImg}" class="imgSeleccionadaPantalla3" alt="${tareaPendiente.altTxt}">
        <h2>${tareaPendiente.titulo}</h2>
        <div>Hacer en ${tiempo} dias</div>
        <button onClick="borrarTarea('${index}')">Borrar</button>
        </li>`

    })
}

//-------------------------------------BORRAR TAREA------------------------------------
//Funcion para borrar tareas
const borrarTarea = (index) => {
    let confirmacion = confirm('Estas seguro?') //pregunta en un alert si esta seguro de borrar la tarea
    if (confirmacion == false)
        return
    tarea.splice(index, 1) //le quito un elemento al array tarea y devuelve un nuevo array
    localStorage.setItem('Tareas', JSON.stringify(tarea)) //guardo en localstorage lo que me sobra
    obtenerTareas()
}

obtenerTareas() //inicializa la lista




















// btn2.addEventListener('click', () => {
//     //desaparece pantalla 2
//     pantalla2.style.display = 'none'
//     //aparece pantalla 3
//     pantalla3.style.display = 'flex'
//     //guardo el valor del input en variable
//     let tareaIngresada = inputTarea.value
//     //guardo la cantiadad de dias en variable
//     let venceEn = cantidadDias.value
//     //a la tercer pantalla le agrego un div con un h3, un P y un button

//     //creo objeto
//     function Objeto(imagen,  titulo, dias){
//         this.imagen = imagen
//         this.titulo = titulo
//         this.dias = dias
//     }

//     //funcion constructora
//     function agregarObjeto(imagen, titulo, dias){
//         let elementosCard = new Objeto(imagen, titulo, dias)
//         tarea.push(elementosCard)
//         localStorage.setItem("Tareas", JSON.stringify(tarea))
//     }

//     agregarObjeto("imagen", tareaIngresada, venceEn)

//     tarea.map((tarea)=>{
//         pantalla3.innerHTML += `<div class="container-tarea"> <h3>` + tareaIngresada + `</h3> <p class="tiempo-restante"> Recordar en ` + venceEn + ` dias</p> 
//     <button class="tareaHecha">Hecho </button> </div>`
//     })
// })

// //al hacer click en boton agregar de pantalla 3
// btn3.addEventListener('click', () => {
//     pantalla3.style.display = 'none'
//     pantalla2.style.display = 'flex'
// })