(async () => {
  let authenticated = false;
  const userName = localStorage.getItem("#name");
  if (userName) {
    const nameEl = document.querySelector("#playerName");
    nameEl.value = userName;
    const user = await getUser(nameEl.value);
    authenticated = user?.authenticated;
  }

  if (authenticated) {
    document.querySelector("#playerName").textContent = userName;
    setDisplay("loginControls", "none");
    setDisplay("playControls", "block");
  } else {
    setDisplay("loginControls", "block");
    setDisplay("playControls", "none");
  }
})();

async function loginUser() {
  const userName = document.querySelector("#loginName")?.value;
  const password = document.querySelector("#loginPassword")?.value;
  const response = await fetch(`/api/auth/login`, {
    method: "post",
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem("#name", userName);
    window.location.href = "play.html";
  } else {
    const modalEl = document.querySelector("#msgModal");
    // modalEl.querySelector(".modal-body").textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

async function createUser() {
  const userName = document.querySelector("#registerName")?.value;
  const password = document.querySelector("#registerPassword")?.value;
  const response = await fetch(`/api/auth/create`, {
    method: "post",
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem("#name", userName);
    window.location.href = "play.html";
  } else {
    const modalEl = document.querySelector("#msgModal");
    // modalEl.querySelector(".modal-body").textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function play() {
  window.location.href = "play.html";
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

async function getUser(email) {
  let scores = [];
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}
