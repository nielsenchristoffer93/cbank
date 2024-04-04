import { html, render } from 'lit-html';
import { cbank_backend } from 'declarations/cbank_backend';
import logo from './logo2.svg';

class App {
  greeting = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await cbank_backend.greet(name);
    this.#render();
  };

  #render() {
    let body = html`
    <div class="container">
    <img src="dbank_logo.png" alt="DBank logo" width="100" />
    <h1>Current Balance: $<span id="value">234</span></h1>
    <div class="divider"></div>
    <form action="#">
      <h2>Amount to Top Up</h2>
      <input id="input-amount" type="number" step="0.01" min=0 name="topUp" value="" />
      <h2>Amount to Withdraw</h2>
      <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min=0 value="" />
      <input id="submit-btn" type="submit" value="Finalise Transaction" />
    </form>
  </div>
    `;
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);
  }
}

export default App;
