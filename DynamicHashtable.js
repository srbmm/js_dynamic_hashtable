import LinkList from "./LinkedList.js";

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class DHashtable{
    
    constructor(){
        this.keys = new LinkList();
        this.hashSize = 0;
        this.arraySize = 10;
        this.array = new Array(10);
    }

    add(key, value) {
        let i = 0;
        let index = this.hashFunc(key, i++);
        while (this.array[index] !== undefined && this.array[index] !== null) {index = this.hashFunc(key, i++);
        }
        this.array[index] = new Node(key, value);
        this.keys.add_last(key);
        this.hashSize += 1;
        if (this.hashSize === this.arraySize) this.extend();
    }

    delete(key) {
        let i = 0;
        let index = this.hashFunc(key, i++);
        while (this.array[index] !== undefined) {
            if (this.array[index] !== null) {
                break;
            }
            index = this.hashFunc(key, i++);
        }
        if (this.array[index] !== undefined) {
            const temp = this.array[index];
            this.array[index] = null;
            this.hashSize -= 1;
            if ((this.arraySize / 3) - 1 === this.hashSize) this.shrink();
            return temp;
        }
        return undefined;
    }

    hashFunc(key, i = 0){
        
        if (typeof num === "number"){
            let index = (key % this.arraySize) + (i)
        while(index >= this.arraySize){
            index -= this.arraySize
        }
        return index
        } else if (typeof str === "string"){
            let index = 0;
            for(let j = 0; j < key.length; j++){
                 index = key[i].charCodeAt(0) * j
            }
            index = index + (i**2)
        while(index >= this.arraySize){
            index -= this.arraySize
        }
        return index
        }
        
    }

    find(key){
        let i = 0;
        let index = this.hashFunc(key, i++);
        while (this.array[index] !== undefined){
            if(this.array[index] !== null) {
                if (this.array[index].key === key) return this.array[index].value;
            }
            index = this.hashFunc(key, i++);
        }
        return undefined;
    }

    extend(){
        this.arraySize = this.arraySize * 3;
        const newArray = new Array(this.arraySize);
        for (let i = 0; i < this.hashSize; i++){
            const item = this.array[i];
                if(item){
                let j = 0;
                let index = this.hashFunc(item.key, j++);
                while (newArray[index] !== undefined){
                    index = this.hashFunc(index, j++);
                }
                newArray[index] = item;
            }
        }
        this.array = newArray;
    }

    forEach(func){
        this.keys.forEach(key => func(key, this.find(key)));
    }

    shrink(){
        this.arraySize /= 3;
        const newArray = new Array(this.arraySize);
        for(let i = 0; i < this.arraySize * 3; i++){
            const item = this.array[i];
            if(item) {
                let j = 0;
                let index = this.hashFunc(item.key, j++);
                while (newArray[index] !== undefined) {
                    index = this.hashFunc(index, j++);
                }
            newArray[index] = item;
            }
        }
        this.array = newArray;
    }

    get getHash(){
        return this.array
    }


}
