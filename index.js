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
const add_cond_icon = document.getElementById('add_cond');

const code = document.querySelector('.code');
const code_header = document.querySelector('.code_header');

const color_container = document.querySelector('.colors');

const cond_container = document.querySelector('.condition_container');

const sel_cond_alive = document.getElementById('sel_cond_alive');
const sel_cond_kill = document.getElementById('sel_cond_kill');
const sel_cond_recol = document.getElementById('sel_cond_recol');

const add_condition_btn = document.getElementById('add_condition_btn');
const kill_condition_btn = document.getElementById('kill_condition_btn');
const recolor_condition_btn = document.getElementById('recolor_condition_btn');

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

var selected_color = null;


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

for (let i = 0; i < colors.length; i++) {
    colors[i].style.setProperty('--size', table_head.offsetHeight * 1.1 + 'px');
    color[i].textContent = colors[i].value;
}

add_button[0].style.height = table_head.offsetHeight + 'px';
add_button[0].style.width = table_head.offsetHeight + 'px'
add_col_icon.style.height = table_head.offsetHeight * 0.5 + 'px';
add_col_icon.style.setProperty('--iconMargin', '0px');

add_button[1].style.height = table_head.offsetHeight + 'px';
add_cond_icon.style.height = table_head.offsetHeight * 0.5 + 'px';
add_cond_icon.style.setProperty('--iconMargin', '0px');

sel_cond_alive.style.visibility = 'hidden'
sel_cond_alive.style.width = '0px'

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

window.addEventListener('resize', function () {
    this.location.reload()
});

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
    run_button.style.left = ((cell_size * st) - (1.5 * run_button.offsetWidth) - speed_button.offsetWidth - delete_button.offsetWidth - fill_button.offsetWidth) + 'px';
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
    run_button.style.left = ((cell_size * st) - (2 * run_button.offsetWidth) - speed_button.offsetWidth - delete_button.offsetWidth - fill_button.offsetWidth) + 'px';
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

function add_color_listeners() {
    const col_elem = document.querySelectorAll('.col_elem');
    const colors = document.querySelectorAll('.sel_color');
    const color = document.querySelectorAll('.col');
    const del_elem = document.querySelectorAll('.del_elem');

    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener("input", function (event) {
            color[i].textContent = colors[i].value;
            for (let i = 0; i < col_elem.length; i++) {
                col_elem[i].style.boxShadow = '';
            };
            selected_color = null
        })
    };
    for (let i = 0; i < del_elem.length; i++) {
        del_elem[i].style.height = '0px';
        del_elem[i].addEventListener('click', function () {
            this.parentNode.remove();
        });
        col_elem[i].onmouseover = function () {
            del_elem[i].style.height = table_head.offsetHeight * 0.5 + 'px'
            del_elem[i].style.marginLeft = '4px';
            del_elem[i].style.visibility = 'visible';
        };
        col_elem[i].onmouseout = function () {
            del_elem[i].style.height = '0px'
            del_elem[i].style.marginLeft = '0px';
            del_elem[i].style.visibility = 'hidden';
        };
    };
    for (let i = 0; i < col_elem.length; i++) {
        col_elem[i].addEventListener('click', function () {
            for (let i = 0; i < col_elem.length; i++) {
                col_elem[i].style.boxShadow = '';
            };
            this.style.boxShadow = 'white -1px -1px 3px, white 1px  1px 3px, inset white 0px 0px 3px';
            selected_color = colors[i].value
        })
    };
};

