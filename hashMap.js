import { LinkedList } from './linkedList.js';

export class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

export class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0;
        this.bucketsCount = 0;
        this.buckets = new Array(this.capacity).fill(null);
    }

    #hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.buckets.length;
    }

    #resizeHashMap() {
        this.capacity = this.bucketsCount * 2;
        this.bucketsCount = 0;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity).fill(null);

        oldBuckets.forEach((index) => {
            if (index != null) {
                let count = 0;
                while (index.at(count)) {
                    this.set(index.at(count).value.key, index.at(count).value.value);
                    count++;
                }
            }
        });
    }

    set(key, value) {
        const index = this.#hash(key);
        const newKeyValue = new KeyValuePair(key, value);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (this.buckets[index] === null) {
            this.buckets[index] = new LinkedList();
        }
        else {
            const existingList = this.buckets[index].find((index) => index.key === key)
            if (existingList != null) {
                this.buckets[index].at(existingList).value.value = value;
                return;
            }
        }

        this.buckets[index].append(newKeyValue);
        this.bucketsCount ++;
        this.loadFactor = this.bucketsCount / this.capacity;

        if(this.loadFactor > 0.75) {
            this.#resizeHashMap();
        }
    }

    get(key) {   
        const index = this.#hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            return null;
        }

        const existingList = this.buckets[index].find((index) => index.key === key)
        if (existingList != null) {
            return this.buckets[index].at(existingList).value.value;
        }

        return null;

    }

    has(key) {
        const index = this.#hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            return false;
        }

        const existingList = this.buckets[index].find((index) => index.key === key)
        if (existingList != null) {
            return true;
        }

        return false;
    }

    remove(key) {
        const index = this.#hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        
        if (!this.buckets[index]) {
            return false;
        }

        const existingList = this.buckets[index].find((index) => index.key === key)
        if (existingList != null) {
            this.buckets[index].removeAt(existingList);
            if(this.buckets[index].head === null) {
                this.buckets[index] = null;
            }
            this.bucketsCount --;
            if(this.loadFactor < 0.5 && this.capacity > 16) {
                this.#resizeHashMap();
            }
            return true;
        }

        return false;
    }

    length() {
        let totalSize = 0;

        this.buckets.forEach((index) => {
            if (index != null) {
                totalSize += index.size();
            }
        });
    
        return totalSize;
    }

    clear() {
        this.capacity = 16;
        this.bucketsCount = 0;
        this.buckets = new Array(this.capacity).fill(null);

    }

    keys() {
        let arr = [];

        this.buckets.forEach((index) => {
            if (index != null) {
                let count = 0;
                while(index.at(count)) {
                    arr.push(index.at(count).value.key);
                    count ++;
                }
            }
        });

        return arr;
    }

    values() {
        let arr = [];

        this.buckets.forEach((index) => {
            if (index != null) {
                let count = 0;
                while(index.at(count)) {
                    arr.push(index.at(count).value.value);
                    count ++;
                }
            }
        });

        return arr;
    }

    entries() {
        let arr = [];

        this.buckets.forEach((index) => {
            if (index != null) {
                let count = 0;
                while(index.at(count)) {
                    arr.push([index.at(count).value.key, index.at(count).value.value]);
                    count ++;
                }
            }
        });

        return arr;
    }
}