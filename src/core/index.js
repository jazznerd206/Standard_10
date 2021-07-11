import { proximityMap } from '../../utils/proximityMap.js';
import { LinkedList } from '../../utils/linkedList.js';

class Standard_10 {

    state = {
        strings: [],
        map: null,
        chars: null,
        active: false,
        paused: false,
        stopped: true,
        cursorBlink: true,
        cursorState: 0,
        queue: null,
        initialState: null,
        initialOptions: null,
        element: {
            fragment: null,
            node: document.createElement('span'),
            cursor: document.createElement('span'),
            error: document.createElement('p')
        },
        error: null
    }

    options = {
        content: null,
        cursorChar: '_',
        cursorBlink: 'standard',
        typeSpeed: 'standard',
        deleteSpeed: 'standard',
        reType: false,
        classList: []
    }

    constructor(target, options) {
        this.map = proximityMap;
        this.chars = new LinkedList();
        if (target == null) {
            this.showError('Must supply a target node');
            return;
        }
        const lookieLoo = document.querySelector(`#${target.id}`);
        if (!lookieLoo) {
            this.showError('Target element not found on page.')
            return;
        } else {
            this.state.element.fragment = lookieLoo;
        }
        if (options) {
            this.options = {
                ...this.options,
                ...options
            }
            this.state.initialOptions = { ...options };
        }
        this.createField();
    }
    createField() {
        if (!this.state.element.fragment) {
            this.showError('Lost the DOM element.');
            return;
        }
        let domField = this.state.element.fragment;
        let textArea = this.state.element.node;
        let cursor = this.state.element.cursor;
        textArea.innerHTML = this.state.strings[0] || '';
        cursor.innerHTML = this.options.cursorChar;
        textArea.append(cursor);
        domField.append(textArea);
    }
    parseText(input) {
        if (typeof input !== 'string') {
            this.showError('This function only accepts strings.');
            return;
        }
        for (let char of input) {
            this.chars.push(char);
        }
    }
    queryMap(character, next) {
        let neighbors = this.map[character];
        if (neighbors.includes(next)) {
            let speedQuery = [character, true];
            return speedQuery;
        } else {
            let speedQuery = [character, false];
            return speedQuery;
        }
    }
    getPrintTempo() {
        let node = this.chars.head;
        let tempo = [];
        while (node.next !== null) {
            tempo.push(this.queryMap(node.val, node.next.val));
            node = node.next;
        }
        let last = [ this.chars.tail.val, false ];
        tempo.push(last);
        return tempo;
    }
    toString() {
        let tempo = this.getPrintTempo();
        let short = 50;
        let i = 0;
        let time = 0;
        while (i < tempo.length) {
            const holder = tempo[i][0];
            let length = tempo[i][1] === true ? short : Math.floor(100 + (Math.random() * 200));
            time += length;
            this.wait(time)
                .then(() => console.log(holder))
                .catch(err => console.log(err));
            i++;
        }
    }
    wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)}
        );
    }
    printChar(index) {
        return this.chars.get(index);
    }
    deleteChar() {
        return this.chars.pop();
    }
    deleteCharAt(index) {
        return this.chars.remove(index);
    }
    showError(string) {
        this.state.error = string;
        console.log(this.state.error);
        return;
    }
}

const _default = Standard_10;
export { _default as default };