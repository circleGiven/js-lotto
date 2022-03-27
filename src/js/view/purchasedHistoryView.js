import { Wallet } from '../data/wallet.js';

const purchasedHistoryView = (function () {
  const $purchaseHistory = document.querySelector('section.mt-9');
  const $purchasedLottoAmount =
    $purchaseHistory.querySelector('label.my-0 span');
  const $showLottoNumbersToggleButton = document.querySelector(
    '.lotto-numbers-toggle-button'
  );
  const $purchasedLottoTickets = $purchaseHistory.querySelector(
    'div.d-flex.flex-wrap'
  );
  const wallet = new Wallet();

  function isShowLottoNumbers() {
    return $showLottoNumbersToggleButton.checked;
  }

  function getLottoTicket(lotto) {
    const $lotto = document.createElement('span');
    $lotto.classList.add('mx-1', 'text-4xl');
    $lotto.innerHTML = `🎟️ <span>${lotto.value}</span>`;
    return $lotto;
  }

  function changePurchaseLottoTickets(lottoList) {
    const $lottos = document.createDocumentFragment();
    lottoList.forEach((lotto) => {
      $lottos.appendChild(getLottoTicket(lotto));
    });

    $purchasedLottoTickets.replaceChildren($lottos);
  }

  function showPurchaseHistory() {
    $purchaseHistory.style.visibility = 'visible';
  }

  function hidePurchaseHistory() {
    $purchaseHistory.style.visibility = 'hidden';
  }

  function showPurchasedLottoNumbers() {
    $purchasedLottoTickets
      .querySelectorAll('span > span')
      .forEach(($ticketNumber) => $ticketNumber.classList.remove('hide'));
  }

  function hidePurchasedLottoNumbers() {
    $purchasedLottoTickets
      .querySelectorAll('span > span')
      .forEach(($ticketNumber) => $ticketNumber.classList.add('hide'));
  }

  function changeShowLottoNumbersByToggleStatus() {
    if (isShowLottoNumbers()) {
      showPurchasedLottoNumbers();
      return;
    }

    hidePurchasedLottoNumbers();
  }

  function eventBindings() {
    $showLottoNumbersToggleButton.addEventListener(
      'click',
      changeShowLottoNumbersByToggleStatus
    );
  }

  function changePurchasedLottoAmount(amount) {
    $purchasedLottoAmount.innerText = amount;
  }

  function changePurchasedHistory(lottoList = []) {
    wallet.setLottos(lottoList);
    changePurchasedLottoAmount(lottoList.length);
    changePurchaseLottoTickets(lottoList);
    showPurchaseHistory();
    changeShowLottoNumbersByToggleStatus();
  }

  function initial() {
    wallet.removeAllLottos();
    hidePurchaseHistory();
  }

  eventBindings();

  return { initial, changePurchasedHistory };
})();

export default purchasedHistoryView;
