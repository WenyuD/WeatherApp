window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4ee3ec5fc9565d3b10bfbc4a56dd6073/${lat},${long}`;

            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    const {temperature,summary, icon} = data.currently;
                    
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change Unit to Celcius/Farenheit
                    temperatureSpan.textContent = "°F";
                    temperatureSection.addEventListener('click', () => {
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
        });

    }
    else {
        h1.textContent = "Please enable the navigation so we can provide accurate weather information for you."
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "#352B4A"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});