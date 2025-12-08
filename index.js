var st = 45;
const cl = 15;

const body = document.body;

const change_lang_ru = document.querySelector('#ru_lng');
const change_lang_eng = document.querySelector('#en_lng');
const sel_lang = document.querySelector('.select_language');

const _h1_info = document.querySelector('._h1_info');
const _h1 = document.querySelector('._h1');

const table = document.querySelector('.table');
const table_head = document.querySelector('.table_head');
const board = document.querySelector('.cell_container');

const slider = document.querySelector('.slider');
const slider_text = document.querySelector('.slider_text');

var sel_color = document.querySelectorAll('.sel_color');
const colors = document.querySelectorAll('.sel_color');
const color = document.querySelectorAll('.col');

const cell_size = body.offsetHeight / 30;

const run_button = document.querySelector('.run_btn');
const run_icon = document.getElementById('run');
const run_info = document.querySelector('.run');

const delete_button = document.querySelector('.delete_btn');
const del_icon = document.getElementById('del');
const del_info = document.querySelector('.delete');

const speed_button = document.querySelector('.change_speed');
const speed_info = document.querySelector('.slider_info');

const fill_button = document.querySelector('.fill_btn');
const fill_icon = document.getElementById('fill');
const fill_info = document.querySelector('.fill');

const add_button = document.querySelectorAll('.add_btn');
const add_col_icon = document.getElementById('add_col');

const code = document.querySelector('.code');
const code_header = document.querySelector('.code_header');

const color_container = document.querySelector('.colors');

const cond_container = document.querySelector('.condition_container');

var lang_ru = ['Конструктор клеточных автоматов', 'Скорость', 'Очистить', 'Заполнить рандомно', 'Запустить', 'Пауза', 'Правила'];
var lang_en = ['Cellular automaton consructor', 'Speed', 'Clear', 'Random fill', 'Run', 'Pause', 'Rules'];
var lang_use = lang_en;


function initUi() {
    document.title = lang_use[0];

    sel_lang.style.fontSize = sel_lang.offsetHeight * 0.33 + 'px';
    change_lang_ru.style.color = '#bbbbbb';

    _h1.style.height = body.offsetHeight * 0.1 + 'px';
    _h1.style.fontSize = _h1.offsetHeight * 0.33 + 'px';
    _h1_info.textContent = lang_use[0];

    board.style.width = cell_size * st + 'px';
    board.style.height = cell_size * cl + 'px';

    table.style.width = cell_size * st + 20 + 'px';
    table.style.height = (cell_size * cl) * 1.1 + 'px';

    table_head.style.width = cell_size * st + 'px';
    table_head.style.fontSize = table_head.offsetHeight * 0.5 + 'px';

    slider.value = 0.5;
    slider_text.innerHTML = slider.value + 's';
    slider.style.height = table_head.offsetHeight * 0.5 + 'px';
    slider.style.setProperty('--sliderSize', table_head.offsetHeight * 0.5 + 'px');

    del_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

    fill_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

    run_button.style.left = ((cell_size * st) - (2 * run_button.offsetWidth) - speed_button.offsetWidth - delete_button.offsetWidth - fill_button.offsetWidth) + 'px';
    run_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

    code_header.style.height = table_head.offsetHeight + 'px';

    code.style.width = cell_size * st + 20 + 'px';
    code.style.fontSize = table_head.offsetHeight * 0.5 + 'px';

    for (let i = 0; i < sel_color.length; i++) {
        sel_color[i].style.setProperty('--size', table_head.offsetHeight * 1.1 + 'px');
        console.log(sel_color[i], sel_color[i].value);
        color[i].textContent = sel_color[i].value;
    }

    add_button[0].style.height = table_head.offsetHeight + 'px';
    add_button[0].style.width = table_head.offsetHeight + 'px'
    add_col_icon.style.height = table_head.offsetHeight * 0.5 + 'px';
    add_col_icon.style.setProperty('--iconMargin', '0px');

    cond_container.style.width = table_head.offsetWidth + 'px';

    console.log('init done');
}

