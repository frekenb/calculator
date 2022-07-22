function calc(str) {
  let result = [];
  let res = "";
  let num = 0;
  let bool = false;

  str = str.split("").filter(function (val) {
    if (val !== " ") {
      return true;
    }
  });

  str.forEach(function (val, index) {
    if (val !== "(") {
      result.push(val);
    } else if (val === "(" && str[index - 1] === "+") {
      result.push(val);
    } else if (val === "(" && str[index - 1] === "-") {
      result.push(val);
    } else if (val === "(" && str[index - 1] === "*") {
      result.push(val);
    } else if (val === "(" && str[index - 1] === "/") {
      result.push(val);
    } else {
      result.push("*");
      result.push(val);
    }
  });
  if (result[0] === "*") {
    result.shift();
  }
  str = result;
  result = [];

  str.forEach(function (val) {
    if (val === "(" && num === 0) {
      num--;
      bool = true;
    } else if (val === ")") {
      num++;

      if (num === 0) {
        res = res.split("");
        res.shift();
        res = res.join("");
        result.push(calc(res));
        bool = false;
        res = "";
      }
    }

    if (bool) {
      res = res + val;
    } else if (!bool && val !== ")") {
      result.push(val);
    }
  });

  str = result;
  result = [];
  res = "";
  bool = false;

  str.forEach(function (val) {
    if (+val + 1 === +val + 1) {
      bool = true;
    } else {
      bool = false;
    }

    if (bool) {
      res = res + val;
    } else if (!bool && res !== "") {
      result.push(res);
      result.push(val);
      res = "";
    } else {
      result.push(val);
    }
  });
  if (res !== "") {
    result.push(res);
  }

  str = result;
  result = [];

  str = str.map(function (val) {
    if (+val + 1 === +val + 1) {
      return +val;
    } else {
      return val;
    }
  });

  str.forEach(function (val, ind) {
    if (val === "-") {
      str[ind] = "+";
      str[ind + 1] = -str[ind + 1];

      if (-str[ind + 1] !== -str[ind + 1]) {
        alert("Something happened");
      }
    }
  });

  result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "*") {
      result = str.slice(0, i - 1);
      result.push(str[i - 1] * str[i + 1]);
      str = result.concat(str.slice(i + 2, str.length));
      i = 0;
    } else if (str[i] === "/") {
      if (str[i + 1] === 0) {
        return "Error! Devided to Zero";
      }
      result = str.slice(0, i - 1);
      result.push(str[i - 1] / str[i + 1]);
      str = result.concat(str.slice(i + 2, str.length));
      i = 0;
    }
  }
  return str.reduce(function (aggr, val) {
    if (val !== "+") {
      aggr = aggr + val;
      return aggr;
    } else {
      return aggr;
    }
  }, 0);
}

let input = document.querySelector("#input");
let btnEqual = document.querySelector("#equal");
btnEqual.addEventListener("click", showResult);

let form = document.querySelector("form");
form.addEventListener("submit", showResult);

let result = document.querySelector("#result");

function showResult(event) {
  /*   debugger; */
  event.preventDefault();
  result.textContent = calc(input.value);
}

/* document.querySelector("button").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return;
  m;
};
 */
