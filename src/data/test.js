let temp = [];
function getRandomData(val, total) {
  // let temp = [];
  let _random = Math.floor(Math.random() * total);
  if (temp.length < val) {
    if (temp.indexOf(_random) == -1) temp.push(_random);
    getRandomData(val, total);
  }
  return temp;
}

function getSerialDataBy(type, t, f, total) {
  if (type == 5) {
    // 16 件 ，可寄送物品， 4 件不可寄送物品
    let normalData = getRandomData(t, 20); //可寄送数据
    temp = [];
    let errorData = getRandomData(f, 10); // 不可寄数据
    console.log("normalData", normalData);
    console.log("errorData", errorData);
    let mixData = [];
    normalData.forEach((item) => {
      mixData.push();
    });
    temp = [];
    // let randomArr = getRandomData(mixData.length);
    // let targetData = [];
    // randomArr.forEach((item) => {
    //   targetData.push(randomArr[item]);
    // });
    // console.log("randomArr"), randomArr;
    // return targetData;
  }
}

let arr = getSerialDataBy(5, 16, 4, 20);

// console.log(arr);
