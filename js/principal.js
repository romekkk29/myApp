const token= localStorage.getItem("jwt");

if (!token){
    location.href="login.html"
}




let agarra= document.querySelector(".agarra");
let nombre = localStorage.getItem("firstName");
function ponerMayuscula(aCambiar){
    let array= aCambiar.split("");
    array[0] =array[0].toUpperCase();
    return array.join("");

}
let esteNombre= ponerMayuscula(nombre);
agarra.innerHTML=`<p> Hola ${esteNombre}</p>`;

let url="https://ctd-todo-api.herokuapp.com/v1/tasks"

listarMetas(url);

let form= document.querySelector("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    let nombreMeta=document.querySelector("#nombre").value;
    
    payload= normalizar(nombreMeta);
    agregar(url,payload);
 
})


function normalizar(nombreMeta){
    const meta= {
         description: nombreMeta,
         completed: false,
        
       }
       return meta;
   
 }
 let payload;

 function agregar(url,payload){
    
    let settings={
        method: "POST",
        headers: {"Content-type": "application/json",
        authorization: localStorage.getItem("jwt")},
        body: JSON.stringify(payload)
    }
    fetch(url, settings)
    .then( respuesta=> respuesta.json())
    .then ( data => {
        console.log(data);
        setTimeout(function(){
            if(data.description){
                
                setTimeout(()=>{
                    swal("meta agregada")
                      listarMetas(url);
      
                      quitar();
                },2000);
            }else{
                swal("no se pudo agregar meta")
            }},2000)
            
        })
       }


 

     
    

  function listarMetas(url){
    let agregarMetas= document.querySelector(".agregarMetas");
    agregarMetas.innerHTML="";
    let settings={
        method: "GET",
        headers: {
            "Content-type": "application/json",
            authorization: localStorage.getItem("jwt"),
        },
       
    }
    fetch(url,settings)
    .then( respuesta=> respuesta.json())
    .then ( data => {
        console.log(data);
        setTimeout(function(){
          
            data.forEach(element => {
                agregarMetas.innerHTML +=`<div class="meta ${element.id}" ><h3> ${element.description}</h3> <a class="${element.id}" href="#"><i class="fas fa-trash-alt"></i></a></div>`;
            });
                
            
        
            },300)
        })
       }

       function quitar(){
           setTimeout(()=>{
            let metas= document.querySelectorAll("main a");
            console.log(metas);
      metas.forEach(element=>{
          element.addEventListener("click", function(e){
              e.preventDefault();
              quitarMetas(element);
          } 
          )
      }) 
           },2000)
       }
             
       quitar();
        function quitarMetas(elemento){
            
            let id= elemento.className;
         let url2="https://ctd-todo-api.herokuapp.com/v1/tasks/"+id
                let settings={
                    method: "DELETE",
                    headers: {"Content-type": "application/json",
                    authorization: localStorage.getItem("jwt"),
                    
                },
                   
                }
                fetch(url2, settings)
                .then( respuesta=> respuesta.json())
                .then ( data => {
                    console.log(data);
                    swal("meta eliminada")
                    listarMetas(url);
                    quitar();
                   }
            
                )}


let cerrarSesion= document.querySelector(".cerra");
cerrarSesion.addEventListener("click", function(e){
    e.preventDefault();
    let confirma= confirm("¿Estas seguro que  quieres cerrar sesion?");
    if(confirma){
        location.href="login.html"
        localStorage.clear();
        
    }
  

})