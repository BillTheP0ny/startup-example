const clickBtn = document.getElementById("clickBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const submit = document.getElementById("submit");
const email = document.getElementById("email");
const card = document.getElementById("card");
const address = document.getElementById("address");
const name = document.getElementById("name");
const login = document.getElementById("loginBTN");
const username = document.getElementById("username");
const popupLogin = document.getElementById("popupLogin");
const usernameDisplay = document.getElementById("displayUsername");
const usernamelogin = document.getElementById("name");
const submitLogin = document.getElementById("submitLogin");
let socket = null;
console.log(popupLogin);

configureWebSocket();

clickBtn.addEventListener("click", () => {
  popup.style.display = "block";
});
clickBtn.addEventListener("click", () => {
  popup.style.display = "block";
});
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

submit.addEventListener("click", async () => {
  alert(
    `${"Thank you"} ${card.value} ${". Your order will be shipped to"} ${
      address.value
    } ${".A conformation email will be sent to"} ${
      email.value
    } ${"Your order total is 20$ and it will be charged"}`
  );

  const newPurchase = {
    address: address.value,
    email: email.value,
    name: card.value,
  };

  const response = await fetch("/api/purchases", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newPurchase),
  });
  broadcastEvent(card.value, "Recently Purchased");
});

login.addEventListener("click", () => {
  popupLogin.style.display = "block";
  console.log("hello");
  console.log(usernamelogin.value);
});

//submitLogin.addEventListener("click", () => {
//  console.log("submitLogin");
// popupLogin.style.display = "none";
//});

function submitBTN() {
  document.getElementById("popupLogin").style.display = "none";
  usernameDisplay.innerHTML += "Welcome ";
  localStorage.setItem("Username", usernamelogin.value);
  usernameDisplay.innerHTML += localStorage.getItem("Username");
  console.log("t");
  //usernameDisplay.innerHTML += usernamelogin.value;
}

var imageSrcHover = [];
$("#menu li").each(function (i, el) {
  imageSrcHover[i] = $(this).find("img").attr("src");

  $(el).click(function (event) {
    this.tlImageMenu = gsap.timeline();
    this.tlImageMenu.to("#box-menu .menu-img img", {
      duration: 0.9,
      x: "-105%",
      overwrite: true,
    });
    this.tlImageMenu.set("#box-menu .menu-img img", {
      attr: { src: imageSrcHover[i] },
    });
    this.tlImageMenu.set("#box-menu .menu-img img", { scale: 1.1 });
    this.tlImageMenu.to(
      "#box-menu .menu-img img",
      { duration: 1.6, ease: "power4.out", x: 0 },
      ">0.2"
    );
    this.tlImageMenu.to(
      "#box-menu .menu-img img",
      { duration: 1.3, scale: 1 },
      "<0.3"
    );
  });
});

$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

//var phrase = "John from ";
//var phrase2 = "England has recently bought a shirt!";
//var newPhrase = phrase.replace(/John/gi, "user");
//var newPhrase2 = phrase2.split("England").join("country");
//document.write(newPhrase, newPhrase2);
//4;

function callService(url, displayCallback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCallback(data);
    });
}

function configureWebSocket() {
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg("system", "game", "connected");
  };
  socket.onclose = (event) => {
    displayMsg("system", "game", "disconnected");
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    displayMsg("player", msg.from, msg.value);
  };
}

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector("#websocket");
  chatText.innerHTML =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` +
    chatText.innerHTML;
}

function broadcastEvent(from, value) {
  const event = {
    from: from,
    value: value,
  };
  socket.send(JSON.stringify(event));
}
