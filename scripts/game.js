// declaring variables
const birdImages = ["images/big.gif", "images/mid.gif", "images/small.gif"];
let startButton = document.querySelector("button");
let scoreDiv = document.querySelector(".scoreId");
let killDiv = document.querySelector(".killId");
let timeDiv = document.querySelector(".timeId");
let startDiv = document.querySelector(".div5");
let birdSound = new Audio("./sounds/bird sound.mp3");
let bombSound = new Audio("./sounds/explosion.mp3");
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let birdsArray = [];
let bombArray = [];
let score = 0;
let kill = 0;

// crating class bird
class Bird 
{
    // creating bird
    constructor(ImageSrc, birdTop)
    {
        let berdImg = document.createElement('img');
        this.bird = berdImg;
        this.bird.src = ImageSrc;
        this.bird.classList.add("bird");
        this.bird.style.top = birdTop + "px";
        this.bird.style.right = 0;
        this.bird.style.left = - 50 + "px";
        let body = document.querySelector("body");
        body.appendChild(this.bird);
    }

    // move birds to right
    moveRight()
    {
        let imgLeft = parseInt(this.bird.style.left);
        let totalWidth = windowWidth - parseInt(this.bird.width) ;
        if(imgLeft < 0.95 * parseInt(totalWidth) )
        {
            this.bird.style.left = imgLeft + 10 + "px";
        }
        else
        {
            this.bird.remove();
        }
    }
}


// move birds down
function moveDown (bomb) 
{
    let bombTop = parseInt(bomb.style.top);
    let bombSize = parseInt(bomb.style.width);
    let totalHight = windowHeight - bombSize;
    if (bombTop < 0.7 * parseInt(totalHight)) 
    {
        bomb.style.top = bombTop + 3 + "px";
    }
    else 
    {
        bomb.remove();
    }
}

// calculate the score
function calculateScore (birdImg)
{
    if(birdImg.src == "http://127.0.0.1:5500/Project/images/big.gif")
    {
        score -= 10;
    }
    else if(birdImg.src == "http://127.0.0.1:5500/Project/images/mid.gif")
    {
        score += 5;
    }
    else if(birdImg.src == "http://127.0.0.1:5500/Project/images/small.gif")
    {
        score += 10;
    }
    
}


window.addEventListener("load", function()
{
    startDiv.classList.add("popUp");
    //  getting the user name from the index page
    let Name = localStorage.getItem("name");
    document.querySelector(".name").innerText = `${Name}`;
    document.querySelector(".nameId").innerText = `${Name}`;

    // getting the last date and score from the user's last visit
    /*let date = localStorage.getItem('lastDate');
    document.querySelector("#date").innerText = `${date}`;

    let lastScore = localStorage.getItem("score");
    if(lastScore != null)
    {
        document.querySelector("#score").innerText = `${lastScore}`; 
    }
    else
    {
        document.querySelector("#score").innerText = `0`; 
    }*/

    // another way to get the score and date from the user's last visit but connecting them with the user name 
    let anotherUser = JSON.parse(localStorage.getItem(Name));
    if(anotherUser != null)
    {
        document.querySelector(".score").innerText = `${anotherUser.lastScore}`; 
        document.querySelector(".date").innerText = `${anotherUser.date}`;
    }
    else
    {
        document.querySelector(".score").innerText = `0`; 
        document.querySelector(".date").innerText = `First Visit`;
    }

    // starting the game
    startButton.addEventListener("click", function ()
    {
        startDiv.style.display = "none";
        birdSound.play();

        // creating random birds
        let berdID = window.setInterval(function () 
        {
            let birdObj = new Bird(birdImages[Math.floor(Math.random() * (3 - 0) + 0)], 0.8 * Math.floor(Math.random() * (300 - 100) + 100))
            birdsArray.push(birdObj);
        }, 1000);

        // move the bird
        let berdMoveId = window.setInterval(function()
        {
            birdsArray.forEach(bird => {
            bird.moveRight();
            });
        }, 50)

        // creating the bomb randomly
        let bombId = window.setInterval(() =>
        {
            let bomb = document.createElement('img');
            bomb.src = "./images/bomb.gif";
            bomb.classList.add("bomb");
            bomb.style.width = "150px";
            bomb.style.left = 0.75 * Math.floor(Math.random() * (windowWidth - 100)) + 'px';
            bomb.style.top = "0px";
            document.querySelector("body").append(bomb);
            bombArray.push(bomb);
        }, 1000);

        let bombMoveId = window.setInterval(() =>
        {
            bombArray.forEach(bomb => 
                {
                    // moving the bomb
                    moveDown(bomb);
                    // killing the bird by clicking on the bomb and calculate the score
                    bomb.addEventListener("click", function() 
                    {
                        bomb.src = "./images/boom.gif";
                        bomb.classList.add('boom');
                        let birds = document.querySelectorAll(".bird");
                        let bombLeft = bomb.offsetLeft - 100;
                        let bombRight = bomb.offsetLeft + bomb.width + 100;
                        let bombTop = bomb.offsetTop - 100;
                        let bombBottom = bomb.offsetTop + bomb.height + 50;
    
                        birds.forEach(birdImg =>
                        {
                            if(birdImg.offsetLeft > bombLeft - 50 &&
                                birdImg.offsetLeft < bombRight + 50 &&
                                birdImg.offsetTop > bombTop - 50 &&
                                birdImg.offsetTop < bombBottom + 50)
                            {
                                console.log(birdImg.src);
                                bombSound.play();
                                calculateScore(birdImg);
                                kill++;
                                scoreDiv.innerText = `${score}`;
                                killDiv.innerText = `${kill}`;
                                birdImg.remove();
                            }
                        });
                    })
                })
        }, 50);

        // function to end the game when the timer is 0 and determine wether the user wins or loses
        function endGame()
        {
            let time = 60;

            let timeId = window.setInterval(() =>
            {
                time -= 1;
                timeDiv.innerText = `${time}`;

                if(time == 0)
                {
                    clearInterval(timeId);
                    clearInterval(berdID);
                    clearInterval(berdMoveId);
                    clearInterval(bombId);
                    clearInterval(bombMoveId);
                    birdSound.pause();
        
                    let allImages = document.querySelectorAll(".bird");
                    allImages.forEach(img => 
                        {
                            img.remove();
                        })
                    let allImage = document.querySelectorAll(".bomb");
                    allImage.forEach(imgg => 
                        {
                            imgg.remove();
                        })
        
                    if(score >= 50)
                    {
                        document.querySelector(".div7").style.display = "block";
                        document.querySelector(".winScore").innerText = `${score}`; 
                    }
                    else
                    {
                        document.querySelector(".div6").style.display = "block";
                        document.querySelector(".loseScore").innerText = `${score}`; 
                    }
        
                    // setting the last score and last date of the user's visit
                    //localStorage.setItem("score", score.toLocaleString());
                    //localStorage.setItem("lastDate", new Date().toLocaleString("en-US"));

                    // another way of setting the last score and the last date of the user's visit and connect them with the user's name
                    let userData ={
                        lastScore:score.toLocaleString(),
                        date: new Date().toLocaleString("en-US")
                    }
                    localStorage.setItem(Name, JSON.stringify(userData));
                }

        
            },1000)
        }

        endGame();
    
    });
});






