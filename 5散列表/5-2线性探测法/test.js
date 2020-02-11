import {HashTable} from "./HashTable.js";
var oneHash = new HashTable(3);
console.log(oneHash.put(1, 'a'));
console.log(oneHash.put(4, 'b'));
console.log(oneHash.put(7, 'c'));
console.log(oneHash.remove(7));
console.log(oneHash.remove(3));
console.log(oneHash.get(7));
console.log(oneHash.get(4));
console.log(oneHash.get(1));
console.log(oneHash.put(7, 'cd'));
console.log(oneHash.get(7));
console.log(oneHash.put(8, 'd')); //表满
console.log(oneHash.get(8));
console.log(oneHash.table);