import ipadsData from "../data/ipads.js";
import navigations from "../data/navigations.js";

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

searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});

searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add(`searching`);
  // document의 최상위 요소 선택(html)
  stopScroll();
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
  playScroll();
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

function playScroll() {
  document.documentElement.classList.remove("fixed");
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// header menu toggle
const menuStarterEl = document.querySelector(`header .menu-starter`);

menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains(`menuing`)) {
    headerEl.classList.remove(`menuing`);
    searchInputEl.value = ``;
    playScroll();
  } else {
    headerEl.classList.add(`menuing`);
    stopScroll();
  }
});

// header search
const searchTextFieldEl = document.querySelector(`header .textfield`);
const searchCanelEl = document.querySelector(`header .search-canceler`);

searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add(`searching--mobile`);
});

searchCanelEl.addEventListener("click", function () {
  headerEl.classList.remove(`searching--mobile`);
  searchInputEl.focus();
});

// 화면의 크기가 바뀔때마다
window.addEventListener("resize", function () {
  if (this.window.innerWidth <= 740) {
    headerEl.classList.remove(`searching`);
  } else {
    headerEl.classList.remove(`searching--mobile`);
  }
});

// 네비게이션 메뉴 토글! [모바일]
const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
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

const navigationsEl = document.querySelector(`footer .navigations`);

navigations.forEach(function (nav) {
  const mapEl = document.createElement(`div`);
  mapEl.classList.add(`map`);

  let mapList = ``;
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

const thisYear = document.querySelector(`span.this-year`);
thisYear.textContent = new Date().getFullYear();

// footer mobile
const mapEls = document.querySelectorAll(`footer .navigations .map`);
mapEls.forEach(function (el) {
  const h3El = el.querySelector(`h3`);
  h3El.addEventListener("click", function () {
    el.classList.toggle(`active`);
  });
});
