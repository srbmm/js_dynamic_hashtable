class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class DHashtable{
    constructor(classNode = Node){
        this.classNode = classNode
        this.hashSize = 0;
        this.arraySize = 10;
        this.array = new Array(10);
    }
    add(key, ...args) {
        const node = new this.classNode(key, ...args);
        let i = 0;
        let index = this.hashFunc(key, i++);
        while (this.array[index] !== undefined){
            index = this.hashFunc(index, i++);
        }
        this.array[index] = node
        this.hashSize += 1;
        if (this.hashSize === this.arraySize) this.extend();
    }
    hashFunc(key, i = 0){
        let index = (key % this.arraySize) + (i**2)
        while(index >= this.arraySize){
            index -= this.arraySize
        }
        return index
    }
    find(key){
        let i = 0;
        let index = this.hashFunc(key, i++);
        while (this.array[index] !== undefined){
            if (this.array[index].key === key) return this.array[index].value;
            index = this.hashFunc(key, i++);
        }
        return undefined;
    }
    extend(){
        this.arraySize = this.arraySize * 3;
        const newArray = new Array(this.arraySize);
        for (let i = 0; i < this.hashSize; i++){
            const item = this.array[i];
            let j = 0;
            let index = this.hashFunc(item.key, j++);
            while (newArray[index] !== undefined){
                index = this.hashFunc(index, j++);
            }
            newArray[index] = item;

        }
        this.array = newArray
    }
    getHash(){
        return this.array
    }
}