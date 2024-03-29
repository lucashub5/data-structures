export class Node {
    constructor(value = null) {
        this.value = value;
        this.nextNode = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    prepend(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
    }

    size() {
        let count = 0;
        let current = this.head;

        while (current) {
            count++;
            current = current.nextNode;
        }

        return count;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    at(index) {
        let count = 0;
        let current = this.head;

        while (count < index && current) {
            count++;
            current = current.nextNode;
        }

        return current;
    }

    pop() {
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            let current = this.head;
            while (current.nextNode !== this.tail) {
                current = current.nextNode;
            }
            current.nextNode = null;
            this.tail = current;
        }
    }

    contains(value) {
        let current = this.head;

        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }
    
        return false;
    }

    find(compareFunction) {
        let count = 0;
        let current = this.head;

        while (current !== null) {
            if(compareFunction(current.value)) {
                return count;
            }
            count++;
            current = current.nextNode;
        }

        return null;
    }

    insertAt(value, index) {
        if (index < 0) {
            return;
        }

        const newNode = new Node(value);

        if (!this.head || index === 0) {
            newNode.nextNode = this.head;
            this.head = newNode;
    
            if (!this.head.nextNode) {
                this.tail = this.head;
            }
            return;
        }

        let count = 0;
        let current = this.head;
        let previousCurrent = null;

        while (count < index) {
            if (current === null) {
                return;
            }
            count++;
            previousCurrent = current;
            current = current.nextNode;
        }
        previousCurrent.nextNode = newNode;
        newNode.nextNode = current;
    }

    removeAt(index) {
        if (index < 0 || !this.head) {
            return;
        }

        let count = 0;
        let current = this.head;
        let previousCurrent = null;

        while (count < index && current) {
            if (current === this.tail) {
                return;
            }
            count++;
            previousCurrent = current;
            current = current.nextNode;
        }

        if (current === this.head && current === this.tail) {
            this.head = null;
            this.tail = null;
        } else if (!previousCurrent) {
            this.head = current.nextNode;
        } else if (current === this.tail) {
            this.tail = previousCurrent;
            previousCurrent.nextNode = null;
        } else {
            previousCurrent.nextNode = current.nextNode;
        }
    }

    toString() {
        let current = this.head;
        let printLinkedList = '';

        while (current) {
            printLinkedList += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
    
        return printLinkedList + 'null';
    }
}






