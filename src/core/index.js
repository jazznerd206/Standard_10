import { proximityMap } from '../../utils/proximityMap.js';
import { LinkedList } from '../../utils/linkedList.js';

class Standard_10 {

    state = {
        strings: [],
        tempo: [],
        queue: [],
        domNodes: [],
        map: null,
        chars: null,
        active: false,
        paused: false,
        cursorBlink: true,
        cursorState: 0,
        events: null,
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
        textArea.innerHTML = '';
        cursor.innerHTML = this.options.cursorChar;
        domField.append(textArea);
        domField.append(cursor);
    }
    startAnimation() {
        this.state.queue = this.getPrintTempo();
        this.state.active = true;
        this.run();
        return this;
    }
    run() {
        if (!this.state.lastFrame) this.state.lastFrame = Date.now();
        let thisFrame = Date.now();
        let _DIFF = thisFrame - this.state.lastFrame;
        this.state.events = window.requestAnimationFrame(this.run.bind(this));
        const eClone = [...this.state.queue]
        if (eClone.length === 0) {
            this.kill();
            return;
        }
        let c = eClone.shift();
        console.log('chars: ' + JSON.stringify(c));
        console.log(this.state.domNodes)
        let type = c[2];
        let delay = c[1] === true ? 50 : 100;
        if (_DIFF <= delay) return;
        switch(type) {
            case 'ADD_AT_TAIL':
                let char = c[0];
                let speed = c[1];
                const newNode = document.createElement('span');
                newNode.textContent = char;
                newNode.classList.add('dyn-node');
                newNode.setAttribute('id', `dyn-${this.state.events}`);
                this.state.element.node.append(newNode);
                this.state.domNodes.push(newNode);
                break;
            case 'REMOVE_LAST':
                const _D = this.state.domNodes;
                // const _PREV = document.getElementById(`${_D[_D.length - 2].id}`);
                // console.log(`_PREV`, _PREV);
                const _E = document.getElementById(`${_D[_D.length - 1].id}`);
                // console.log(`_E.value`, _E.innerHTML);
                this.state.element.node.removeChild(_E);
                console.log('curr: ' + `${JSON.stringify(_D[_D.length - 1])}`)
                eClone.unshift(`${_D[_D.length - 1]}`)
                this.state.domNodes.unshift(`${_D[_D.length - 1]}`)
                // _D.splice(-1,1);
                let temp = this.state.domNodes.pop()
                temp = null;
                break;
            default:
                console.log('t: ' + this.state.strings);
                // console.log(`this.state.domNodes`, this.state.domNodes)
                console.log('default hit. switch kill.')
                break;
        }
        this.state.queue = eClone;
        this.state.lastFrame = thisFrame;
    }
    /**
     * end event loop
     * @returns this
     */
    kill() {
        if(this.state.events) {
            window.cancelAnimationFrame.bind(this);
            this.state.events = null;
        }
        return this;
    }
    /**
     * takes content from state.strings
     * requires funcs s10.add AND s10.addBackspace to be in state
     */
    parseText() {
        if (this.state.strings.length === 0) {
            this.showError('Content property is empty')
        }
        this.state.strings.forEach(string => {
            if (string === 'backspace') this.chars.push('_D');
            else {
                for (let char of string) {
                    this.chars.push(char);
                }
            }
        })
    }
    /**
     * add full string to state.strings
     * @param {single string to add} string 
     */
    add(string) {
        this.state.strings.push(string);
        return this;
    }
    /**
     * add 'backspace' to state.strings
     * @param {num of chars to delete} num 
     */
    addBackspace(num) {
        for (let i = 0; i < num; i++) {
            this.state.strings.push('backspace');
        }
        return this;
    }
    queryMap(character, next) {
        let neighbors = this.map[character];
        if (character === '_D') {
            let speedQuery = [null, true, 'REMOVE_LAST'];
            return speedQuery;
        }
        if (neighbors.includes(next)) {
            let speedQuery = [character, true, 'ADD_AT_TAIL'];
            return speedQuery;
        } else {
            let speedQuery = [character, false, 'ADD_AT_TAIL'];
            return speedQuery;
        }
    }
    getPrintTempo() {
        let node = this.chars.head;
        while (node.next !== null) {
            const value = node.val;
            this.state.tempo.push(this.queryMap(node.val, node.next.val));
            node = node.next;
        }
        let last = [ this.chars.tail.val, false , "ADD_AT_TAIL" ];
        this.state.tempo.push(last);
        return this.state.tempo;
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
        throw new Error(this.state.error);
    }
}

const _default = Standard_10;
export { _default as default };