
//Hush Table

class hushTable{
    constructor (size=53) {
        this.keyMap = new Array(size);
    }
    _hush (key) {
    let total = 0;
    let random_prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i ++) {
       let char = key[i];
        let chatNum = char.charCodeAt(0) - 96;
        total = (total*random_prime + chatNum) % this.keyMap.length;
    }
    return total;
    }
    set(key, value){
        let hashedKey = this._hush(key);
        if (this.keyMap[hashedKey] === undefined) {
            this.keyMap[hashedKey] = new Array();
        }
        this.keyMap[hashedKey].push(new Array(key,value))
        
    }    
    get(key){
        let hashedKey = this._hush(key);
        let el = this.keyMap[hashedKey];
        if (el) {
             for (let i = 0; i < el.length; i ++) {
            if (el[i][0] === key) return el[i][1];
        }   
        }
         return undefined;
    }  
    getKeys() {
        let keys = [];
        for (let i = 0; i < this.keyMap.length; i ++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j ++) {
                    if(!keys.includes(this.keyMap[i][j[0]]))
                    keys.push(this.keyMap[i][j][0]);
                }
            }    
        }
        return keys;
  
    }
    getValues() {
                let keys = [];
        for (let i = 0; i < this.keyMap.length; i ++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j ++) {
                    if(!keys.includes(this.keyMap[i][j[1]]))
                    keys.push(this.keyMap[i][j][1]);
                }
            }    
        }
        return keys;
    }
}
let listHush = new hushTable();

//Graphs

class Graph{
    constructor(){
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(v1,v2){
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
    removeEdge(v1,v2) {
        let indexV2 = this.adjacencyList[v1].indexOf(v2);
        let indexV1 = this.adjacencyList[v2].indexOf(v1);
        this.adjacencyList[v1].splice(indexV2,1);
        this.adjacencyList[v2].splice(indexV1,1);
    }
    removeVertex(vertex) {
        if(this.adjacencyList[vertex]){
            for (let i = 0; i < this.adjacencyList[vertex].length; i ++) {
                let vertice = this.adjacencyList[vertex][i];
                this.removeEdge(vertex, vertice);
            }
        }
        delete this.adjacencyList[vertex];
    }
    depthFirstRecursive (startVertex){
        // create list result;
            let results = [];
        // list - visited vertices;
            let visited = {};
            let adjacencyList = this.adjacencyList;
        // helper function (vertex)
            function helper (vertex) {
            // empty vertex
                if (!vertex) return null;
        // vertex places into visited 
                visited[vertex] = true;
        // push to result array
                results.push(vertex);
        // loop over values in adjacencyLust
                  adjacencyList[vertex].forEach( neighbour => {
                      if (!visited[neighbour]) {
                          return helper(neighbour)
                      }
                  })
        // if any vertexes not visited - invoke helper 
            }
            helper(startVertex);
            return results;
        }
    
        depthFirstIterative(start){
            let visited = {};
            let results = [];
            let stack = [];
            let returnedVertex;
            
            visited[start] = true;
            stack.push(start);
            
            while (stack.length) {
                returnedVertex = stack.pop();
                results.push(returnedVertex);
    
                this.adjacencyList[returnedVertex].forEach( neighbour => {
                       if (!visited[neighbour]) {
                        visited[neighbour] = true;
                        stack.push (neighbour)
                }
                })
             
            }
            return results;
        }
        breadthFirst(start) {
            let queue = [];
            let visited = [];
            let results =[];
            let returnedVertex;
            queue.push(start);
            visited[start] = true;
            
             while (queue.length) {
               returnedVertex  = queue.shift();
                results.push(returnedVertex);
                 this.adjacencyList[returnedVertex].forEach( neighbour => {
                     if (!visited[neighbour]) {
                         visited[neighbour]= true;
                         queue.push(neighbour)
                     }
                 })
                 
             }
            return results;  
    }    
}
let listGraph = new Graph();

//Priority Queue

class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if(element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                   swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}
class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}
//Radix Sort

function numberAtInd (num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10,i)) % 10;
}
function digitCount (num) {

    if (num === 0) return 1;

   return Math.floor(Math.log10(Math.abs(num)))+1
}
function mostDigits (arr) {
    let mostD = 0;
    for (let i = 0; i <arr.length; i ++) {
        mostD = Math.max(mostD, digitCount(arr[i]));
    }
    return mostD;  
}

function radixMain (list) {
   let mostDigitsNUm = mostDigits(list);

   for (let k = 0; k <mostDigitsNUm; k ++) {
      let dBuckets = Array.from ({length:10}, () => []);

      for (let i = 0; i < list.length; i ++) {
        let digit = numberAtInd(list[i], k);
         dBuckets[digit].push(list[i]);
      }
      list = [].concat(...dBuckets);
      
   } 
    return list;
}
radixMain([2,3,0,24,67,1,333])

//Quick Sort

function quickSort (arr, startInd, endInd  ) {
    let pivotInd = arr[startInd];
   let swapInd = startInd;
    for ( let i = startInd+1; i <= endInd; i ++ ) {
        if (arr[i] < pivotInd) {
             swapInd ++;
            [arr[swapInd], arr[i]] = [arr[i], arr[swapInd]]; 
        }
    }
       [arr[swapInd], arr[startInd]] = [arr[startInd], arr[swapInd]];
   return swapInd;
}
// 3 inputs
function quickMain (arr, left = 0, right = arr.length -1) { 
     if (left < right) {
        let pivotInd = quickSort (arr, left, right);
        //left
        quickMain(arr, left, pivotInd-1);
        //right
        quickMain (arr, pivotInd+1, right)
     }
    return arr;
}
quickMain([2,3,5,1,-1,6,10])

