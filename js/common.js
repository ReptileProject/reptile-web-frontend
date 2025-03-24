document.addEventListener("DOMContentLoaded", function(){
    fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
    })
})

document.addEventListener("DOMContentLoaded", function(){
    fetch("/components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
    })
})