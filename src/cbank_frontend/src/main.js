// import App from './App';
// import './index.scss';
import { cbank_backend } from 'declarations/cbank_backend';

// const app = new App();

window.addEventListener("load", async function () {
    // console.log("Finished loading.");
    await cbank_backend.resetStates();

    const currentAmount = await cbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("Form submitted.");
    const button = event.target.querySelector("#submit-btn");
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    
    button.disabled = true;

    if (!(isNaN(inputAmount) || inputAmount < 0)) {
        await cbank_backend.topUp(inputAmount);
    }

    if (!(isNaN(withdrawalAmount) || withdrawalAmount < 0)) {
        await cbank_backend.withdraw(withdrawalAmount);
    }

    await cbank_backend.compound();

    const currentAmount = await cbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.disabled = false;
});
