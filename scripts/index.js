window.addEventListener("load", function()
{
    let userName = document.querySelector("input[name=name]");

    document.querySelector("button").onclick = () =>
    {
        let inputValue = userName.value;
        //let date = new Date().toLocaleString();
        localStorage.setItem('name', inputValue);
        location.href="http://127.0.0.1:5500/Project/game.html";
    }

    


})