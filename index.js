const st = 45;
const cl = 15;
const body = document.body
const board = document.querySelector('.cell_container');
const table = document.querySelector('.table')
const table_head = document.querySelector('.table_head')
const slider = document.querySelector('.slider')
const slider_text = document.querySelector('.slider_text')
const sel_lang = document.querySelector('.select_language')
const _h1 = document.querySelector('._h1')
slider.value = 0.5
slider_text.innerHTML = slider.value + 's'; 

const cell_size = body.offsetHeight / 30
sel_lang.style.fontSize = sel_lang.offsetHeight * 0.33 + 'px'
_h1.style.height = body.offsetHeight * 0.1 + 'px'
_h1.style.fontSize = _h1.offsetHeight * 0.33 + 'px'
board.style.width = cell_size * st + 'px';
board.style.height = cell_size * cl + 'px';
table.style.width = cell_size * st + 20 + 'px'
table.style.height = (cell_size * cl) * 1.1 + 'px' 
table_head.style.width = cell_size * st + 'px'

console.log('[' + Date().toLocaleString() + ']')
console.log('window: (' + window.screen.width + ', ' + window.screen.height + ')')
console.log('skreen: (' + screen.width + ', ' + screen.height + ')')
console.log('body: (' + body.offsetWidth + ', ' + body.offsetHeight + ')')
console.log('board     <= .cell_container')
console.log('table     <= .table')
console.log('table_head<= .table_head')
console.log('sel_lang  <= .select_language')
console.log('_h1       <= ._h1')
console.log('cell_size <= ' + body.offsetHeight / 40)
console.log(' ')
console.log('[' + Date().toLocaleString() + ']')
console.log('Apply sel_lang.style.fontSize = ' + sel_lang.offsetHeight * 0.33 + 'px')
console.log('Apply _h1.style.height = ' + body.offsetHeight * 0.1 + 'px')
console.log('Apply _h1.style.fontSize = ' + _h1.offsetHeight * 0.33 + 'px')
console.log('Apply board.style.width = ' + cell_size * st + 'px')
console.log('Apply board.style.height = ' + cell_size * cl + 'px')
console.log('Apply table.style.width = ' + cell_size * st + 20 + 'px')
console.log(' ')
console.log('[' + Date().toLocaleString() + ']')

for (let i = 0; i < cl; i++) {
    for (let j = 0; j < st; j++) {
        div = document.createElement("div");
        div.style.height = cell_size + 'px';
        div.style.width = cell_size + 'px';
        div.classList.add('cell');

        board.appendChild(div);
    }
}

slider.oninput = function() {
    slider_text.innerHTML = this.value + 's';
}
