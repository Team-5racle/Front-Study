// main
document.addEventListener("DOMContentLoaded", () => {
    loadItems()
        .then(items => {
            displayItems(items);
            setEventListeners(items);
        })
        .catch(console.log);
});

// JSON에서 아이템 데이터 가져옴
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// 가져온 데이터를 HTML으로 만듬
function createHTMLString(item) {
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
        `;
}

// 만들어진 HTML 문자열로 리스트 업데이트
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// 버튼클릭 이벤트 핸들러
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    if (value === 'all') { // 모든 아이템 표시
        displayItems(items);
    } else {
        displayItems(items.filter(item => item[key] === value));
    }
}

// 이벤트 리스너 세팅
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.btn-group');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}