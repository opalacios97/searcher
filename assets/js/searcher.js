

let loadProducts = () => {

    let URL = `https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json`

    let URL2 = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml'

    let jsonData = [];
    let xmlData = [];

    // REQUEST 1
    let request = ( ) => {

        fetch( URL )
            .then(response => response.json() ) 
            .then(data1 => {

            /* Callback por éxito: Procese el result */
            //productos JSON

            jsonData = data1

            mostrar();

        })
            .catch(error => {
            /* Callback por fallo: Procese el error */
            console.log( error );
        })
        
    
    }
     
    // REQUEST 2
    let request2 = ( ) => {

        fetch( URL2 )
        .then(response => response.text() ) /* Convierte el response a texto */
        .then(result => {

            let xml = (new DOMParser()).parseFromString(result, 'application/xml');

            /* Callback por éxito: Procese el xml */
            let names = xml.getElementsByTagName("name");
            let srcs = xml.getElementsByTagName("src");     
            let types = xml.getElementsByTagName("type");         
            let prices = xml.getElementsByTagName("price");
            
            //productos XML
            for (var i=0; i < names.length; i++){
                xmlData.push({name: names[i].innerHTML, 
                            src: srcs[i].innerHTML,
                            type: types[i].innerHTML,
                            price: prices[i].innerHTML
                        });
            }

            mostrar();
              
        })
        .catch(error => {
            
            /* Callback por fallo: Procese el error */

            console.log( error );

        });
        
    }

    let mostrar = () => {

        let valorInput = document.getElementById("text").value;
        let allData = jsonData.concat(xmlData)

        if (valorInput===""){
            allData = jsonData.concat(xmlData)   
        }
        else{
            allData = allData.filter(p => (
                ((p.name.toLowerCase()).includes(valorInput.toLowerCase()))||
                ((p.type.toLowerCase()).includes(valorInput.toLowerCase()))
            ))
        }



        
        //mensaje a enviar
        let mensajeEnviar = ""

        allData.map(e =>{
                mensajeEnviar = mensajeEnviar + `
                <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                  <div class="card card-blog card-plain">
                    <div class="card-header p-0 mt-n4 mx-3">
                      <a class="d-block shadow-xl border-radius-xl">
                        <img src="${e.src}" alt="${e.name}" class="img-fluid shadow border-radius-xl">
                      </a>
                    </div>
                    <div class="card-body p-3">
                      <p class="mb-0 text-sm">${e.type}</p>
                      <a href="javascript:;">
                        <h5>
                          ${e.name}
                        </h5>
                      </a>
                      <p class="mb-4 text-sm">
                        <b>Price: </b> $ ${e.price}
                      </p>
                    </div>
                  </div>
                </div>`;
        })
        //mensaje a cambiar
        let mensajeCambiar = document.getElementsByClassName("tarjeta");

        mensajeCambiar[0].innerHTML = mensajeEnviar;
    }
    request();
    request2();




}






document.addEventListener("DOMContentLoaded", (event) => {
    //Código a ejecutar

    loadProducts();
 
     let element = document.getElementById("filter");
     let element2 = document.getElementById("text");

     element.addEventListener('click', (event) => {
         //Código a ejecutar
         loadProducts()})


         //cuando el input está vacío se vuelve a cargar todo
     element2.addEventListener("change",(event) => {
        //Código a ejecutar
        if (element2.value === ""){
            loadProducts()
        }else{
            console.log("Esperar botón filter")
        }
     })
        

});