function init_conditions_ui() {
    const conditions = document.querySelectorAll('.condition');
    const visual_colors = document.querySelectorAll('.color_visual');
    const condition_color_inputs = document.querySelectorAll('.condition_color_input');
    const rule_conditions = document.querySelectorAll('.rule_condition');
    const del_cond = document.querySelectorAll('.del_cond');

    for (let i = 0; i < condition_color_inputs.length; i++) {
        condition_color_inputs[i].style.fontSize = table_head.offsetHeight * 0.5 + 'px';
        condition_color_inputs[i].addEventListener('input', function (e) {
            condition_color_inputs[i].value = condition_color_inputs[i].value.replace(/[^#0-9a-f]/g, '');
            if (condition_color_inputs[i].value[0] === '#' && !(condition_color_inputs[i].value.includes("#", 1)) && (condition_color_inputs[i].value.length === 7)) {
                visual_colors[i].style.width = table_head.offsetHeight * 0.7 + 'px';
                visual_colors[i].style.height = table_head.offsetHeight * 0.7 + 'px';
                visual_colors[i].style.marginLeft = '5px'
                visual_colors[i].style.backgroundColor = condition_color_inputs[i].value;
            } else {
                visual_colors[i].style.width = '0px';
                visual_colors[i].style.height = '0px';
                visual_colors[i].style.marginLeft = '0px'
                visual_colors[i].style.backgroundColor = condition_color_inputs[i].value;
            };
            console.log(condition_color_inputs[i].value[0] === '#' && !(condition_color_inputs[i].value.includes("#", 1)) && (condition_color_inputs[i].value.length === 7), 'color');
        });
    };
    for (let i = 0; i < conditions.length; i++) {
        rule_conditions[i].style.fontSize = table_head.offsetHeight * 0.5 + 'px';
        del_cond[i].style.height = table_head.offsetHeight * 0.5 + 'px';
        del_cond[i].style.visibility = 'hidden';
        del_cond[i].addEventListener('click', function () {
            this.parentNode.remove();
        });
        conditions[i].onmouseover = function () {
            del_cond[i].style.visibility = 'visible';
        };
        conditions[i].onmouseout = function () {
            del_cond[i].style.visibility = 'hidden';
        };
    };
};

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

    del_col = document.createElement('img');
    del_col.src = "delete.svg";
    del_col.classList.add('icon');
    del_col.classList.add('del_elem');

    elem_col.appendChild(color_input);
    elem_col.appendChild(color_text);
    elem_col.appendChild(del_col)
    color_container.appendChild(elem_col);

    console.log('create new colors');

    add_color_listeners();
    initUi();
});

add_button[1].onmouseover = function () {
    sel_cond_alive.style.width = ''
    sel_cond_alive.style.marginLeft = '10px';
    sel_cond_alive.style.paddingLeft = '10px';
    sel_cond_alive.style.visibility = 'visible';

    sel_cond_kill.style.width = '';

    sel_cond_recol.style.width = '';
};

add_condition_btn.addEventListener('click', function (event) {
    cond = document.createElement('div');
    cond.classList.add('condition');

    p1 = document.createElement('p');
    p1.textContent = lang_use[8];
    p1.classList.add('condition_text_create')

    vis_col = document.createElement('div');
    vis_col.classList.add('color_visual');

    cond_col_input = document.createElement('input');
    cond_col_input.classList.add('condition_color_input');
    cond_col_input.placeholder = "color";
    cond_col_input.maxLength = '7';
    cond_col_input.setAttribute("type", "text");

    p2 = document.createElement('p');
    p2.textContent = lang_use[12];
    p2.classList.add('condition_text_if')

    cond_rul_input = document.createElement('input');
    cond_rul_input.classList.add('rule_condition');
    cond_rul_input.placeholder = "write a condition";
    cond_rul_input.setAttribute("type", "text");

    del_cond = document.createElement('img');
    del_cond.src = "delete.svg";
    del_cond.classList.add('icon');
    del_cond.classList.add('del_cond');


    cond.appendChild(p1);
    cond.appendChild(vis_col);
    cond.appendChild(cond_col_input);
    cond.appendChild(p2)
    cond.appendChild(cond_rul_input)
    cond.appendChild(del_cond)
    cond_container.appendChild(cond);

    console.log('create new add condition')

    init_conditions_ui();
});

