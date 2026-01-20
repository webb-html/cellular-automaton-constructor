if (screen.width / screen.height > 1.5){
    var st = 45;
    var cl = 15;
} else if (screen.width / screen.height <= 1.5 && screen.width / screen.height > 1.334){
    var st = 40;
    var cl = 15;
} else if (screen.width / screen.height <= 1.334 && screen.width / screen.height > 1) {
    var st = 35;
    var cl = 15;
}  else {
    var st = 15;
    var cl = 15;
}
console.log(screen.width / screen.height)

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

const cond_container = document.querySelector('.condition_container')
const code_header = document.querySelector('.code_header')
const code = document.querySelector('.code');

selected_color = 'rgb(200, 210, 220)'

const lang_ru = ['Конструктор клеточных автоматов', 'Скорость',
    'Очистить', 'Заполнить рандомно', 'Запустить', 'Пауза', 'c', 'Правила',
    'Cоздать клетку с цветом:', 'Удалить клету с цветом:', 'Перекрасить клетку с цветом:',
    'в цвет:', 'если:', 'Создать клетку если...', 'Удалить клетку если...',
    'Перекрасить клетку если...'];
const lang_en = ['Cellular automaton consructor', 'Speed',
    'Clear', 'Random fill', 'Run', 'Pause', 's', 'Rules',
    'Create cell with color:', 'Delete cell with color:', 'Recolor cell with color:',
    'in color:', 'if:', 'Create cell if...', 'Delete cell if...', 'Recolor cell if...'];
var lang_use = lang_en;

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

run_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

code_header.style.height = table_head.offsetHeight + 'px';

code.style.width = cell_size * st + 20 + 'px';
code.style.fontSize = table_head.offsetHeight * 0.5+ 'px';

cond_container.style.width = table_head.offsetWidth + 'px';



for (let i = 0; i < cl; i++) {
    for (let j = 0; j < st; j++) {
        div = document.createElement("div");
        div.style.height = cell_size + 'px';
        div.style.width = cell_size + 'px';
        div.classList.add('cell');
        div.addEventListener('click', function (event) {
            if (this.style.backgroundColor == 'rgb(34, 34, 34)' || this.style.backgroundColor == '') {
                this.style.backgroundColor = selected_color;
            } else {
                this.style.backgroundColor = '#222222';
            };
        });

        board.appendChild(div);
    }
};

slider.oninput = function () {
    slider_text.innerHTML = this.value + lang_use[6];
    console.log(`slider.value = ${this.value}`);
};
`
window.addEventListener('resize', function () {
    this.location.reload()
});`

change_lang_ru.addEventListener('click', function (event) {
    const condition_text_create = document.querySelectorAll('.condition_text_create');
    const condition_text_delete = document.querySelectorAll('.condition_text_delete');
    const condition_text_reclolor = document.querySelectorAll('.condition_text_recolor');
    const condition_text_in_color = document.querySelectorAll('.condition_text_in_color');
    const condition_text_if = document.querySelectorAll('.condition_text_if');

    change_lang_eng.style.color = '#bbbbbb';
    change_lang_ru.style.color = '#ffffff';
    lang_use = lang_ru;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    slider_text.textContent = slider.value + lang_use[6];
    speed_info.textContent = lang_use[1];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    code_header.textContent = lang_use[7]
    for (let i = 0; i < condition_text_create.length; i++) {
        condition_text_create[i].textContent = lang_use[8];
    };
    for (let i = 0; i < condition_text_delete.length; i++) {
        condition_text_delete[i].textContent = lang_use[9];
    };
    for (let i = 0; i < condition_text_reclolor.length; i++) {
        condition_text_reclolor[i].textContent = lang_use[10];
    };
    for (let i = 0; i < condition_text_in_color.length; i++) {
        condition_text_in_color[i].textContent = lang_use[11];
    };
    for (let i = 0; i < condition_text_if.length; i++) {
        condition_text_if[i].textContent = lang_use[12];
    };
    add_condition_btn.textContent = lang_use[13];
    kill_condition_btn.textContent = lang_use[14];
    recolor_condition_btn.textContent = lang_use[15];

});

change_lang_eng.addEventListener('click', function (event) {
    const condition_text_create = document.querySelectorAll('.condition_text_create');
    const condition_text_delete = document.querySelectorAll('.condition_text_delete');
    const condition_text_reclolor = document.querySelectorAll('.condition_text_recolor');
    const condition_text_in_color = document.querySelectorAll('.condition_text_in_color');
    const condition_text_if = document.querySelectorAll('.condition_text_if');

    change_lang_ru.style.color = '#bbbbbb';
    change_lang_eng.style.color = '#ffffff';
    lang_use = lang_en;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    slider_text.textContent = slider.value + lang_use[6];
    speed_info.textContent = lang_use[1];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    code_header.textContent = lang_use[7]
    for (let i = 0; i < condition_text_create.length; i++) {
        condition_text_create[i].textContent = lang_use[8];
    };
    for (let i = 0; i < condition_text_delete.length; i++) {
        condition_text_delete[i].textContent = lang_use[9];
    };
    for (let i = 0; i < condition_text_reclolor.length; i++) {
        condition_text_reclolor[i].textContent = lang_use[10];
    };
    for (let i = 0; i < condition_text_in_color.length; i++) {
        condition_text_in_color[i].textContent = lang_use[11];
    };
    for (let i = 0; i < condition_text_if.length; i++) {
        condition_text_if[i].textContent = lang_use[12];
    };
    add_condition_btn.textContent = lang_use[13];
    kill_condition_btn.textContent = lang_use[14];
    recolor_condition_btn.textContent = lang_use[15];

});

        `condition_color_inputs[i].style.fontSize = table_head.offsetHeight * 0.5 + 'px'`;
        `condition_color_inputs[i].addEventListener('input', function (e) {
            condition_color_inputs[i].value = condition_color_inputs[i].value.replace(/[^#0-9a-f]/g, '');`
            
fill_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        var random_life = Math.floor(Math.random() * 2);
        if (random_life == 1) {
            cells[i].style.backgroundColor = 'rgb(200, 210, 220)';
        } else {
            cells[i].style.backgroundColor = '#222222';
        }
    };
});

delete_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = '#222222';
    };
});

