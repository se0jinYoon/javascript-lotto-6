import { Console, Random } from '@woowacourse/mission-utils';
import { check } from 'app';

class App {
  constructor() {
    this.PURCHASE_AMOUNT = 0;
    this.LOTTO_DUMP = [];
    this.USER_LOTTO = [];
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

  // 로또 번호 생성 메소드
  generateLottoDump() {
    const LOTTO_NUMBERS = Random.pickUniqueNumbersInRange(1, 45, 6);
    this.LOTTO_DUMP.push(LOTTO_NUMBERS.sort((a, b) => a - b));
  }

  // 구입 금액만큼 로또 번호 생성
  purchaseLottoList() {
    const LOTTO_AMOUNT = this.PURCHASE_AMOUNT / 1000;
    Console.print(`${LOTTO_AMOUNT}개를 구매했습니다.`);

    for (let i = 0; i < LOTTO_AMOUNT; i++) {
      this.generateLottoDump();
    }
    this.LOTTO_DUMP.forEach((lotto) => {
      Console.print(`[${lotto}]`);
    });
  }

  // 사용자 로또 번호 입력받기
  async userLottoInput() {
    while (true) {
      try {
        const USER_LOTTO_INPUT = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
        const USER_LOTTO_ARR = USER_LOTTO_INPUT.split(',');
        this.checkUserLottoInput(USER_LOTTO_ARR);
        this.USER_LOTTO = USER_LOTTO_ARR.sort((a, b) => a - b);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  checkUserLottoInput(userLottoInput) {
    if (userLottoInput.length !== 6) {
      throw new Error('[ERROR] 6개의 중복되지 않은 숫자를 입력해주세요');
    }
    if (userLottoInput.some((num) => isNaN(num))) {
      throw new Error('[ERROR] 1~45 사이의 숫자를 중복 없이 6개 입력해주세요');
    }
    if ([...new Set(userLottoInput)].length !== 6) {
      throw new Error('[ERROR] 중복되지 않은 숫자를 입력해주세요');
    }
    if (userLottoInput.some((num) => num < 1 || num > 45)) {
      throw new Error('[ERROR] 1~45 사이의 숫자를 입력해주세요');
    }
  }
}

export default App;
