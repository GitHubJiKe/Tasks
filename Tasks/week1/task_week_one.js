var PERCENTAGE = process.env.PERCENTAGE ? process.env.PERCENTAGE : 0.95;//读取注入的百分比参数；没有使用默认值
var NUM = process.env.NUM ? process.env.NUM : 100;//读取注入的url数量参数；没有使用默认值
var fs = require('fs');
var co = require('co');
const readline = require('readline');

var readdirAsync = (filePath) => {
    return (cb) => {
        fs.readdir(filePath, (err, result) => {
            cb(err, result);
        });
    }
}

var writeFileAsync = (filePath, data) => {
    return (cb) => {
        fs.writeFile(filePath, data, (err) => {
            cb(err);
        })
    }
}

var readFileAsync = (filePath) => {
    return (cb) => {
        fs.readFile(filePath, (err, result) => {
            cb(err, result);
        });
    }
}


//获取时间值
function getTimeValue() {
    co(function* () {
        var resultArr = yield readdirAsync('./');//读取当前文件夹下所有的文件名集合
        if (resultArr) {
            if (!resultArr.includes('urls.txt')) {//如果没有存在目标文件，写入保存后，读取，获取结果
                var writeErr = yield writeFileAsync('./urls.txt', getDataToWrite());
                if (!writeErr) {
                    outPutResult();
                }
            } else {//存在，直接读取
                outPutResult();
            }
        }
    });
}

//构建写入数据
function getDataToWrite() {
    var data = [];
    //循环构造写入文件的数据
    for (var i = 1; i <= NUM; i++) {
        data.push(`${parseFloat(Math.random() * 100).toFixed(2)} http://www.boldseas${i}.com\n`);
    }
    return data.join('');
}
//输出结果
function outPutResult() {
    var rl = readline.createInterface({input: fs.createReadStream('urls.txt')});//通过readline模块构造读取器
    var nums = [];
    rl.on('line', (line) => {//逐行读取
        var num = parseFloat(line.split(' ')[0]);
        nums.push({num:num,url:line.split(' ')[1]});
    }).on('close', () => {//读取完毕，做排序，取结果值得index,输出结果
        nums.sort((v1, v2) => v1.num - v2.num);
        var index = parseInt(nums.length * PERCENTAGE);
        console.log(`percentage:${percentage};index:${index};result:${nums[index].num};url:${nums[index].url}`);
    });
}


getTimeValue();



