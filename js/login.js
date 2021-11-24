window.addEventListener("load",()=>{
    let formulario = document.querySelector("form");
    let urlLogin="https://ctd-todo-api.herokuapp.com/v1/users/login";
    let urlGetMe="https://ctd-todo-api.herokuapp.com/v1/users/getMe";
    

 
  
      
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        let email=document.querySelector("#email").value ;
       let contraseña=document.querySelector("#contraseña").value;
       if(validar(email,contraseña)){
        let payload= normalizar(email,contraseña);
        login(urlLogin,payload) ;
       }
        
    });
    let input= document.querySelectorAll("input");
    input.forEach(input=>{
        input.addEventListener("focus", () => {
            
            input.style.border = "solid 5px red";
         })
         input.addEventListener("blur",()=>{
            input.style.border = "solid 1px";
         })

         })
     let caracteresEspeciales=["!",'/','"',">","<","¡","#"," $"," %", "&", "'", "( )", "*", "+", "-", ".", ",","/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":",";","=", "?","¿", "@","[", "]"," ^", "_", "`", "{", "|", "}", "~"];    
  
    function validarEmail(correo){
        let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
        let esValido= expReg.test(correo);
        if(!esValido){
            alert("email no valido")
        }
        return esValido

    }
    function validarContraseña(contraseña,array){
        let resultado;
        let contraseñaArray= contraseña.split("");
        console.log(contraseñaArray);
        console.log(contraseñaArray.join(""))
        if (contraseñaArray.join("") ===""){
            resultado=false;
            
        }
        else{
        for(let i=0; i<contraseñaArray.length;i++){
            if(array.includes(contraseñaArray[i]) ){
                resultado=true;
                return resultado;
            }
            else{
                resultado=false;
              
            }
        }}
        if(resultado==false){
            alert("Contraseña invalida");  
        }
         
        return resultado;
        
    }

    function validar(email,contraseña){
        let resultado;

        validarEmail(email);
 
        validarContraseña(contraseña,caracteresEspeciales);
        if(validarEmail(email)==true&& validarContraseña(contraseña,caracteresEspeciales)){
            
                    resultado =true;
            
        }else{
            resultado=false;
        }
       return resultado;
    }
    function normalizar(email,contraseña,){
       const usuario= {
         
            email: email,
            password: contraseña
          }
          return usuario;
      
    }



 function login (url, payload){
     let settings={
         method: "POST",
         headers: {"Content-type": "application/json"},
         body: JSON.stringify(payload)
     }
     fetch(url,settings)
     .then( respuesta=> respuesta.json())
     .then ( data => {
        console.log(data);
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt);
            setTimeout(function(){
            location.href="principal.html";
        }, 5000);
        setTimeout(obtenerDatosUsuario(urlGetMe), 3500)
        }
        else{swal("Usuario o contraseña incorrecta")}

     })
    
    }

     

  
  function obtenerDatosUsuario(url){
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
            if(data.firstName){
                localStorage.setItem("firstName", data.firstName)
            }},2000)
        })
       }

    }) 