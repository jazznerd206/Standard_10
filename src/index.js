import { proximityMap } from '../utils/proximityMap.js';
import { LinkedList } from '../utils/linkedList.js';

class Standard_10 {
    constructor() {
        this.map = proximityMap;
        this.chars = new LinkedList();
    }
    parseText(input) {
        if (typeof input !== 'string') {
            const message = 'This function only accepts alpha strings.';
            console.error(message, input);
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
}

const _default = Standard_10;
export { _default as default };