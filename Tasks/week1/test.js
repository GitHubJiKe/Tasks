var timer1 = 0;
var timer2 = 0;
var timer3 = 0;
var timer4 = 0;

function quickSort(eles){  
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

for (let i = 0; i <= 1; i++) {
    arr.push(Math.random() * 100);
}
if(quickSort(arr)){
    timer2 = Date.now();
    console.log(quickSort(arr));
}

console.log(sort(arr));

function sort(arr){
    timer3 = Date.now();
    arr.sort((v1,v2)=>{
        return v1-v2;
    });
    timer4 = Date.now();
    return arr;
}

console.log(timer2-timer1)
console.log(timer4-timer3)



