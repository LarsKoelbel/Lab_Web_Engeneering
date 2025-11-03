"use strict";

window.addEventListener('load', init);

class StationLocation {
    constructor(name = null, long = null, lat = null, status = true) {
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.status = status;
    }
}

async function init(){

    const location = await fetchWeatherStationPosition()
    if (location.status) {
        document.getElementById('location').innerHTML = `Die Wetterstation '${location.name}' befindet sich an den Koordinaten: ${location.lat}°N ${location.long}°E`;
        //Show location on map
        showOnMap(location);

    }else
    {
        document.getElementById('location').innerHTML = `Es gibt Probleme mit der Serververbindung. Der Standort der Wetterstation konnte nicht ermittelt werden.`;
    }

    async function inner ()
    {
        const output_element = document.getElementById('output');
        output_element.textContent = await fetchWeatherDataString();
        setTimeout(inner, 1000);
    }

    inner();

}

async function showOnMap (location)
{
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${location.long-0.1}%2C${location.lat-0.1}%2C${location.long+0.1}%2C${location.lat+0.1}&layer=mapnik&marker=${location.lat}%2C${location.long}`
    document.getElementById('map').src = url;
}

async function fetchWeatherStationPosition()
{
    try {
        const response = await fetch("/location");
        if (!response.ok) {
            throw new Error(`Response status:  ${response.statusText} (${response.status})`);
        }
        const weather = await response.json();
        return new StationLocation(weather.name, weather.position.longitude, weather.position.latitude);
    }
    catch (e){
        return new StationLocation(null, null, null, false);
    }
}

async function fetchWeatherDataString()
{
    try {
        const response = await fetch("/weather");
        if (!response.ok) {
            throw new Error(`Response status:  ${response.statusText} (${response.status})`);
        }
        const weather = await response.json();
        return `Heute ist es ${weather.temperature} Grad Celsius. Die Luftfeuchtigkeit beträgt ${weather.humidity}%`;
    }
    catch (e){
        return `Fehler bei Datenabfrage: ${e}`;
    }
}
