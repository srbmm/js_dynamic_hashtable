class Node{
    constructor(value) {
        this.value = value
        this.next = undefined
        this.before = undefined
    }
}

class LinkedList{
    constructor(nodeClass = Node) {
        this.NodeClass = nodeClass;
        this.first = undefined;
        this.last = undefined;
        this.size = 0;
    }
    add_last(){
        const node = new this.NodeClass(...arguments)
        if (this.first === undefined){
            this.first = node
            this.last = node
        }else {
            this.last.next = node
            node.before = this.last
            this.last = node
        }
        this.size++
    }

    add_first(){
        const node = new this.NodeClass(...arguments)
        if (this.first === undefined){
            this.first = node
            this.last = node
        }else {
            node.next = this.first
            this.first.before = node
            this.first = node
        }
        this.size++
    }

    add(index, ...args){
        if (index === 0){
            this.add_first(...args)
            this.size++
        }else if (index === this.size - 1){
            this.add_last(...args)
            this.size++
        }else if(0 < index < this.size-1){
            const node = new this.NodeClass(...args)
            let counter = 0
            let head = this.first
            while (head !== undefined){
                if (index === counter){
                    node.next = head
                    node.before = head.before
                    head.before.next = node
                    head.before = node
                    break
                }
            counter++
            head = head.next
            }
            this.size++
        }else {
            console.log('Error in add.')
        }
    }

    delete_last(){
        if(this.last !== undefined) {
            this.last = this.last.before
            this.last.next = undefined
            this.size--
            return true
        }else {
            return false
        }
    }

    delete_first(){
        if(this.first !== undefined){
            this.first = this.first.next
            this.first.before = undefined
            this.size--
            return true
        }else {
            return false
        }
    }

    delete(value, type="value"){
        let flag = false
        let head = this.first
        if (this.first[type] === value) this.delete_first()
        else if (this.last[type] === value) this.delete_last()
        else {
            while (head !== undefined) {
                if (head[type] === value) {
                    head.before.next = head.next
                    head.next.before = head.before
                    this.size--
                    flag = true
                    break
                }
                head = head.next
            }
        }
        return flag
    }

    forEach(func){
        let head = this.first;
        while(head !== undefined){
            func(head.value);
            head = head.next;
        }
    }

    show(type){
        if(this.first instanceof Node){
            type = 'value'
        }
        let head = this.first
        while (head !== undefined){
            if (type !== undefined) console.log(head[type])
            else console.log(head)
            head = head.next
        }
    }
}
