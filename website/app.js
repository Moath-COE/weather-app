/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; 
const absURL = 'http://127.0.0.1:8000'; 
const btn = document.getElementById('generate')
const resetBtn = document.getElementById('reset')
const results = document.getElementById('entryHolder')
let zip
let feelings

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=' + '11a06e92bf081b37dd0d685e442f3968' + '&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

// Main functions

btn.addEventListener('click', (e) => {
    e.preventDefault();
    postData(absURL + '/add', {})

    // Values of the inputs
    zip = document.getElementById("zip").value;
    feel = document.getElementById("feelings").value;

    getWeatherData(zip)
    .then((data) => {
        let temp = Math.round(data.main.temp)
        let city = data.name
        console.log(temp + ' ' + city)

        const backData = {
            city,
            temp,
            newDate,
            feel
        };

        postData(absURL + '/add', backData)

        retrieveData()
    })
})

resetBtn.addEventListener('click', e => {
    e.preventDefault()
    results.classList.add('hidden')
    resetBtn.classList.add('hidden')
    document.getElementById('zip').value = ''
    document.getElementById('feelings').value = ''
})

const getWeatherData = async (zip) => {
    const res = await fetch(baseURL + zip + apiKey)
    try {
        const data = await res.json() 
        console.log(data)

        return data
    } catch(error) {
        console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{
    const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },      
    body: JSON.stringify(data), 
    });

    try {
    const newData = await res.json();
    return newData;
    } catch(error) {
    console.log("error", error);
    }
}

const retrieveData  = async () => {
    const req = await fetch(absURL + '/all')

    try {
    const data = await req.json();
    console.log(data);

    results.innerHTML = `
        <div class="info">
            <div id="content">${data.feel}</div>
            <div id="city">${data.city}</div>
            <div id="date">${data.newDate}</div>
        </div>
        <div id="temp">
        ${data.temp}<sup class="chr">c</sup>
        </div>
    `
    results.classList.remove('hidden')
    resetBtn.classList.remove('hidden')
    } catch(error) {
        console.log("error", error);
    }
}

 