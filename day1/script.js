const fs = require("fs");
const path = require("path");

function getInputs(callback) {
  fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const input = data.toString().split("\n");
    const acc = input.reduce(
      (acc, curr) => {
        const [left, right] = curr.split("   ");
        acc.left.push(+left);
        acc.right.push(+right);
        return acc;
      },
      { left: [], right: [] }
    );

    const left = acc.left.toSorted();
    const right = acc.right.toSorted();
    callback([left, right])
  });
}

function question1() {
  getInputs((inputs) => {
    const [left, right] = inputs;

    let totalDistance = 0;
    for (let i = 0; i < left.length; i++) {
      const distance = Math.abs(left[i] - right[i]);
      totalDistance += distance;
    }
    console.log("Total Distance: ", totalDistance);
  });
}


function question2() {
  getInputs((inputs) => {
    const [left, right] = inputs;

    let rightIndex = 0;
    let totalScore = 0;

    leftLoop:
    for (let i = 0; i < left.length; i++) {
      const _left = left[i];
      let count = 0;
      
      for (let j = rightIndex; j < right.length; j++) {
        const _right = right[j];
        
        if (_left < _right) {
          totalScore += (count * _left);
          continue leftLoop;
        } else if (_left === _right) {
          count++;;
        } else {
          rightIndex = j;
        }
      }
    }
    console.log("Total Score: ", totalScore);
  });
}

question1();
question2();
