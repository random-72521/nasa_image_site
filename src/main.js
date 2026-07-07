import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'


const API_KEY = import.meta.env.VITE_NASA_API_KEY;

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let img = document.createElement("img")
        img.src = data.hdurl
        document.querySelector("#app").appendChild(img);
    })

    


document.querySelector("#app").innerHTML = "<p>Loading...</p>";

