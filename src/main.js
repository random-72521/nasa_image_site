import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'


function updateClock() {
    let now = new Date();

    let currTime = now.toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit"});
    let timeZone = now.getTimezoneOffset();

    document.getElementById("time").innerHTML = `${currTime} ${timeZone}`;

    setTimeout(updateClock, 1000)

}


const API_KEY = import.meta.env.VITE_NASA_API_KEY;
document.addEventListener('DOMContentLoaded', () => {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        document.getElementById("loading").innerHTML = ""
        
        
        if (data.media_type == "image") {
            const image = document.createElement("img");
            image.src = data.hdurl;
            image.id = "apod-image";
            image.style.display = "block";
            image.style.margin = "auto"
            image.style.objectFit = "cover";

            document.getElementById("image").appendChild(image);
        }

        else if (data.media_type == "video") {
            const video = document.createElement("video");
            video.src = data.url;
            video.id = "apod-image";
            video.controls = true;
            video.style.display = "block";
            video.style.margin = "auto"
            video.style.objectFit = "cover";



            document.querySelector("#image").appendChild(video);

        } else {
            document.querySelector("#app").innerHTML = "<p>Some weird stuff happened.</p>";
        }
        
        document.getElementById("title").innerHTML = data.title;
        
    })


});

updateClock();

