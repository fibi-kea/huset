//Find DOM elements
let posts;
let myTemplate = document.querySelector(".data-template");
let dest = document.querySelector(".data-container");

async function getJson() {
    //Get Json
    let myJson = await fetch("http://fmidberg.com/huset/wordpress/wp-json/wp/v2/posts")
    posts = await myJson.json();
    showPost();
    console.log(posts);
}

function showPost() {

    posts.forEach(post => {
        //Clone template and show in DOM
        let clone = myTemplate.cloneNode(true).content;
        clone.querySelector(".data-titel").innerHTML = post.title.rendered;

        dest.appendChild(clone);
    });
}

document.addEventListener("DOMContentLoaded", getJson);



//-------------------------
//Accordian-style
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
//-------------------------
