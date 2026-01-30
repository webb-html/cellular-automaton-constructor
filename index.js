class Automaton { // второй основной класс который надо сделать
    constructor(array, born_rule, survive_rule, generations) {
        this.array = array; // основной массив
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                new Cell(i, j, array[i][j], this);
            }
        }
        this.born_rule = born_rule; // здесь правила
        this.survive_rule = survive_rule;
        this.generations = parseInt(generations);
        // список возможных позиций наших соседей от нас
        this.neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    }

    // магический метод который дает возможность обращаться к классу с помощью []
    // т.е. Placeholder[0][0] (в таком случае даем значение из таблицы)
    // Note: This is handled by the Proxy in the constructor

    // позволяет использовать len(Placeholder), тоже возвращаем из массива
    get length() {
        return this.array.length;
    }

    // позволяет писать print(Placeholder) и рисует матрицу
    toString() { // скорее для отладки
        let res = '';
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                if (typeof this.array[i][j] === 'number') {
                    res += this.array[i][j].toString() + ' ';
                } else {
                    res += this.array[i][j].status.toString() + ' ';
                }
            }
            res += '\n';
        }
        return res;
    }

    change(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                new Cell(i, j, array[i][j], this);
            }
        }
    }

    getlist() {
        let list_int = [];
        for (let i = 0; i < this.array.length; i++) {
            list_int.push([]);
            for (let j = 0; j < this.array[i].length; j++) {
                list_int[i].push(this.array[i][j].status);
            }
        }
        return list_int;
    }

    update() {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                this.array[i][j].prepare_update();
            }
        }
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                this.array[i][j].update();
            }
        }
    }
}


class Cell { // собственно клетка
    constructor(i, j, status, automaton) { // инициализация
        this.i = i; // индексы в массиве
        this.j = j;

        this.status = status; // наше состояние
        this.new_status = status; // будущее состояние нужно чтобы смена была одновременно
        this.automaton = automaton; // собственно твой класс к которому мы принадлежим
        if (this.ne(this.automaton.array[this.i][this.j])) { // если там какая-то фигня, то мы меняем её на себя
            this.automaton.array[i][j] = this;
        }
    }

    // чтобы работало != на 42 строчке
    ne(other) {
        if (typeof other === 'number') {
            return true;
        }
        return this.status !== other.status;
    }

    get_neighbours() { // сколько рядом соседей
        let result = 0;
        for (let i = 0; i < 8; i++) {
            let index_1 = this.i + this.automaton.neighbours[i][0]; // индексы соседа
            let index_2 = this.j + this.automaton.neighbours[i][1];
            try {
                if (this.automaton.array[index_1][index_2].status === 1) { // проверяем соседей
                    result += 1;
                }
            } catch (e) { // вылетели за список
                if (this.automaton.length <= index_1) { // соответственно уменьшаем индексы чтобы влезли
                    index_1 = 0;
                }
                if (this.automaton.array[0].length <= index_2) { // сразу не проверяем т.к. 1) чтобы потом лет через 100 сделать
                    index_2 = 0; // возможность выбора зацикливания 2) чуть быстрее
                }
                if (0 > index_1) {
                    index_1 = this.automaton.length - 1;
                }
                if (0 > index_2) {
                    index_2 = this.automaton.array[0].length - 1;
                }
                if (this.automaton.array[index_1][index_2].status === 1) {
                    result += 1;
                }
            }
        }

        return result;
    }

    prepare_update() { // готовимся к изменению, но не изменяем, чтобы другие клетки шли не по измененным данным
        if (this.status === 0) {
            if (this.automaton.born_rule.includes(this.get_neighbours().toString())) { // соответственно новые клетки
                this.new_status = this.status + 1;
            }
        } else if (this.status === 1) { // существующие
            if (!this.automaton.survive_rule.includes(this.get_neighbours().toString())) {
                this.new_status = this.status + 1;
                if (this.new_status === this.automaton.generations) {
                    this.new_status = 0;
                }
            }
        } else { // помирающие
            this.new_status = this.status + 1;
            if (this.new_status == this.automaton.generations) {
                this.new_status = 0;
            }
        }
    }

    update() { // все клетки готовы, обновляем
        this.status = this.new_status;
    }
}

const scale = 2;

