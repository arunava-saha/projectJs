const apikey = "0179f17f7935a8f80feb26129ef769d4";

let Weather = document.querySelector("#details");
let city = document.querySelector("#city");

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = city.value;
    getWeatherDetails(cityValue);
})

async function getWeatherDetails(cityValue) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!res.ok) {
            throw new Error("Couldn't get weather");
        }

        const data = await res.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        console.log(temperature);
        const description = data.weather[0].description;
        console.log(description);
        const icon = data.weather[0].icon;
        console.log(data.weather[0].icon);

        const weather_data = [
            `Temperature: ${Math.round(data.main.temp)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ]

        Weather.querySelector(".icons").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="img">`;

        Weather.querySelector(".temp").textContent = `${temperature}°C`;
        Weather.querySelector(".desc").textContent = description;
        Weather.querySelector(".data").innerHTML = weather_data.map((e) => `<div>${e}</div>`).join("");
    } catch (error) {
        Weather.querySelector(".icons").innerHTML = "";

        Weather.querySelector(".temp").textContent = "";
        Weather.querySelector(".desc").textContent = "Error occured!! Try again";
        Weather.querySelector(".data").innerHTML = "";
    }
}