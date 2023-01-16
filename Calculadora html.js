let cifras;
let nextOp;
let percentage = false;
let historial = [];
let pushNumber = false;
cambiarVisor = (valor) => {
    let visor = document.getElementById('visor');
    let visorOp = document.getElementById('visorOp')
    if (valor === '.' && !visor.value.includes('.')) {
        visor.value += '.';
    } else if (valor === '.' && visor.value === '0') {
        visor.value += '.';
        cifras = 0 + '.';
    } else if (valor === '.' && visor.value.includes('.')) {
        valor === undefined;
    } else if (visor.value === '0' && valor !== 'ac') {
        visor.value = valor;
        pushNumber = true;
    } else if (valor === 'ac') {
        visor.value = 0;
        cifras = '';
        nextOp = undefined;
        visorOp.value = '';
        historial = [];
    }
    else {
        visor.value += valor;
        pushNumber = true;
    }
}

operation = (op) => {
    let visor = document.getElementById('visor');
    let actualValue = Number(visor.value);
    if (op === '+-') {
        visor.value = -actualValue;
        return;
    }
    if(nextOp && !pushNumber && op !== '='){
        historial.pop();
        historial.push(op);
        nextOp = op;
        history();
        return;
    } else if(nextOp && !pushNumber && op === '='){
        historial.pop();
        nextOp = undefined;
        visor.value = cifra;
        percentage = false;
        history();
        return;
    }
    pushNumber = false;
    if (op === '%') {
        percentage = true;
        pushNumber = true;
    }
    if (!nextOp) {
        cifras = actualValue;
    }
    if (nextOp !== '%') {
        historial.push(actualValue)
    }
    if (percentage) {
        if (!cifras) {
            visor.value = 0;
            return;
        }
        if (nextOp === 'x' || nextOp === '/') {
            actualValue /= 100;
            percentage = false;
        }
        else {
            actualValue = (actualValue * cifras) / 100;
            percentage = false;
        }
    }
    if (nextOp === '+') {
        cifras += actualValue;
    } else if (nextOp === '-') {
        cifras -= actualValue;
    } else if (nextOp === 'x') {
        cifras *= actualValue;
    } else if (nextOp === '/') {
        cifras /= actualValue;
    }
    if (op !== '=') {
        nextOp = op;
        visor.value = 0;
        historial.push(op);
    } else {
        nextOp = undefined;
        visor.value = cifras;
        percentage = false;
    }
    history();
    if (op === '=') {
        historial = [];
    }
}
const history = () => {
    const visorOp = document.getElementById('visorOp');
    visorOp.value = historial.slice(-29).join(' ');
}