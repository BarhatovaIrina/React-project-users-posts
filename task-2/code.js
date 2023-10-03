//(a > 10 ? a : a * 2) > 5 ? (2 * a) + 1 : (a < 3 ? 1 : 2 * (a - 2)) > 4 ? 5 : (a % 2 == 0 ? 6 : 7);
// условие с условным (тернарным) оператором перевести в if...else И switch()
// результат выводить в консоль, с пощью console.log()


let a = Math.floor(Math.random() * 100);
let result;

// varinat 1
// switch (true) {
//     case (a > 10):
//         result = 2 * a + 1;
//         break;
//     case ((a > 5) && (a <= 10)):
//         result = (2 * a) + 1;
//         break;
//     case ((a > 3) && (a <= 5)):
//         result = 2 * (a - 2);
//         break;
//     case (a == 3 || a == 2 || a == 1):
//         result = 1;
//         break;
//     case (a % 2 == 0):
//         result = 6;
//         break;
//     default:
//         result = 7;
//         break;
// }

// variant 2
if (a > 10) {
    result = 2 * a + 1;
} else if (a <= 10 && a > 5) {
    result = (2 * a) + 1;
} else if (a <= 5 && a > 3) {
    result = 2 * (a - 2);
} else if (a == 3) {
    result = 1;
} else if (a == 2) {
    result = 1;
} else if (a == 1) {
    result = 1;
} else if (a % 2 == 0) {
    result = 6;
} else {
    result = 7;
}

console.log('a=' + a + ', result=' + result);