function printValues() {
    console.log('[' + Date().toLocaleString() + ']');
    console.log('Apply sel_lang.style.fontSize = ' + sel_lang.offsetHeight * 0.33 + 'px');
    console.log('Apply _h1.style.height = ' + body.offsetHeight * 0.1 + 'px');
    console.log('Apply _h1.style.fontSize = ' + _h1.offsetHeight * 0.33 + 'px');
    console.log('Apply board.style.width = ' + cell_size * st + 'px');
    console.log('Apply board.style.height = ' + cell_size * cl + 'px');
    console.log('Apply table.style.width = ' + cell_size * st + 20 + 'px');
    console.log(`Apply run_button.style.left = ${cell_size * 24.5} px`);
    console.log(' ');
    console.log('[' + Date().toLocaleString() + ']');
}

console.log('[' + Date().toLocaleString() + ']');
console.log('window: (' + window.screen.width + ', ' + window.screen.height + ')');
console.log('skreen: (' + screen.width + ', ' + screen.height + ')');
console.log('body: (' + body.offsetWidth + ', ' + body.offsetHeight + ')');
console.log('propotion: ' + body.offsetWidth / body.offsetHeight);
console.log('board         <= .cell_container');
console.log('table         <= .table');
console.log('table_head    <= .table_head');
console.log('delete_button <= .delete_btn');
console.log('speed_button  <= .change_speed');
console.log('fill_button   <= .fill_btn');
console.log('run_button    <= .run_btn');
console.log('sel_lang      <= .select_language');
console.log('_h1           <= ._h1');
console.log('cell_size     <= ' + body.offsetHeight / 40);
console.log(' ');

for (let i = 0; i < cl; i++) {
    for (let j = 0; j < st; j++) {
        div = document.createElement("div");
        div.style.height = cell_size + 'px';
        div.style.width = cell_size + 'px';
        div.classList.add('cell');

        board.appendChild(div);
    }
}

slider.oninput = function () {
    slider_text.innerHTML = this.value + 's';
    console.log(`slider.value = ${this.value}`);
}

window.addEventListener('resize', function () {
    initUi()
});

change_lang_ru.addEventListener('click', function (event) {
    change_lang_eng.style.color = '#bbbbbb';
    change_lang_ru.style.color = '#ffffff';
    lang_use = lang_ru;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    speed_info.textContent = lang_use[1];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    run_button.style.left = ((cell_size * st) - (1.5 * run_button.offsetWidth) - speed_button.offsetWidth - delete_button.offsetWidth - fill_button.offsetWidth) + 'px';
});

change_lang_eng.addEventListener('click', function (event) {
    change_lang_ru.style.color = '#bbbbbb';
    change_lang_eng.style.color = '#ffffff';
    lang_use = lang_en;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    speed_info.textContent = lang_use[1];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    run_button.style.left = ((cell_size * st) - (2 * run_button.offsetWidth) - speed_button.offsetWidth - delete_button.offsetWidth - fill_button.offsetWidth) + 'px';
});

function add_color_listeners() {
    const colors = document.querySelectorAll('.sel_color');
    const color = document.querySelectorAll('.col');

    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener("input", function (event) {
            color[i].textContent = colors[i].value;
            console.log(1);
        })
    }
}

add_button[0].addEventListener('click', function (event) {
    elem_col = document.createElement('div');
    elem_col.classList.add('col_elem');


    color_input = document.createElement('input');
    color_input.setAttribute("type", "color");
    color_input.classList.add('sel_color');
    color_input.value = '#000000';

    color_text = document.createElement('div');
    color_text.classList.add('col');
    color_text.textContent = '#000000';

    elem_col.appendChild(color_input);
    elem_col.appendChild(color_text);
    color_container.appendChild(elem_col);

    console.log('create new colors');

    add_color_listeners();
    initUi();
});

initUi();
printValues();
add_color_listeners();