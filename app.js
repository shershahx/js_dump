const apiKey = ''; // Replace with your OpenWeatherMap API key

const form = document.createElement('form');
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter city name';
const button = document.createElement('button');
button.textContent = 'Get Weather';
form.appendChild(input);
form.appendChild(button);

const resultDiv = document.createElement('div');
document.body.appendChild(form);
document.body.appendChild(resultDiv);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) {
        resultDiv.textContent = 'Please enter a city name.';
        return;
    }
    resultDiv.textContent = 'Loading...';
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        resultDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        `;
    } catch (err) {
        resultDiv.textContent = 'Error: ' + err.message;
    }
});