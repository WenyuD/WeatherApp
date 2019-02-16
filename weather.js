window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let alert = document.querySelector('.alert');
    const temperatureSpan = document.querySelector('.temperature-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            alert.textContent = "";

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4ee3ec5fc9565d3b10bfbc4a56dd6073/${lat},${long}`;
            const GoogleApi = `${proxy}https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&location_type=APPROXIMATE&result_type=locality&key=AIzaSyDRKPPmc5aNaAA562fVLMpduAHrf8MzF24`;
            console.log(api);

            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature,summary, icon} = data.currently;
                    
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change Unit to Celcius/Farenheit
                    temperatureSpan.textContent = "°F";
                    degreeSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = celsius.toFixed(2);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                    console.log(temperatureSpan.textContent);
                })
            fetch(GoogleApi)
                .then(responseCity =>{
                    return responseCity.json();
                })
                .then(cityName => {
                    const {formatted_address} = cityName.results;
                    
                    //Set DOM Elements from the API
                    locationTimezone.textContent = formatted_address;
                })
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "#FFADA0"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});