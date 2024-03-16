document.getElementById("ok").addEventListener("click", function () {
    go(4000);
});

setTimeout(function () {
    go(3000);
}, 10000);

setTimeout(function () {
    go(800);
}, 2000);

function go(nr) {
    document.querySelectorAll(".bb").forEach(function (element) {
        element.style.transitionDuration = "300ms";
        element.style.opacity = (element.style.opacity === "0") ? "1" : "0";
    });
    
    document.querySelectorAll(".message").forEach(function (element) {
        element.classList.toggle("comein");
    });

    document.querySelectorAll(".check").forEach(function (element) {
        element.classList.toggle("scaledown");
    });

    document.getElementById("go").style.transitionDuration = nr + "ms";
    document.getElementById("go").style.opacity = (document.getElementById("go").style.opacity === "0") ? "1" : "0";
}
