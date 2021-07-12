import { proximityMap } from '../utils/proximityMap.js';
import { LinkedList } from '../utils/linkedList.js';

class Standard_10 {

    /** INITIAL STATE
     */
    state = {
        strings: [],
        tempo: [],
        queue: [],
        domNodes: [],
        map: null,
        chars: null,
        active: false,
        paused: false,
        cursorState: 0,
        events: null,
        element: {
            fragment: null,
            node: document.createElement('span'),
            cursor: document.createElement('span'),
            error: document.createElement('p')
        },
        error: null
    }

    /** INITIAL OPTIONS
     */
    options = {
        content: null,
        cursorChar: '|',
        cursorBlink: 500,
        typeSpeed: 'standard',
        deleteSpeed: 'standard',
        cursorPause: 'standard',
        styles: {}
    }

    /** CONSTRUCTOR
     * @param {dom node (html element)} target 
     * @param {user options (object)} options 
     */
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
            this.options = { ...this.options, ...options };
        }
        this.createField();
        this.applyStyles()
    }
    /** INIT FUNCTION
     * find and initialize the dom field
     */
    createField() {
        if (!this.state.element.fragment) {
            this.showError('Lost the DOM element.');
            return;
        }
        let domField = this.state.element.fragment;
        let textArea = this.state.element.node;
        let cursor = this.state.element.cursor;
        textArea.innerHTML = '';
        domField.setAttribute('id', 'domField');
        textArea.setAttribute('id', 'node');
        cursor.setAttribute('id', 'cursor');
        cursor.innerHTML = this.options.cursorChar;
        domField.append(textArea);
        domField.append(cursor);
    }
    /** INIT FUNCTION
     * find and apply styles to dom fields
     */
    applyStyles() {
        console.log(`this.options.styles`, this.options.styles);
        if (this.options.styles === {}) return;
        if (this.options.styles.domField) {
            let s = '';
            let styles = this.options.styles.domField;
            let element = document.getElementById('domField');
            for (let prop in styles) {
                let key = prop.replace("_", "-");
                s = s + `${key}: ${styles[prop]}; `;
            }
            console.log(`s`, s)
            element.style = s;
        }
        if (this.options.styles.node) {
            let s = '';
            let styles = this.options.styles.node;
            let element = document.getElementById('node');
            for (let prop in styles) {
                let key = prop.replace("_", "-");
                s = s + `${key}: ${styles[prop]}; `;
            }
            console.log(`s`, s)
            element.style = s;
        }
        if (this.options.styles.cursor) {
            let s = '';
            let styles = this.options.styles.cursor;
            let element = document.getElementById('cursor');
            for (let prop in styles) {
                let key = prop.replace("_", "-");
                s = s + `${key}: ${styles[prop]}; `;
            }
            console.log(`s`, s)
            element.style = s;
        }
        return this;
    }
    /** INIT FUNCTION
     * animation trigger
     */
    startAnimation() {
        this.state.queue = this.getPrintTempo();
        this.state.active = true;
        this.run();
        this.blink();
    }
    /** ANIMATION FUNCTION
     * set interval for blinking of cursor
     * @returns a blinking cursor for all of eternity
     */
    blink(bool) {
        let cursor = true;
        let speed = this.options.cursorBlink;
        let c = document.getElementById('cursor');
        let blinker = () => {
            if (cursor) {
                c.style.opacity = 0;
                cursor = false;
            } else {
                c.style.opacity = 1;
                cursor = true;
            }
        }
        if (this.state.active === true) {
            const _TIMER_ = setInterval(blinker, speed);
            if (this.state.cursorState === 0) this.state.cursorState = _TIMER_
        } else {
            clearInterval(this.state.cursorState);
        }
        if (this.state.active === false) clearInterval(this.state.cursorState);
    }
    /** ANIMATION FUNCTION
     * main runner
     * @returns i dont even really know yet
     */
    run() {
        if (!this.state.lastFrame) this.state.lastFrame = Date.now();
        let thisFrame = Date.now();
        let _DIFF = thisFrame - this.state.lastFrame;
        if (this.state.queue.length === 0) {
            this.state.active = false;
            this.blink();
            return;
        }
        this.state.events = window.requestAnimationFrame(this.run.bind(this));
        const eClone = [...this.state.queue];
        let c = eClone.shift();
        let command = c.command;
        let speed = c.speed;
        if (_DIFF <= speed) return;
        switch(command) {
            case 'ADD_AT_TAIL':
                let char = c.character;
                const newNode = document.createElement('span');
                newNode.textContent = char;
                newNode.classList.add('dyn-node');
                newNode.setAttribute('id', `dyn-${this.state.events}`);
                this.state.element.node.append(newNode);
                this.state.domNodes.push({node: newNode, id: this.state.events});
                break;
            case 'DELETE_LAST':
                const _D = this.state.domNodes;
                const _E = document.getElementById(`dyn-${_D[_D.length - 1].id}`);
                const _NODE = this.state.element.node.removeChild(_E);
                if (!_NODE) {
                    this.showError('node does not exist on page');
                    return;
                }
                let temp = this.state.domNodes.pop();
                break;
            case 'KILL':
                this.state.active = false;
                this.kill();
                break;
            default:
                this.state.active = false;
                this.kill();
                break;
        }
        this.state.queue = eClone;
        this.state.lastFrame = thisFrame;
    }
    /** ANIMATIION HELPER
     * end event loop
     * @returns this
     */
    kill() {
        if (this.state.events !== null) {
            window.cancelAnimationFrame.bind(this);
            this.state.events = null;
        }
        this.state.active = false;
        this.blink();
        return this;
    }
    /** ANIMATION HELPER
     * used only in toString() method for now
     * @param {integer} ms 
     * @returns wait before animation frame execution
     */
    wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)}
        );
    }
    /** DATA FUNCTION
     * takes content from state.strings
     * requires funcs s10.add to be in state
     * returns linkedlist to this.chars for dom insertion command evaluation
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
    /** DATA FUNCTION
     * REQUIRES PROXMAP AND COMMANDS
     * queries proximity map for closeness of keys
     * return 3 member array:
     * [0]: value to append to dom
     * [1]: boolean representing proximity map value
     * [2]: entry command
     * @param {character} character 
     * @param {character} next 
     * @returns 
     */
    queryMap(character, next, last) {
        let neighbors = character === '_D' ? [] : this.map[character];
        let newObj = {};
        newObj.character = character === '_D' ? null : character;
        newObj.speed = 0;
        if (neighbors.includes(next)) {
            newObj.speed = Math.floor(25 + (Math.random() * 50));
        } else if (character === next) {
            newObj.speed = last / 2;
        } else {
            newObj.speed = Math.floor(75 + (Math.random() * 50));
        }
        last = newObj.speed;
        newObj.command = character === '_D' ? 'DELETE_LAST' : 'ADD_AT_TAIL';
        return newObj
    }
    /** DATA FUNCTION
     * REQURIES THIS.CHARS AND QUERYMAP()
     * @returns array of dom insertion instruction
     */
    getPrintTempo() {
        let lastSpeed = null;
        let node = this.chars.head;
        while (node.next !== null) {
            const value = node.val;
            this.state.tempo.push(this.queryMap(node.val, node.next.val, lastSpeed));
            node = node.next;
        }
        let last = {
            character: this.chars.tail.val,
            speed: Math.floor(25 + (Math.random() * 50)),
            command: "ADD_AT_TAIL"
    
        };
        this.state.tempo.push(last);
        let END = {
            character: null,
            speed: null,
            command: 'KILL'
        }
        this.state.tempo.push(END);
        return this.state.tempo;
    }
    /** STRING INSERTION
     * add full string to state.strings
     * @param {single string to add} string 
     */
     add(string) {
        this.state.strings.push(string);
        return this;
    }
    /** STRING INSERTION
     * add 'backspace' to state.strings
     * @param {num of chars to delete} num 
     */
    addBackspace(num) {
        for (let i = 0; i < num; i++) {
            this.state.strings.push('backspace');
        }
        return this;
    }
    /**
    * STRING INSERTION
    * func await inserts a pause into the event queue
    */
    addPause(ms) {
        console.log('add pause here');
    }
    /** HELPER FUNCTION
     * pretty self explanatory, if it works
     */
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
    /** HELPER FUNCTION
     * throws a new Error object
     * @param {string} string // error message to pass to constructor
     */
    showError(string) {
        this.state.error = string;
        throw new Error(this.state.error);
    }
}

const _default = Standard_10;
export { _default as default };