window.addEventListener('load', ()=> {
    let long;
    let lat;
    let alert = document.querySelector('.alert');

    let currentInfo = document.querySelector('.current-info');
    let temperatureDescription = document.querySelector('.temperature-description');
    let location = document.querySelector('.location');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureSpan = document.querySelector('.temperature-section span');

    let details = document.querySelector('.details');
    let cloudCoverSpan = document.querySelector('.cloudCover span');
    let humiditySpan = document.querySelector('.humidity span');
    let ozoneSpan = document.querySelector('.ozone span');
    let pressureSpan = document.querySelector('.pressure span');
    let uvIndexSpan = document.querySelector('.uvIndex span');
    let visibilitySpan = document.querySelector('.visibility span');
    let windSpeedSpan = document.querySelector('.windSpeed span');

    let hourlySummary = document.querySelector('.hourly-summary');
    let dailySummary = document.querySelector('.daily-summary');
    console.log(window.innerWidth);


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            alert.textContent = "";
            currentInfo.classList.add('current-info-show');
            details.classList.add('details-show');

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
                    const {temperature, summary, icon, cloudCover, humidity, ozone, pressure, uvIndex, visibility, windSpeed} = data.currently;
                    let nextHourSummary = data.hourly.summary;
                    let nextDaySummary = data.daily.summary;

                    //General Infomaton
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.round(temperature);
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
                            temperatureDegree.textContent = Math.round(celsius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = Math.round(temperature);
                        }
                    })
                    console.log(temperatureSpan.textContent);

                    //Details
                    //Current Details
                    cloudCoverSpan.textContent = cloudCover;
                    humiditySpan.textContent = humidity;
                    ozoneSpan.textContent = ozone;
                    pressureSpan.textContent = pressure;
                    uvIndexSpan.textContent = uvIndex;
                    visibilitySpan.textContent = visibility;
                    windSpeedSpan.textContent = windSpeed;
                    
                    //Next Hour Details
                    hourlySummary.textContent = nextHourSummary;
                    dailySummary.textContent = nextDaySummary;
                })
            fetch(GoogleApi)
                .then(responseCity =>{
                    return responseCity.json();
                })
                .then(cityName => {
                    const {formatted_address} = cityName.results[0];
                    
                    //Set DOM Elements from the API
                    location.textContent = formatted_address;
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