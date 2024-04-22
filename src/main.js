const basketStarterEl = document.querySelector(`header .basket-starter`);
const basketEl = basketStarterEl.querySelector(`.basket`);
const BASKETSHOW = `show`;

basketStarterEl.addEventListener("click", function (event) {
  // 이벤트 버블링 방지
  // window 객체까지 이벤트가 가지 않는다
  event.stopPropagation();

  if (basketEl.classList.contains(BASKETSHOW)) {
    // hide
    hideBasket();
  } else {
    // show
    showBasket();
  }
});

basketEl.addEventListener("click", function (event) {
  // 드롭다운 메뉴를 클릭을 해도 꺼지지 않도록 하기 위함
  event.stopPropagation();
});

window.addEventListener("click", function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add(BASKETSHOW);
}

function hideBasket() {
  basketEl.classList.remove(BASKETSHOW);
}
