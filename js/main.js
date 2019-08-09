window.addEventListener('load', function(){

    const temperatureValue = document.querySelector('.description-temperature-value');
    const locationTimezone = document.querySelector('.description-location-timezone');
    const locationDate = document.querySelector('.description-location-date');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const {longitude, latitude} = position.coords;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const url = `${proxy}https://api.darksky.net/forecast/761b184bec728109e5925a117cd0d984/${latitude},${longitude}`;
            
            async function getData (){
                const response = await fetch(url);
                const data = await response.json();

                locationTimezone.innerHTML = data.timezone;
                temperatureValue.innerHTML = data.currently.temperature.toFixed(0);
                weatherDescription.innerHTML = data.currently.summary;
                let date = new Date();
                locationDate.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

                let iconID = data.currently.icon;
                setIcon(iconID, weatherIcon);
            };

            getData();
        })
    } else {
        throw new Error('Разрешите браузеру доступ к вашему расположению и перезагрузите страницу');
    };

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "indigo"});
        const currentIcon = icon.toUpperCase().replace(/-/g, '_');
        
        skycons.add(iconID, currentIcon);
        skycons.play();
    }
});

document.querySelector('.description-temperature').addEventListener('click', function(){
    const temperatureValue = document.querySelector('.description-temperature-value');
    const temperatureUnit = document.querySelector('.description-temperature-unit');
    let temperature = temperatureValue.innerHTML;

    if (temperatureUnit.innerHTML === 'F'){
        temperature = (temperature - 32) / 1.8;
        temperatureUnit.innerHTML = 'C';
        temperatureValue.innerHTML = temperature.toFixed(0);
    }else{
        temperature = (temperature * 1.8) + 32;
        temperatureUnit.innerHTML = 'F';
        temperatureValue.innerHTML = temperature.toFixed(0);
    }
});
