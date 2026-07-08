import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'


const API_KEY = import.meta.env.VITE_NASA_API_KEY;
document.addEventListener('DOMContentLoaded', () => {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        document.getElementById("loading").innerHTML = ""

        console.log("waweeee");
        
        
        if (data.media_type == "image") {
            const image = document.createElement("img")
            image.src = data.hdurl;
            image.id = "apod-image";
            image.style.display = "flex";
            image.style.alignSelf = "center";
            image.style.width = "250px";

            document.getElementById("image").appendChild(image)
        }

        else if (data.media_type == "video") {
            const video = document.createElement("video")
            video.src = data.url;
            video.id = "apod-image";
            video.controls = true;
            video.style.display = "flex";
            video.style.alignSelf = "center";
            video.style.width = "250px";



            document.querySelector("#image").appendChild(video);

        } else {
            document.querySelector("#app").innerHTML = "<p>Some weird stuff happened.</p>";
        }

        
    })


});
