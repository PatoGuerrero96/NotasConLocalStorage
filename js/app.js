//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
// event listeners
EventListeners();
function EventListeners(){

    formulario.addEventListener('submit',agregarTweet);
       //cuando el documento este listo
       document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);
        crearHTML();
       });
}

//Funciones

function agregarTweet(e){
e.preventDefault();
//Textarea donde el usuario escribe
const tweet = document.querySelector('#tweet').value;

//validacion 
if(tweet === ''){
    mostrarError('Un tweet no debe ir vacio');
    return;// evita que se ejecute mas codigo

}
const tweetObj = {
    id: Date.now(),
    texto: tweet
}
//Añadir al arreglo de tweets
tweets = [...tweets, tweetObj];
// Una vez agregado vamos a crear el html
crearHTML();
}


function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(()=>{
        mensajeError.remove();
    },3000);
}

//Muestra un listado de los tweets 
function crearHTML(){

    limpiarHTML();

    if(tweets.length>0 ){
    tweets.forEach(tweet => {
        //Agregar boton eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText='X';

        // añadir funcion de eliminar
        btnEliminar.onclick = ()=>{
            borrarTweet(tweet.id);

        }
        // crear html
        const li = document.createElement('li');
        //añadir el texto
        li.innerText = tweet.texto;

        //asignar boton eliminar
        li.appendChild(btnEliminar);
        //insertarlo en el html
        listaTweets.appendChild(li);
    });
}

sincronizarStorage();
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
    while(listaTweets.firstChild) {
         listaTweets.removeChild(listaTweets.firstChild);
    }
}
//Eliminar un tweet
function borrarTweet(id){
tweets = tweets.filter(tweet => tweet.id !==id); 
crearHTML();
}
function sincronizarStorage(){

    localStorage.setItem('tweets', JSON.stringify(tweets));
 

}