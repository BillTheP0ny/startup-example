async function loadScores() {
  let purchases;
  try {
    const response = await fetch("/api/purchases", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    purchases = await response.json();
    console.log(purchases);
    // Get the latest high scores from the service

    // Save the scores in case we go offline in the future
    localStorage.setItem("purchases", response);
  } catch {
    // If there was an error then just use the last saved scores
    const purchaseText = localStorage.getItem("purchases");
    if (purchaseText) {
      purchases = await JSON.parse(purchaseText);
    }
  }
  displayScores(purchases);
}

function displayScores(scores) {
  const tableBodyEl = document.querySelector("#scores");

  if (scores.length) {
    // Update the DOM with the scores
    for (const [i, score] of scores.entries()) {
      const positionTdEl = document.createElement("td");
      const nameTdEl = document.createElement("td");
      const scoreTdEl = document.createElement("td");
      const dateTdEl = document.createElement("td");

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = score.name;
      scoreTdEl.textContent = score.email;
      dateTdEl.textContent = score.address;

      const rowEl = document.createElement("tr");
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);
      rowEl.appendChild(dateTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = "<tr><td colSpan=4>Be the first to Buy!</td></tr>";
  }
}

loadScores();
