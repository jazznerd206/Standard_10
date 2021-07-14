import Standard_10 from '../src/index.js';

const element = document.getElementById('standard_10');

const options = {
    options: 'options',
    cursorChar: '|',
    cursorBlink: 500,
    cursorTimeout: 15000,
    styles: {
        domField: {
            width: '75vw',
            margin: '0 auto',
            position: 'relative',
            padding: '.5em .5em',
            font_variant: 'small-caps',
        },
        node: {
            color: Math.random() > .5 ? 'chartreuse' : 'goldenrod',
            transition: 'all 1s',
        },
        cursor: {
            padding: '10px 5px 0 5px',
            margin: 0,
            position: 'fixed',
            display: 'inline-block',
            overflow: 'hidden',
            transition: 'all .25s'
        }
    }
}

const s10 = new Standard_10(element, options);
s10.add('this is a string');
s10.addPause(500);
s10.addBackspace(8);
s10.add('more text...');
s10.addPause(500);
s10.addBackspace(3);
s10.add('...');
s10.addPause(500);
s10.addBackspace(3);
s10.addPause(500);
s10.add('...');
s10.parseText();
s10.startAnimation();