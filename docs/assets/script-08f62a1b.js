let menu = false;
let detector = false;
let regionSelector = false;
let detectorInteracted = false;
let showLogin = false;
let crtState = '';
let crtFlag = 'denmark.svg';
const local = 'Kastrup, Danmark';
const regions = [
  {
    imgSrc: './images/flags/usa.svg',
    title: 'USA',
    anchor: '#',
    active: false,
  },
  {
    imgSrc: './images/flags/denmark.svg',
    title: 'Danmark',
    active: true,
  },
  {
    imgSrc: './images/flags/german.svg',
    title: 'Deutshland',
    active: false,
  },
  {
    imgSrc: './images/flags/norway.svg',
    title: 'Norge',
    active: false,
  },
  {
    imgSrc: './images/flags/finland.svg',
    title: 'Suomi',
    active: false,
  },
  {
    imgSrc: './images/flags/sweden.svg',
    title: 'Sverige',
    active: false,
  },
];

const menuBtn = document.querySelector('#menuBtn');
const menuEl = document.querySelector('#menu');
const menuIcon = document.querySelector('#menuBtn > img');
const regionBtn = document.querySelectorAll('.regionBtn');
const regionEl = document.querySelectorAll('.regionMenu');
const regionIcon = document.querySelectorAll('.regionBtn > img');
const states = ['CA', 'NJ', 'NY'];
let openIcon = 'burger-menu.svg';
let closeIcon = 'burger-exit.svg';

/* Gets url params */
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

console.log(`Logged in: ${params.logged ? true : false}`);

/* Toggles Body Scroll */
const toggleScroll = (bool) => {
  if (
    bool != undefined &&
    typeof bool == 'boolean' &&
    window.screen.width < 640
  ) {
    const body = document.querySelector('body');
    if (!bool && !menu && !showLogin) {
      body.style.overflow = 'auto';
    } else if (bool) body.style.overflow = 'hidden';
  }
};

/* Menu Toggle Event */
menuBtn.addEventListener('click', () => {
  menu = !menu;
  if (!menu) {
    toggleScroll(false);
    menuEl.classList.add('hide');
    menuIcon.setAttribute('src', `./images/${openIcon}`);
  } else {
    toggleScroll(true);
    menuEl.classList.remove('hide');
    menuIcon.setAttribute('src', `./images/${closeIcon}`);
  }
});

/* RegionSelector Toggle Event */
const toggleRegionSelector = () => {
  regionSelector = !regionSelector;
  if (!regionSelector) {
    regionEl.forEach((element) => {
      element.classList.add('hide');
    });
  } else regionEl.forEach((element) => element.classList.remove('hide'));
};

/* Adds an eventlistener to all Region Buttons - Dekstop & Mobile */
regionBtn.forEach((btn) => btn.addEventListener('click', toggleRegionSelector));

/* Activates clicked dropdown */
const activate = (element) => {
  let icon = element.querySelector('.triangle');
  let dropdown = element.nextElementSibling;
  element.style.color = '#2B7EE1';
  icon.style.transform = 'rotate(180deg)';
  element.setAttribute('data-active', 'true');
  if (dropdown.classList.contains('dropdown'))
    dropdown.classList.remove('hide');
};

/* Sets the region icon to what you clicked */
/* Expects imgSrc of clicked icon and state? */
const setRegionIcon = (url, state = '') => {
  regionIcon.forEach((icon) => {
    regionBtn.forEach((btn) => {
      btn.setAttribute('data-state', state);
    });
    icon.nextElementSibling.textContent = state;
    icon.setAttribute('src', url);
  });
};

/* Region Click Handler */
/* Expects pointerEvent and state? */
const regionClickHandler = (e, state = '') => {
  regionSelector && toggleRegionSelector();
  if (e) {
    typeof e != 'string'
      ? (crtFlag = e.target.getAttribute('src'))
      : (crtFlag = e);
    setRegionIcon(crtFlag, state);
    regions.forEach((region) => {
      if (crtFlag == region.imgSrc) {
        region.active = true;
      } else region.active = false;
    });
  }
  regionEl.forEach((element) => {
    element.innerHTML = ``;
  });
  regions.forEach(({imgSrc, title, active}) => {
    if (!active)
      regionEl.forEach((element) => {
        let liElement = document.createElement('li');
        if (title.toLowerCase() != 'usa') {
          let buttonElement = document.createElement('button');
          buttonElement.className +=
            'flex gap-2 w-10 region rounded-md shadow-md';
          buttonElement.innerHTML += `<img src="${imgSrc}" alt="${title}" />`;
          liElement.append(buttonElement);
          buttonElement.onclick = (e) => regionClickHandler(e);
        } else {
          let selectElement = document.createElement('select');
          selectElement.style.backgroundImage =
            "url('./images/flags/usaSelect.svg')";
          selectElement.style.appearance = 'none';
          selectElement.className +=
            'flex gap-2 w-10 region rounded-md shadow-md px-[2px] grid place-content-center h-10 bg-black text-white text-xs font-bold cursor-pointer';
          selectElement.innerHTML += `<option value="" disabled hidden selected></option>
				${states
          .map((state) => {
            return `<option value="${state}">${state}</option>`;
          })
          .join('')}`;
          liElement.append(selectElement);
          selectElement.onchange = (e) =>
            regionClickHandler('./images/flags/usa.svg', e.target.value);
        }
        element.append(liElement);
      });
  });
};
regionClickHandler();
setRegionIcon(`./images/flags/${crtFlag}`);

/* MENU */
const menuListEl = document.querySelectorAll('.menuList');
const dropdownBtns = document.querySelectorAll('.dropdownBtn');

dropdownBtns.forEach(
  (btn) => (btn.onclick = (e) => toggleDropdown(e.currentTarget))
);

/* Dropdown Click Handler */
/* Expects this and boolean */
const toggleDropdown = (el, bool = true) => {
  if (bool) {
    /* If regionSelector is opened then close */
    regionSelector && toggleRegionSelector();
    /* Toggles All Dropdown Buttons */
    dropdownBtns.forEach((btn) => btn != el && deactivate(btn));
    /* Toggles button element */
    if (el.getAttribute('data-active') != 'true') {
      activate(el);
    } else deactivate(el);
  } else if (!bool) dropdownBtns.forEach((btn) => deactivate(btn));
};

/* Deactivates clicked dropdown */
const deactivate = (element) => {
  let icon = element.querySelector('.triangle');
  let dropdown = element.nextElementSibling;
  element.style.color = 'black';
  /* element.style.fill = 'black'; */
  icon.style.transform = 'rotate(0)';
  element.setAttribute('data-active', 'false');
  if (dropdown.classList.contains('dropdown')) dropdown.classList.add('hide');
};

/* Toggle Login Menu Event */
document.querySelectorAll('#loginBtn, #loginExit > img').forEach((btn) => {
  btn.addEventListener('click', () => {
    const loginElement = document.querySelector('#login');
    if (loginElement && !loginElement.classList.contains('hide')) {
      showLogin = false;
      toggleScroll(false);
      loginElement.classList.add('hide');
    } else {
      showLogin = true;
      toggleScroll(true);
      loginElement.classList.remove('hide');
    }
  });
});

/* Hide menus if you click outside nav */
document.addEventListener('click', (e) => {
  if (e.target.localName == 'my-app') {
    toggleDropdown(null, false);
    regionSelector && toggleRegionSelector();
  }
});
