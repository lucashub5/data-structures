import { HashMap } from './hashMap.js';

const hashTable = new HashMap;

for (let i = 0; i < 3000; i++) {
    hashTable.set(`${i}`, `${i}`);
}

console.log(hashTable);
