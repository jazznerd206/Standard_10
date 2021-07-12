import Standard_10 from '../src/core/index.js';

const element = document.getElementById('standard_10');

const options = {
    options: 'options',
    cursorBlink: 250
}

const s10 = new Standard_10(element, options);
s10.add('this is a string');
s10.addBackspace(8);
s10.add('more text.');
s10.parseText();
s10.startAnimation();