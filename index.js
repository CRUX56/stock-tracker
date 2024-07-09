const symbolInput = document.querySelector("#symbol");
const stockList = document.querySelector("#stock-list");

// Function fetches the most recent top 10 stocks

function fetchTopStocks() {
  fetch(
    "https://www.alphavantage.co/query?function=SECTOR&apikey=XO3Q8FE67Q6BOUR3"
  )
    .then((response = response.json()))
    .then((data) => {
      //const stocks = data[""];
    });
}

function fetchStockData(symbol) {
  // If input is empty display another message other than the top 10 stocks
  if (!symbol) {
    symbolInput.innerHTML = "Please type in a valid stock marker";
  }

  // Fetch the stock data for the provided symbol from the api

  fetch(
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=XO3Q8FE67Q6BOUR3"
  )
    .then((response) => response.json())
    .then((data) => {
      const quote = data["Global Quote"];
      if (quote && quote["10. change percent"]) {
        const changePercent = quote["10. change percent"].replace("%", "");
        const changeColor = parseFloat(change) >= 0 ? "green" : "red";
        const html = `<li>
            <span class="symbol">${symbol}</span>
            <span class="change" style="color: ${changeColor}">${changePercent}
        </li>`;
        stockList.innerHTML = html;
      } else {
        stockList.innerHTML = '<li class="error">Invalid Symbol</li>';
      }
    })
    .catch((error) => console.error(error));
}

// Display Form Data on page load

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get symbol entered by the user and convert it to uppercase.
  const symbol = symbolInput.value.toUppercase;

  fetchStockData(symbol);
});
