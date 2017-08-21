var arr = [12, 43, 546, 6, 7676, 8, 0, 45, 34, 5465, 6557567, 878, 879, 90, 42, 35];

function sort(array, left, right) {
    if (left >= right)
        return;
    // 找出中间索引
    var center = parseInt((left + right) / 2);
    // 对左边数组进行递归
    sort(array, left, center);
    // 对右边数组进行递归
    sort(array, center + 1, right);
    // 合并
    merge(array, left, center, right);
    // 打印每次排序结果
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

function merge(array, left, center, right) {
    var tmpArr = [];
    // 右数组第一个元素索引
    var mid = center + 1;
    // third 记录临时数组的索引
    var third = left;
    // 缓存左数组第一个元素的索引
    var tmp = left;
    while (left <= center && mid <= right) {
        // 从两个数组中取出最小的放入临时数组
        if (array[left] <= array[mid]) {
            tmpArr[third++] = array[left++];
        } else {
            tmpArr[third++] = array[mid++];
        }
    }
    // 剩余部分依次放入临时数组（实际上两个while只会执行其中一个）
    while (mid <= right) {
        tmpArr[third++] = array[mid++];
    }
    while (left <= center) {
        tmpArr[third++] = array[left++];
    }
    // 将临时数组中的内容拷贝回原数组中
    // （原left-right范围的内容被复制回原数组）
    while (tmp <= right) {
        array[tmp] = tmpArr[tmp++];
    }
}
// sort(arr, 0, arr.length - 1)
// console.log(arr);


var newArr = [];
var targetLength = arr.length * 0.25;

function mySort(arr, isPositive) {
    var length = arr.length;
    if (isPositive) {
        var min = arr[0];
        for (let i = 0; i < length; i++) {
            if (arr[i] < min) min = arr[i];
        }
        newArr.push(min);
        if (newArr.length != targetLength) {
            var targetIndex = arr.findIndex(v => v == min);
            arr.splice(targetIndex, 1);
            mySort(arr, isPositive);
        } else {
            console.log(min);
        }
    } else {
        var max = arr[0];
        var startIndex = length - 1;
        for (let i = startIndex; i > 0; i--) {
            if (arr[i] > max) max = arr[i];
        }
        newArr.unshift(max);
        if (newArr.length != targetLength) {
            var targetIndex = arr.findIndex(v => v == max);
            arr.splice(targetIndex, 1);
            mySort(arr, isPositive);
        } else {
            console.log(max);
        }
    }
}


mySort(arr, false);
console.log(newArr);