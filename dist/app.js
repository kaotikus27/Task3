"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Replace with your actual API key
const apiKey = "f75420351aa11af56ae485c9";
const baseCurrency = "USD";
const targetCurrency = "PHP";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`;
// String url_str = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD";
// Function to fetch exchange rate data
function fetchExchangeRate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
            // Parse the response JSON
            const data = yield response.json();
            // Log the exchange rate
            // Update the page with the fetched data
            const amountSelectedElement = document.getElementById("amountSelected");
            const convertedValueElement = document.getElementById("convertedValue");
            const viceVersaElement = document.getElementById("viceVersa");
            if (amountSelectedElement) {
                amountSelectedElement.textContent = `1.00 ${data.base_code} =`;
            }
            if (convertedValueElement) {
                convertedValueElement.textContent = `${(5 * data.conversion_rate).toFixed(2)} ${data.target_code}`;
            }
            if (viceVersaElement) {
                viceVersaElement.textContent = `1 ${data.target_code} = ${(1 / data.conversion_rate).toFixed(3)} ${data.base_code}`;
            }
            console.log(`Exchange rate from ${data.base_code} to ${data.target_code}: ${data.conversion_rate}`);
            console.log(`Last updated: ${data.time_last_update_utc}`);
        }
        catch (error) {
            console.error("Failed to fetch data:", error);
        }
    });
}
// Call the function
