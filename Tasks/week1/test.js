var timer1 = null;
var timer2 = 0;
var timer3 = 0;
var timer4 = 0;

function quickSort(eles){
    if(!timer1) timer1 = Date.now();
    if(eles.length <=1 ){  
        return eles;  
    }  
    var pivotIndex = Math.floor(eles.length/2);  
    var pivot = eles.splice(pivotIndex, 1)[0];  
      
    var left = [];  
    var right = [];  
      
    for(var i = 0; i < eles.length; i++){  
        if(eles[i] < pivot){  
            left.push(eles[i]);  
        }else{  
            right.push(eles[i])  
        }  
    }  
    return quickSort(left).concat([pivot], quickSort(right));  
} 

var arr = [];

for (let i = 0; i <= 10000000; i++) {
    arr.push(Math.random() * 100);
}
if(quickSort(arr)){
    timer2 = Date.now();
}

if(sort(arr)){
    timer4 = Date.now();
}


function sort(arr){
    timer3 = Date.now();
    arr.sort((v1,v2)=>{
        return v1-v2;
    });
    return arr;
}

console.log("quick",timer2-timer1)
console.log("normal:",timer4-timer3)

//test结果：数量级进行到亿级别的时候，普通的排序还是快过快速排序的，可能是递归未优化的原因，还有就是当亿级别的循环造数组的时候，内存会爆掉



