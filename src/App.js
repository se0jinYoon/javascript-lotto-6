import { Console, Random } from '@woowacourse/mission-utils';
import { check } from 'app';

class App {
  constructor() {
    this.PURCHASE_AMOUNT = 0;
    this.LOTTO_DUMP = [];
  }

  async play() {}

  // 구입 금액 입력 받기
  async purchaseAmountInput() {
    while (true) {
      try {
        const purchaseAmountInput = await Console.readLineAsync('구입 금액을 입력해 주세요.');
        this.checkPurchaseAmount(purchaseAmountInput);
        this.PURCHASE_AMOUNT = Number(purchaseAmountInput);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  // 구입 금액 확인
  checkPurchaseAmount(purchaseAmount) {
    if (isNaN(this.PURCHASE_AMOUNT)) {
      throw new Error('[ERROR] 숫자를 입력해주세요');
    }
    if (this.PURCHASE_AMOUNT % 1000) {
      throw new Error('[ERROR]1000단위로 입력해주세요');
    }
  }

  // 로또 번호 생성
  generateLottoDump() {
    const LOTTO_NUMBERS = Random.pickUniqueNumbersInRange(1, 45, 6);
    this.LOTTO_DUMP.push(LOTTO_NUMBERS.sort((a,b) => a-b));
  }
  

}

export default App;
