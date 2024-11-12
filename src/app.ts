// Define the types for the API response
interface ExchangeRateResponse {
  conversion_rate: number;
  base_code: string;
  target_code: string;
  time_last_update_utc: string;
}

// Replace with your actual API key
const apiKey = "f75420351aa11af56ae485c9";
const baseCurrency = "USD";
const targetCurrency = "PHP";

const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`;
// String url_str = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD";

// Function to fetch exchange rate data
async function fetchExchangeRate(): Promise<void> {
  try {
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
    }

    // Parse the response JSON
    const data: ExchangeRateResponse = await response.json();

    // Log the exchange rate
    // Update the page with the fetched data
    const amountSelectedElement = document.getElementById("amountSelected");
    const convertedValueElement = document.getElementById("convertedValue");
    const viceVersaElement = document.getElementById("viceVersa");

    if (amountSelectedElement) {
      amountSelectedElement.textContent = `1.00 ${data.base_code} =`;
    }

    if (convertedValueElement) {
      convertedValueElement.textContent = `${(5 * data.conversion_rate).toFixed(
        2
      )} ${data.target_code}`;
    }

    if (viceVersaElement) {
      viceVersaElement.textContent = `1 ${data.target_code} = ${(
        1 / data.conversion_rate
      ).toFixed(3)} ${data.base_code}`;
    }
    console.log(
      `Exchange rate from ${data.base_code} to ${data.target_code}: ${data.conversion_rate}`
    );
    console.log(`Last updated: ${data.time_last_update_utc}`);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Call the function
