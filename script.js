let exsetionList = document.querySelector('.exstenstion-list-content');
let lis = document.querySelectorAll('ul li');
let activeInfo = 'All';
let dataCache = [];

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    dataCache = data;
    renderExtensions();
    liActive();
  });

function liActive() {
  lis.forEach((li) => {
    li.addEventListener('click', () => {
      lis.forEach((li2) => li2.classList.remove('active'));
      li.classList.add('active');
      activeInfo = li.innerText;
      renderExtensions();
    });
  });
}

function renderExtensions() {
  exsetionList.innerHTML = '';

  dataCache.forEach((item) => {
    if (
      activeInfo === 'All' ||
      (activeInfo === 'Active' && item.isActive) ||
      (activeInfo === 'Inactive' && !item.isActive)
    ) {
      exsetionList.innerHTML += renderBox(item);
    }
  });

  let spans = document.querySelectorAll('.box-btn span');
  spans.forEach((span) => {
    span.addEventListener('click', () => {
      let name = span.dataset.name;
      let target = dataCache.find((item) => item.name === name);
      if (target) {
        target.isActive = !target.isActive;
        renderExtensions();
      }
    });
  });
}

function renderBox(item) {
  return `
    <div class="box">
      <div class="box-content">
        <img src="${item.logo}" alt="${item.name} logo" />
        <div class="text">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="box-btn">
        <button class="btn">Remove</button>
        <span data-name="${item.name}" class="${item.isActive ? '' : 'inactive'}"></span>
      </div>
    </div>
  `;
}

function lightToDark() {
  let body = document.querySelector("body");
  let changeImg = document.querySelector(".toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    changeImg.setAttribute("src", "assets/images/icon-moon.svg");
  } else {
    body.classList.remove("dark");
    changeImg.setAttribute("src", "assets/images/icon-sun.svg");
  }

  changeImg.addEventListener("click", () => {
    body.classList.toggle("dark");

    let currentSrc = changeImg.getAttribute("src");
    if (currentSrc.includes("icon-sun.svg")) {
      changeImg.setAttribute("src", "assets/images/icon-moon.svg");
      localStorage.setItem("theme", "dark");
    } else {
      changeImg.setAttribute("src", "assets/images/icon-sun.svg");
      localStorage.setItem("theme", "light"); 
    }
  });
}


lightToDark();