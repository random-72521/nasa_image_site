import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'


function updateClock() { //function to update the clock every second
    let now = new Date();

    let currTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit"});
    let timeZone = now.getTimezoneOffset();
    let timeZoneOffset = timeZone / 60 * -1;
    if (timeZoneOffset >= 0) {
        timeZoneOffset = `+${timeZoneOffset}`
    }

    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()
    let day = weekDays[now.getDay()]

    document.getElementById("time").innerHTML = `${currTime} UTC${timeZoneOffset}`;
    
    document.getElementById("date").innerHTML = `${day}, ${month}/${date}/${year}`

    setTimeout(updateClock, 1000)

}












updateClock(); //load clock before loading apod


  
const API_KEY = import.meta.env.VITE_NASA_API_KEY; //getting api key from dotenv


const startTime = Date.now();

document.addEventListener('DOMContentLoaded', () => { //only runs fetch() after dom has loaded so it can access html elements
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`) //fetch from url using api key
    .then(response => response.json()) //format response
    .then(data => {
        console.log(data);

        var waitTime = Math.max(0, 3000 - (Date.now() - startTime));


        setTimeout(() => {
            let scanline = document.querySelector(".scanline");
            scanline.classList.toggle("paused");


        
        document.getElementById("loading").innerHTML = "" //remove loading 
        
        
        if (data.media_type == "image") { //if it is an image
            const image = document.createElement("img");
            image.src = data.hdurl;
            image.id = "apod-image";
            image.style.display = "block";
            image.style.margin = "auto" //center
            image.style.objectFit = "cover"; //fit entire parent div without changing aspect ratios

            document.getElementById("image").appendChild(image);
        }

        else if (data.media_type == "video") { // if it is a video
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
        
        document.getElementById("title").innerHTML = data.title; //add title and explanation
        document.getElementById("info").innerHTML = data.explanation;
        }, waitTime
)
        
        })


    });




