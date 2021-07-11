class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    };
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    };
    hasNext(node) {
        if (node.next === null) return false;
        return true;
    }
    traverse() {
        if (!this.length) return;
        let current = this.head;
        while(current.next) {
            console.log(current)
            current = current.next;
            return current;
        }
    }
    push(val) {
        let newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.head.next = null;
            this.tail = this.head;
            
        }
        else {
            this.tail.next = newNode
            this.tail = this.tail.next
            
        }
        this.length++;
        return this
    }
    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;
        while(current.next) {
            newTail = current;
            current = current.next
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (!this.length) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }
    shift(){
        if (!this.head) return undefined;
        const current = this.head
        this.head = current.next;
        this.length--;
        if (!this.length) {
            this.tail = null;
        }
        this.length--;
        return current;
    }
    unshift(val){
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode
        }
        this.length++;
        return this;
    }
    get(num) {
        if (num < 0 || num >= this.length) return undefined;
        let current = this.head
        let count = 0;
        while (count < num) {
            current = current.next;
            count++;
        }
        return current;
    }
    set(position, val) {
        if (position < 0 || position >= this.length) return null;
        let foundNode = this.get(position)
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert(position, val) {
        let newNode = new Node(val);
        if (position < 0 || position > this.length) return undefined;
        if (position === this.length) return !!this.push(newNode)
        else if (position === 0) return !!this.unshift(newNode)
        let prev = this.get(position - 1)
        newNode.next = prev.next;
        prev.next = newNode;
        this.length++;
        return true;
    }
    remove(position, val) {
        let newNode = new Node(val);
        if (position < 0 || position > this.length) return undefined;
        if (position === this.length - 1) return !!this.pop(newNode)
        else if (position === 0) return !!this.shift(newNode)
        let prev = this.get(position - 1)
        let removed = prev.next;
        prev.next = removed.next
        this.length--;
        return removed;
    }
    print() {
        let s = [];
        let curr = this.head;
        while (curr.next !== null) {
            s.push(curr.val);
            curr = curr.next;
        }
        s.push(this.tail.val);
        return s.join('');
    }
    reverse() {
        // initialize a temp variable
        let node = this.head;
        // swap the head and the tail
        this.head = this.tail;
        // make the new tail the saved node (this.head)
        this.tail = node;
        // two holders for the prev/next swap
        let next;
        let prev;
        // swap loop
        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        // return the 
        return this;
    }
}

export { Node, LinkedList };