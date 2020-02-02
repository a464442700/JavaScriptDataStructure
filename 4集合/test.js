import {Set} from "./Set.js";
let oneSet=new Set();
oneSet.add(1);
oneSet.add(2);
oneSet.add(3);
console.log(oneSet.values());
console.log(oneSet.size());
console.log(oneSet.has(3));
oneSet.remove(3);
console.log(oneSet.has(3));
oneSet.clear();
console.log(oneSet.size());
//************************//
let Set1=new Set();
let Set2=new Set();
Set1.add(1);
Set1.add(2);
Set1.add(3);

Set2.add(3);
Set2.add(4);

let Set3=Set1.union(Set2);
console.log("并集");
console.log(Set3.values());

let Set4=Set1.intersection(Set2);
console.log("交集");
console.log(Set4.values());

let Set5=Set1.difference(Set2);
console.log("差集");
console.log(Set5.values());

console.log("子集");
console.log(Set1.subset(Set4));
console.log(Set1.subset(Set2));