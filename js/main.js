          window.addEventListener("load",()=>{
            let formulario = document.querySelector("form");
            let url="https://ctd-todo-api.herokuapp.com/v1/users";
          
              
            formulario.addEventListener("submit", function(event) {
                event.preventDefault();
                let nombre=document.querySelector("#nombre").value ;
                let apellido=document.querySelector("#apellido").value ;
                let email=document.querySelector("#email").value ;
               let contraseña=document.querySelector("#contraseña").value;
               let contraseña2=document.querySelector("#contraseña2").value;
               if(validar(nombre,apellido,email,contraseña,contraseña2)){
                let payload= normalizar(nombre,apellido,email,contraseña);
                crearUsuario(url,payload,nombre)  ;
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
            function validarNombre(nombre,array){
                let resultado;
                let nombreArray= nombre.split("");
              
                if (nombreArray.join("") ===""){
                    resultado=false;
                    
                        
                }
                else{
                for(let i=0; i<nombreArray.length;i++){
                    if(array.includes(nombreArray[i]) ){
                        
                        resultado=false;
                        alert("Solo se aceptan letras en el nombre y apellido");
                       return resultado;
                    }
                    else{
                        resultado=true;
                        
                    }
                }}
                if(resultado==false){
                    alert("Solo se aceptan letras en el nombre y apellido");
                }
                 
                return resultado;
                

            }
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
            function contraseñaIguales(contraseña1,contraseña2){
                if(contraseña1===contraseña2){
                    return true;
                }
                else {return false}
            }
            function validar(nombre,apellido,email,contraseña,contraseña2){
                let resultado;
                validarNombre(nombre,caracteresEspeciales);
                validarNombre(apellido,caracteresEspeciales);
                validarEmail(email);
                contraseñaIguales(contraseña, contraseña2);
                validarContraseña(contraseña,caracteresEspeciales);
                if(validarNombre(nombre,caracteresEspeciales)==true&& (validarNombre(apellido,caracteresEspeciales)==true)&&validarEmail(email)==true){
                    if(contraseñaIguales(contraseña, contraseña2)){
                        if(validarContraseña(contraseña,caracteresEspeciales)){
                            resultado =true;
                        };
                    } 
                    else{ alert("contraseñas distintas"); resultado=false;}
                }else{
                    resultado=false;
                }
               return resultado;
            }
            function normalizar(nombre,apellido,email,contraseña,){
               const usuario= {
                    firstName: nombre.toLowerCase().trim(),
                    lastName: apellido.toLowerCase().trim(),
                    email: email,
                    password: contraseña
                  }
                  return usuario;
              
            }
       


         function crearUsuario (url, payload,nombre){
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
                    localStorage.setItem("nombre", nombre);
                    setTimeout(function(){
                      let nombre= localStorage.getItem("nombre")  
                         swal("Gracias por crear tu usuario " + nombre + " ahora entra a tu cuenta con tus datos"); 
                }, 5000);
                setTimeout(function(){
                    location.href="login.html";}, 9000)
                }
                else{swal("no se pudo crear el usuario por favor intente de nuevo")}

             })
            
            }

             

          }) 

        /*   jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWVnb21lejI5QGdtYWlsLmNvbSIsImlkIjoxNTgxLCJpYXQiOjE2Mzc1NjQxMjl9.9B2MHjwHMI9yTd0HLNss83rrhC7awnqm6tQK9sMM8jY" */