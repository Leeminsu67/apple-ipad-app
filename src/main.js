// 장바구니
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

// 검색
const headerEl = document.querySelector(`header`);
const searchWrapEl = headerEl.querySelector(`.search-wrap`);
const searchStarterEl = headerEl.querySelector(`.search-starter`);
const searchCloserEl = searchWrapEl.querySelector(`.search-closer`);
const searchShadowEl = searchWrapEl.querySelector(`.shadow`);

searchStarterEl.addEventListener("click", showSearch);

searchCloserEl.addEventListener("click", hideSearch);

searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add(`searching`);
  // document의 최상위 요소 선택(html)
  document.documentElement.classList.add("fixed");
}

function hideSearch() {
  headerEl.classList.remove(`searching`);
  document.documentElement.classList.remove("fixed");
}
