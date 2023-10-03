let inputBox = document.querySelector('.input');
let inputBoxSelf = document.querySelector('.inputSelf');

const operPlus = (a, b) => {
    return a + b;
}

const operMinus = (a, b) => {
    return a - b;
}

const operUmn = (a, b) => {
    return a * b;
}

const operDel = (a, b) => {
    return a / b;
}

const calc = () => {
    let result = eval(inputBox.value);
    inputBox.value = result;
}

const getValue = (e) => {
    inputBox.value += e.target.innerHTML;
}

const reset = () => {
    inputBox.value = '';
}
const getOperation = (e) => {
    let str = inputBox.value;
    if (str.length > 0) {
        const lastsym = str[str.length - 1];
        if (lastsym !== '.' && lastsym !== e.target.innerHTML)
            inputBox.value += e.target.innerHTML;
    }

}
const getDot = () => {
    let str = inputBox.value;
    const parts = str.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.indexOf('.') === -1)
        if (lastPart.length >= 0) {
            const lastsym = lastPart[lastPart.length - 1];
            if (lastsym != '.') {
                if (lastsym >= 1 && lastsym <= 9) str += '.';
                else str += '0.';
            }
        }
    inputBox.value = str;
}

inputBoxSelf.addEventListener('change', () => {
    let str = inputBoxSelf.value;
    try {
        let result = eval(str);
        if (isNaN(result) || (typeof result === "undefined")) {
            alert('Error!');
            console.log(result)
        }
        else {
            inputBoxSelf.value = result;
        }
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            alert('Error!');
        }
    }


})
inputBoxSelf.addEventListener('input', () => {
    let str = inputBoxSelf.value;
    let regex = /^[\d+.*\/-]+$/;
    if (regex.test(str)) {
        inputBoxSelf.value = str;
    }
    else {
        inputBoxSelf.value = str.substring(0, str.length - 1);
    }
})