if (screen.width / screen.height > 1.5) {
    var h1_display = 'white';
    var st = 45 * scale;
    var cl = 15 * scale;
} else if (screen.width / screen.height <= 1.5 && screen.width / screen.height > 1.334) {
    var h1_display = 'white';
    var st = 40 * scale;
    var cl = 15 * scale;
} else if (screen.width / screen.height <= 1.334 && screen.width / screen.height > 1) {
    var h1_display = 'white';
    var st = 35 * scale;
    var cl = 15 * scale;
} else {
    var h1_display = 'transparent';
    var st = 15 * scale;
    var cl = 15 * scale;
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

const cell_size = body.offsetHeight / (30 * scale);

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
const condition_text = document.querySelectorAll('.condition_text');
const code_header = document.querySelector('.code_header');
const code = document.querySelector('.code');
const rule_condition = document.querySelectorAll('.rule_condition');

const born_cond = document.querySelector('.born');
const survive_cond = document.querySelector('.survive');
const generations_cond = document.querySelector('.generations');

var list = [];
var delay = 0;
var enableTimer = false;
var timer = null;

var born = '3';
var survive = '23';
var generations = '2';

selected_color = 'rgb(200, 210, 220)';
selected_rgb = '200, 210, 220';

var density = parseInt('50') * 0.01;

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

_h1.style.color = h1_display;
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

delay = parseFloat(slider[0].value) * 1000;

born_cond.value = born;
survive_cond.value = survive;
generations_cond.value = generations;

for (let i = 0; i < cl; i++) {
    let tmp = [];
    for (let j = 0; j < st; j++) {
        div = document.createElement("div");
        div.style.height = cell_size + 'px';
        div.style.width = cell_size + 'px';

        div.i = i;
        div.j = j;

        div.classList.add('cell');

        div.addEventListener('click', function (event) {
            if (this.style.backgroundColor == 'rgb(34, 34, 34)' || this.style.backgroundColor == '') {
                this.style.backgroundColor = selected_color;
                list[this.i][this.j] = 1;
                automaton.change(list);
            } else {
                this.style.backgroundColor = '#222222';
                list[this.i][this.j] = 0
                automaton.change(list);
            };
            console.log(automaton.getlist())
        });

        tmp.push(0);
        board.appendChild(div);

    };
    list.push(tmp)
};

var automaton_array = [];
for (let i = 0; i < cl; i++) {
    let tmp = [];
    for (let j = 0; j < st; j++) {
        tmp.push(0)
    }
    automaton_array.push(tmp)
}
var automaton = new Automaton(automaton_array, born, survive, generations)


slider[0].oninput = function () {
    slider_text[0].innerHTML = this.value + lang_use[6];
    delay = parseFloat(this.value) * 1000;
    switch_run_status();
    switch_run_status();
};

slider[1].oninput = function () {
    slider_text[1].innerHTML = this.value + '%';
    density = parseInt(this.value) * 0.01;
};

`window.addEventListener('resize', function () {
    this.location.reload()
});`

change_lang_ru.addEventListener('click', function (event) {

    change_lang_eng.style.color = '#bbbbbb';
    change_lang_ru.style.color = '#ffffff';
    lang_use = lang_ru;
    document.title = lang_use[0];
    _h1_info.textContent = lang_use[0];
    slider_text.textContent = slider.value + lang_use[6];
    del_info.textContent = lang_use[2];
    fill_info.textContent = lang_use[3];
    console.log(run_info.textContent, lang_en[4], run_info.textContent == lang_en[4])
    if (run_info.textContent == lang_en[4]) {
        run_info.textContent = lang_use[4];
    } else {
        run_info.textContent = lang_use[5];
    };
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
    console.log(run_info.textContent, lang_ru[4], run_info.textContent == lang_ru[4])
    if (run_info.textContent == lang_ru[4]) {
        run_info.textContent = lang_use[4];
    } else {
        run_info.textContent = lang_use[5];
    }; code_header.textContent = lang_use[7];
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

born_cond.addEventListener('input', function (event) {
    born = this.value;
    automaton.born_rule = this.value;
});

survive_cond.addEventListener('input', function (event) {
    survive = this.value;
    automaton.survive_rule = this.value;
});

generations_cond.addEventListener('input', function (event) {
    generations = this.value;
    automaton.generations = this.value;
});

fill_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cl; i++) {
        let tmp = []
        for (let j = 0; j < st; j++) {
            var random_life = Math.random();
            if (random_life <= density) {
                cells[i * st + j].style.backgroundColor = 'rgb(200, 210, 220)';
                tmp.push(1);
            } else {
                cells[i * st + j].style.backgroundColor = '#222222';
                tmp.push(0);
            }
        };
        list[i] = tmp;
    };
    automaton.change(list);
    console.log(automaton.getlist());
});

delete_button.addEventListener('click', function (event) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cl; i++) {
        let tmp = []
        for (let j = 0; j < st; j++) {
            cells[i * st + j].style.backgroundColor = '#222222';
            tmp.push(0);
        };
        list[i] = tmp;
    };
    automaton.change(list);
    console.log(automaton.getlist());
});

run_button.addEventListener('click', () => {
    switch_text();
    switch_run_status();
});

function switch_run_status() {
    enableTimer = !enableTimer;

    if (!enableTimer) {
        clearInterval(timer);
        return;
    }

    let i = 0;
    timer = setInterval(() => {
        list = automaton.getlist()
        automaton.update();
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cl; i++) {
            for (let j = 0; j < st; j++) {
                if (list[cells[i * st + j].i][cells[i * st + j].j] == 1) {
                    cells[i * st + j].style.backgroundColor = selected_color;
                } else if (list[cells[i * st + j].i][cells[i * st + j].j] == 0) {
                    cells[i * st + j].style.backgroundColor = 'rgb(34, 34, 34)';
                } else {
                    let num = list[cells[i * st + j].i][cells[i * st + j].j];
                    let alfa = (255 - num * 255 / generations) / 255;
                    if (alfa <= 0) {
                        cells[i * st + j].style.backgroundColor = selected_color;
                    } else {
                        cells[i * st + j].style.backgroundColor = `rgb(${selected_rgb}, ${(255 - num * 255 / generations) / 255})`;
                    }
                };

            };
        };
        console.log(automaton.getlist())
    }, delay);
};

function switch_text() {
    if (run_info.textContent == lang_use[4]) {
        run_info.textContent = lang_use[5];
        run_info.style.color = '#ffd4d4';
    } else {
        run_info.textContent = lang_use[4];
        run_info.style.color = '#d5ffd4';
    };
};

console.log(automaton.getlist())

