import ipadsData from "../data/ipads.js";

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
const headerMenuEls = [...headerEl.querySelectorAll(`ul.menu > li`)];
const searchWrapEl = headerEl.querySelector(`.search-wrap`);
const searchStarterEl = headerEl.querySelector(`.search-starter`);
const searchCloserEl = searchWrapEl.querySelector(`.search-closer`);
const searchShadowEl = searchWrapEl.querySelector(`.shadow`);
const searchInputEl = searchWrapEl.querySelector(`input`);
const searchDelayEls = [...searchWrapEl.querySelectorAll(`li`)];

searchStarterEl.addEventListener("click", showSearch);

searchCloserEl.addEventListener("click", hideSearch);

searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add(`searching`);
  // document의 최상위 요소 선택(html)
  document.documentElement.classList.add("fixed");
  // 애니메이션 효과
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${(index * 0.4) / headerMenuEls.length}s`;
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = `${(index * 0.4) / searchDelayEls.length}s`;
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove(`searching`);
  document.documentElement.classList.remove("fixed");
  // 애니메이션 효과
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${(index * 0.4) / headerMenuEls.length}s`;
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = `${(index * 0.4) / searchDelayEls.length}s`;
  });
  searchDelayEls.reverse();
  searchInputEl.value = ``;
}

// 요소 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add(`show`);
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

// VIDEO CONTROLL

const video = document.querySelector(`.stage video`);
const playBtn = document.querySelector(`.stage .controller--play`);
const pauseBtn = document.querySelector(`.stage .controller--pause`);

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add(`hide`);
  pauseBtn.classList.remove(`hide`);
});

pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove(`hide`);
  pauseBtn.classList.add(`hide`);
});

// Compare data 랜더링

const itemsEl = document.querySelector(`section.compare .items`);

ipadsData.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add(`item`);
  // toLocalString은 미국 원화 3자리 마다 콤마를 넣어줌
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorsArr(ipad.colors)}
    </ul>

    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
});

function colorsArr(colorList) {
  let colorHTMLStr = ``;
  colorList.forEach(function (color) {
    colorHTMLStr += `<li style="background-color: ${color};"></li>`;
  });
  return colorHTMLStr;
}