kill_condition_btn.addEventListener('click', function (event) {
    cond = document.createElement('div');
    cond.classList.add('condition');

    p1 = document.createElement('p');
    p1.textContent = lang_use[9];
    p1.classList.add('condition_text_delete');

    vis_col = document.createElement('div');
    vis_col.classList.add('color_visual');

    cond_col_input = document.createElement('input');
    cond_col_input.classList.add('condition_color_input');
    cond_col_input.placeholder = "color";
    cond_col_input.maxLength = '7';
    cond_col_input.setAttribute("type", "text");

    p2 = document.createElement('p');
    p2.textContent = lang_use[12];
    p2.classList.add('condition_text_if');

    cond_rul_input = document.createElement('input');
    cond_rul_input.classList.add('rule_condition');
    cond_rul_input.placeholder = "write a condition";
    cond_rul_input.setAttribute("type", "text");

    del_cond = document.createElement('img');
    del_cond.src = "delete.svg";
    del_cond.classList.add('icon');
    del_cond.classList.add('del_cond');

    cond.appendChild(p1);
    cond.appendChild(vis_col);
    cond.appendChild(cond_col_input);
    cond.appendChild(p2)
    cond.appendChild(cond_rul_input);
    cond.appendChild(del_cond);
    cond_container.appendChild(cond);

    console.log('create new delete condition')

    init_conditions_ui();
});

recolor_condition_btn.addEventListener('click', function (event) {
    cond = document.createElement('div');
    cond.classList.add('condition');

    p1 = document.createElement('p');
    p1.textContent = lang_use[10];
    p1.classList.add('condition_text_recolor')

    vis_col = document.createElement('div');
    vis_col.classList.add('color_visual');

    cond_col_input = document.createElement('input');
    cond_col_input.classList.add('condition_color_input');
    cond_col_input.placeholder = "color";
    cond_col_input.maxLength = '7';
    cond_col_input.setAttribute("type", "text");

    p2 = document.createElement('p');
    p2.textContent = lang_use[11];
    p2.classList.add('condition_text_in_color')

    vis_col2 = document.createElement('div');
    vis_col2.classList.add('color_visual');

    cond_col_input2 = document.createElement('input');
    cond_col_input2.classList.add('condition_color_input');
    cond_col_input2.placeholder = "color";
    cond_col_input2.maxLength = '7';
    cond_col_input2.setAttribute("type", "text");

    p3 = document.createElement('p');
    p3.textContent = lang_use[12];
    p3.classList.add('condition_text_if')

    cond_rul_input = document.createElement('input');
    cond_rul_input.classList.add('rule_condition');
    cond_rul_input.placeholder = "write a condition";
    cond_rul_input.setAttribute("type", "text");

    del_cond = document.createElement('img');
    del_cond.src = "delete.svg";
    del_cond.classList.add('icon');
    del_cond.classList.add('del_cond');

    cond.appendChild(p1);
    cond.appendChild(vis_col);
    cond.appendChild(cond_col_input);
    cond.appendChild(p2);
    cond.appendChild(vis_col2);
    cond.appendChild(cond_col_input2);
    cond.appendChild(p3);
    cond.appendChild(cond_rul_input);
    cond.appendChild(del_cond);
    cond_container.appendChild(cond);

    console.log('create new delete condition');

    init_conditions_ui();
});

add_button[1].onmouseout = function () {
    sel_cond_alive.style.width = '0px';
    sel_cond_alive.style.marginLeft = '0px';
    sel_cond_alive.style.padding = '0px';
    sel_cond_alive.style.visibility = 'hidden';

    sel_cond_kill.style.width = '0px';

    sel_cond_recol.style.width = '0px';
};

fill_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    const colors_inputs = document.querySelectorAll('.sel_color');
    var colors = [];
    for (let i = 0; i < colors_inputs.length; i++) {
        colors.push(colors_inputs[i].value)
    };
    for (let i = 0; i < cells.length; i++) {
        var random_life = Math.floor(Math.random() * 2);
        var random_color = Math.floor(Math.random() * colors_inputs.length);
        if (random_life == 1) {
            cells[i].style.backgroundColor = colors[random_color];
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

add_color_listeners();
init_conditions_ui();