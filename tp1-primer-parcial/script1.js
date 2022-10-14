addEventListener('DOMContentLoaded', (e) => {

    const APIKEY = `db6daefe32c31f2f74f61ccba6c041ba`;
    const inputCiudad = document.getElementById('input-ciudad');
    const buttonBuscar = document.getElementById('button-buscar');
    const errorCiudad = document.getElementById('errorCiudad');
    const divResultado = document.getElementById('resultado');
    const form = document.getElementById("form");
    const body = document.querySelector("body");
    const col1 = document.getElementById("col_resultado1");
    const col2 = document.getElementById("col_resultado2");
    const col3 = document.getElementById("col_resultado3")
    const col4 = document.getElementById("col_resultado4");
    const col5 = document.getElementById("col_resultado5");
    const iframe = document.querySelector("iframe");

    window.addEventListener('load' , () => {
        const miObjetoLocal = localStorage.getItem('miObjeto');
        if(miObjetoLocal) {
            MostrarCiudad(JSON.parse(miObjetoLocal));
        }
    })

    // le damos display none al contenedor div mientras utilicemos el formulario para buscar la ciudad
    divResultado.style.display = "none";

    // creamos las etiquetas para agregar al resultado
    
    const h2Clima = document.createElement("h2");
    const imgClima = document.createElement("img");
    const h4codigoClima = document.createElement("h4");
    const infoPrimaria = document.createElement("div");
    const infoSecundaria = document.createElement("div");
    const infoTerciaria = document.createElement("div");
    const infoCuaternaria = document.createElement("div");
    const pTempMax = document.createElement("p");
    const pTempMin = document.createElement("p");
    const pHumedad = document.createElement("p");
    const pPresion = document.createElement("p");
    const pVelocidadViento = document.createElement("p");
    const h3nombreCiudad = document.createElement("h3");
    const botonVolver = document.createElement("button");
    
    infoPrimaria.id = "infoPrimaria";//LE AGREGAMOS ID A LA ETIQUETA
    infoSecundaria.id = "infoSecundaria";//LE AGREGAMOS ID A LA ETIQUETA
    infoTerciaria.id = "infoTerciaria";//LE AGREGAMOS ID A LA ETIQUETA
    infoCuaternaria.id = "infoCuaternaria";//LE AGREGAMOS ID A LA ETIQUETA
   
    botonVolver.id = "button-volver";//LE AGREGAMOS ID A LA ETIQUETA
    botonVolver.innerHTML = "Volver";//LE AGREGAMOS UN VALOR AL BOTON
    // BOTON PARA VOLVER A LA SELECCION DE CIUDAD
    // asignamos el evento al boton VOLVER
    botonVolver.addEventListener("click", e=> {
        form.style.display="block";
        errorCiudad.style.display="none";
        divResultado.style.display = "none";
        body.style.backgroundImage = "none";
    })


    // asignamos el evento al boton BUSCAR
    buttonBuscar.addEventListener('click', (e)=> {
        e.preventDefault();

        
        MostrarCiudad();


            // se muestra el nombre de la ciudad en pantalla


        })
    

        const MostrarCiudad = (ciudad)=>{
        
            if (ciudad){
                generarDom(ciudad);
            }else{
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCiudad.value}&units=metric&appid=${APIKEY}&lang=es`)
        
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
            
                    // guardamos el objeto en localStorage
                    let objetoLocal = JSON.stringify(data);
                    localStorage.setItem('miObjeto',objetoLocal);
        
                    if(data.cod == '400' || data.cod == '404' ) {
                        errorCiudad.style.display = 'block';
                    } else {
                        
                        generarDom(data);
                        
                    }

                    })
                    .catch(err => {
                        console.log('error.')
                    })
                    .finally(final => {
                        console.log('Finalizado.')
                    })
            }

            
        
        }

        const generarDom = (data)=>{
            form.style.display="none";
            divResultado.style.display = "block";
                        // agregamos la informacion del clima a las etiquetas
                        h2Clima.innerHTML = `${Math.ceil(data.main.temp)}°C`;
                        h4codigoClima.innerHTML = data.weather[0].description;
                        h3nombreCiudad.innerHTML = `${data.name}, ${data.sys.country}`;
                        pTempMax.innerHTML = `Temp. Max: ${Math.ceil(data.main.temp_max)} °C`; 
                        pTempMin.innerHTML = `Temp. Min: ${Math.ceil(data.main.temp_min)} °C`;
                        pHumedad.innerHTML = `Humedad: ${data.main.humidity}%`;
                        pPresion.innerHTML = `Presion: ${data.main.pressure} hPa`;
                        pVelocidadViento.innerHTML = `Velocidad del viento: ${Math.ceil((data.wind.speed)*3.6)} km/h`;
                        
                        
                        let codigoClima = data.weather[0].id;
                        // SE HACE UN SWITCH PARA COLOCAR LA IMAGEN DEPENDIENDO EL CLIMA Y EL BACKGROUND CORRESPONDIENTE
                        switch (true) {
        
                            case codigoClima>=200 && codigoClima<=232:
                                imgClima.src='img/tormenta.png'
                                body.style.backgroundImage = "url('./img/gifs/tormenta-electrica-1.gif')"
        
                                break;
                            case codigoClima>=300 && codigoClima<=321:
                                imgClima.src = 'img/llovizna.png'
                                body.style.backgroundImage = "url('./img/gifs/llovizna.gif')"
        
                                break; 
                            case codigoClima>=500 && codigoClima<=531:
                                imgClima.src='img/lluvia.png'
                                body.style.backgroundImage = "url('./img/gifs/lluvia.gif')"
        
                                break;
                            case codigoClima>=600 && codigoClima<=622:
                                imgClima.src='img/copo-de-nieve.png'
                                body.style.backgroundImage = "url('./img/gifs/nieve.gif')"
        
                                break;
                            case codigoClima>=701 && codigoClima<=781:
                                imgClima.src='img/neblinoso.png'
                                body.style.backgroundImage = "url('./img/gifs/niebla.jpg')"
        
                                break;
                            case codigoClima === 800 :
                                imgClima.src='img/dom.png';
                                 body.style.backgroundImage = "url('./img/gifs/soleado.gif')"
                               
        
                                break;
                            case codigoClima >= 801 && codigoClima <=804 :
                                imgClima.src='img/dia-nublado.png'; 
                                body.style.backgroundImage = "url('./img/gifs/nubes.jpg')"
        
                                break;
                            default:
        
                                    break;
                                } 
                            
                                estilosBody();
        
                        // agergamos las etiquetas con la informacion al div #resultado
                        infoPrimaria.append(imgClima);
                        infoPrimaria.append(h2Clima);
                        col1.append(infoPrimaria);
                        divResultado.append(col1);
        
                        infoSecundaria.append(h4codigoClima);
                        infoSecundaria.append(h3nombreCiudad);
                        col2.append(infoSecundaria);
                        divResultado.append(col2);
        
                        infoTerciaria.append(pTempMax);
                        infoTerciaria.append(pTempMin);
                        col3.append(infoTerciaria);
                        divResultado.append(col3);
        
                        infoCuaternaria.append(pHumedad);
                        infoCuaternaria.append(pPresion);
                        infoCuaternaria.append(pVelocidadViento);
                        col4.append(infoCuaternaria);
                        divResultado.append(col4);
        
                        col5.append(botonVolver);
                        divResultado.append(col5);
        }
// FUNCIONES DECLARADAS

        function estilosBody() {
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundSize = "cover";
        }

})

