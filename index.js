if (screen.width / screen.height > 1.5) {
    var st = 45;
    var cl = 15;
} else if (screen.width / screen.height <= 1.5 && screen.width / screen.height > 1.334) {
    var st = 40;
    var cl = 15;
} else if (screen.width / screen.height <= 1.334 && screen.width / screen.height > 1) {
    var st = 35;
    var cl = 15;
} else {
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

const slider = document.querySelectorAll('.slider');
const slider_text = document.querySelectorAll('.slider_text');

const cell_size = body.offsetHeight / 30;

const run_button = document.querySelector('.run_btn');
const run_icon = document.getElementById('run');
const run_info = document.querySelector('.run');

const delete_button = document.querySelector('.delete_btn');
const del_icon = document.getElementById('del');
const del_info = document.querySelector('.delete');

const speed_button = document.querySelector('.change_speed');
const speed_info = document.querySelectorAll('.slider_info');

const fill_button = document.querySelector('.fill_btn');
const fill_icon = document.getElementById('fill');
const fill_info = document.querySelector('.fill');

const cond_container = document.querySelector('.condition_container');
const condition_text = document.querySelectorAll('.condition_text')
const code_header = document.querySelector('.code_header');
const code = document.querySelector('.code');
const rule_condition = document.querySelectorAll('.rule_condition')

selected_color = 'rgb(200, 210, 220)'

var density = parseInt('50') * 0.01

const lang_ru = ['Конструктор клеточных автоматов', 'Скорость',
    'Очистить', 'Заполнить', 'Запустить', 'Пауза', 'c', 'Правила',
    'Рождение(B):', 'Выживание(S):', 'Поколения:', 'Задержка', 'Плотность'];
const lang_en = ['Cellular automaton consructor', 'Speed',
    'Clear', 'Random fill', 'Run', 'Pause', 's', 'Rules',
    'Born(B):', 'Survive(S):', 'Generations:', 'Delay', 'Density'];
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

slider[0].value = 0.5;
slider_text[0].innerHTML = slider[0].value + 's';

slider[1].value = 50;
slider_text[1].innerHTML = slider[1].value + '%';

del_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

fill_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

run_icon.style.height = table_head.offsetHeight * 0.5 + 'px';

code_header.style.height = table_head.offsetHeight + 'px';

code.style.width = cell_size * st + 20 + 'px';
code.style.fontSize = table_head.offsetHeight * 0.5 + 'px';

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

slider[0].oninput = function () {
    slider_text[0].innerHTML = this.value + lang_use[6];
};

slider[1].oninput = function () {
    slider_text[1].innerHTML = this.value + '%';
    density = parseInt(this.value) * 0.01
};
`
window.addEventListener('resize', function () {
    this.location.reload()
})`;

change_lang_ru.addEventListener('click', function (event) {

    change_lang_eng.style.color = '#bbbbbb';
    change_lang_ru.style.color = '#ffffff';
    lang_use = lang_ru;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    slider_text.textContent = slider.value + lang_use[6];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    code_header.textContent = lang_use[7];
    condition_text[0].textContent = lang_use[8];
    condition_text[1].textContent = lang_use[9];
    condition_text[2].textContent = lang_use[10];
    speed_info[0].textContent = lang_use[11];
    speed_info[1].textContent = lang_use[12];
});

change_lang_eng.addEventListener('click', function (event) {

    change_lang_ru.style.color = '#bbbbbb';
    change_lang_eng.style.color = '#ffffff';
    lang_use = lang_en;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    slider_text.textContent = slider.value + lang_use[6];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    run_info.textContent = lang_use[4];
    code_header.textContent = lang_use[7];
    condition_text[0].textContent = lang_use[8];
    condition_text[1].textContent = lang_use[9];
    condition_text[2].textContent = lang_use[10];
    speed_info[0].textContent = lang_use[11];
    speed_info[1].textContent = lang_use[12];
});

for (let i = 0; i < rule_condition.length; i++) {
    rule_condition[i].addEventListener('input', function (event) {
        rule_condition[i].value = rule_condition[i].value.replace(/[^0-9]/g, '');
    });
};

fill_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        var random_life = Math.random();
        if (random_life <= density) {
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

