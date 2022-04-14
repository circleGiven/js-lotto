import AbstractView from './AbstractView.js';
import PurchaseLottoView from './PurchaseLottoView.js';
import WinningLottoView from './WinningLottoView.js';

class App extends AbstractView {
  static #purchasedLotto() {
    WinningLottoView.showWinningLotto();
  }

  static eventBindings() {
    PurchaseLottoView.eventBindings(this.#purchasedLotto);
    WinningLottoView.eventBindings(this.initialize);
  }

  static initialize() {
    PurchaseLottoView.initialize();
    WinningLottoView.initialize();
  }
}
export default App;
