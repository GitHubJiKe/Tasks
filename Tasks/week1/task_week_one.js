var PERCENTAGE = process.env.PERCENTAGE ? process.env.PERCENTAGE : 0.95;//读取注入的百分比参数；没有使用默认值
var MIDDLEPERCENTAGE = 0.50;
var URL_NUM = 1000000;
var fs = require('fs');
const readline = require('readline');


fs.access('./urls.txt', (err) => {//check the file is exits
    if (err) {//no exits
        fs.writeFile('urls.txt', createDataToWrite(), (err) => {//create data and write into a file
            if (err) console.log('写入文件出错！！！');
            readFileAndCalculateTime();// without err,calculate and get result time
        });
    } else {//exits,calculate and get result time
        readFileAndCalculateTime();
    }
});

//create data to write 
function createDataToWrite() {
    var data = [];
    for (var i = 1; i <= URL_NUM; i++) {
        data.push(`${parseFloat(Math.random() * 100).toFixed(2)} http://www.boldseas${i}.com\n`);
    }
    return data.join('');
}

//calculate and get result time
function readFileAndCalculateTime() {
    var rl = readline.createInterface({ input: fs.createReadStream('urls.txt') });
    var nums = [];
    rl.on('line', (line) => {
        var tmpArr = line.split(' ');
        var num = parseFloat(tmpArr[0]);
        nums.push({ num: num, url: tmpArr[1] });
    }).on('close', () => {
        nums.sort((v1, v2) => v1.num - v2.num);
        var index = parseInt(nums.length * PERCENTAGE);
        var result = nums[index];
        console.log(`percentage:${PERCENTAGE};index:${index};result:${result.num};url:${result.url}`);
    });
}

//if data's amount is very huge,use quick sort is efficient and fast than normal sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].num < pivot.num) {
            left.push(arr[i]);
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

//urls.txt 文件分析结果：十万数据：3.5MB;一百万数据量：35.8MB

//求值排序思路：
//对百分比值作分析，以0.50为中间值
//对大于0.5的使用逆序排序，比如，0.95 > 0.5,那么只要从大到小排序到95%即可终止排序
//同理对于小于0.5的，使用正序排序，比如0.2 < 0.5 由小及大排到20%即可终止排序