/* ************************************ */
/* Variable definitions */
/* ************************************ */
// the problems are in the order of appearance
var practice_word_problems = []; // 3 probs
var practice_math_problems = []; // 3 probs
// the problems will be shuffled
var screening_problems = []; // 12 math, 12 word probs


/* ************************************ */
/* practice_word_problems */
/* ************************************ */
practice_word_problems.push({
    "probid": "wp0143",
    "type": "w1",
    "problem": "QU?Z",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "3",
    "orgword": "QUIZ"
});
practice_word_problems.push({
    "probid": "wp0044",
    "type": "w1",
    "problem": "N9?SERY",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "2",
    "orgword": "NURSERY"
});
practice_word_problems.push({
    "probid": "wp0061",
    "type": "w1",
    "problem": "PL?N",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "1",
    "orgword": "PLAN"
});


/* ************************************ */
/* practice_math_problems */
/* ************************************ */
practice_math_problems.push({
    "probid": "mp1487",
    "type": "m1",
    "num1": "101",
    "num2": "3",
    "problem": "30?",
    "alt1": "2",
    "alt2": "3",
    "alt3": "4",
    "answer": "2"
});
practice_math_problems.push({
    "probid": "mp0003",
    "type": "m1",
    "num1": "231",
    "num2": "7",
    "problem": "161?",
    "alt1": "5",
    "alt2": "6",
    "alt3": "7",
    "answer": "3"
});
practice_math_problems.push({
    "probid": "mp1488",
    "type": "m1",
    "num1": "104",
    "num2": "5",
    "problem": "52?",
    "alt1": "0",
    "alt2": "1",
    "alt3": "2",
    "answer": "1"
});


/* ************************************ */
/* practice_choice_math */
/* ************************************ */
screening_problems.push({
    "probid": "mp0064",
    "type": "m1",
    "num1": "111",
    "num2": "6",
    "problem": "66?",
    "alt1": "6",
    "alt2": "7",
    "alt3": "8",
    "answer": "1"
});
screening_problems.push({
    "probid": "mp0118",
    "type": "m1",
    "num1": "573",
    "num2": "3",
    "problem": "171?",
    "alt1": "8",
    "alt2": "9",
    "alt3": "0",
    "answer": "2"
});
screening_problems.push({
    "probid": "mp1489",
    "type": "m1",
    "num1": "106",
    "num2": "5",
    "problem": "53?",
    "alt1": "8",
    "alt2": "9",
    "alt3": "0",
    "answer": "3"
});
screening_problems.push({
    "probid": "mp1490",
    "type": "m1",
    "num1": "107",
    "num2": "3",
    "problem": "32?",
    "alt1": "0",
    "alt2": "1",
    "alt3": "2",
    "answer": "2"
});
screening_problems.push({
    "probid": "mp1531",
    "type": "m1",
    "num1": "165",
    "num2": "4",
    "problem": "66?",
    "alt1": "8",
    "alt2": "9",
    "alt3": "0",
    "answer": "3"
});
screening_problems.push({
    "probid": "mp1532",
    "type": "m1",
    "num1": "172",
    "num2": "2",
    "problem": "34?",
    "alt1": "3",
    "alt2": "4",
    "alt3": "5",
    "answer": "2"
});
screening_problems.push({
    "probid": "mp1533",
    "type": "m1",
    "num1": "175",
    "num2": "2",
    "problem": "35?",
    "alt1": "0",
    "alt2": "1",
    "alt3": "2",
    "answer": "1"
});
screening_problems.push({
    "probid": "mp1534",
    "type": "m1",
    "num1": "176",
    "num2": "4",
    "problem": "70?",
    "alt1": "2",
    "alt2": "3",
    "alt3": "4",
    "answer": "3"
});

screening_problems.push({
    "probid": "mp1629",
    "type": "m1",
    "num1": "337",
    "num2": "5",
    "problem": "168?",
    "alt1": "5",
    "alt2": "6",
    "alt3": "7",
    "answer": "1"
});

screening_problems.push({
    "probid": "mp1630",
    "type": "m1",
    "num1": "345",
    "num2": "2",
    "problem": "69?",
    "alt1": "8",
    "alt2": "9",
    "alt3": "0",
    "answer": "3"
});

screening_problems.push({
    "probid": "mp1631",
    "type": "m1",
    "num1": "346",
    "num2": "4",
    "problem": "138?",
    "alt1": "3",
    "alt2": "4",
    "alt3": "5",
    "answer": "2"
});

screening_problems.push({
    "probid": "mp1632",
    "type": "m1",
    "num1": "347",
    "num2": "2",
    "problem": "69?",
    "alt1": "4",
    "alt2": "5",
    "alt3": "6",
    "answer": "1"
});


/* ************************************ */
/* practice_choice_word */
/* ************************************ */
screening_problems.push({
    "probid": "wp0003",
    "type": "w1",
    "problem": "US?GE",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "1",
    "orgword": "USAGE"
});
screening_problems.push({
    "probid": "wp0006",
    "type": "w1",
    "problem": "B9?ZI9IAN",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "1",
    "orgword": "BRAZILIAN"
});
screening_problems.push({
    "probid": "wp0024",
    "type": "w1",
    "problem": "B9?DAL",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "3",
    "orgword": "BRIDAL"
});
screening_problems.push({
    "probid": "wp0025",
    "type": "w1",
    "problem": "S9?SS9RS",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "3",
    "orgword": "SCISSORS"
});
screening_problems.push({
    "probid": "wp0038",
    "type": "w1",
    "problem": "C9?DE9ELLA",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "1",
    "orgword": "CINDERELLA"
});
screening_problems.push({
    "probid": "wp0045",
    "type": "w1",
    "problem": "W9?RIOR",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "2",
    "orgword": "WARRIOR"
});
screening_problems.push({
    "probid": "wp0046",
    "type": "w1",
    "problem": "B9?MUDA",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "2",
    "orgword": "BERMUDA"
});
screening_problems.push({
    "probid": "wp0053",
    "type": "w1",
    "problem": "M9?OR9YCLE",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "3",
    "orgword": "MOTORCYCLE"
});

screening_problems.push({
    "probid": "wp0039",
    "type": "w1",
    "problem": "S9?ONYM",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "1",
    "orgword": "SYNONYM"
});

screening_problems.push({
    "probid": "wp0131",
    "type": "w1",
    "problem": "T9?SDAY",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "2",
    "orgword": "TUESDAY"
});

screening_problems.push({
    "probid": "wp0132",
    "type": "w1",
    "problem": "E9?RG9NCY",
    "alt1": "A",
    "alt2": "E",
    "alt3": "I",
    "answer": "2",
    "orgword": "EMERGENCY"
});

screening_problems.push({
    "probid": "wp0234",
    "type": "w1",
    "problem": "L9?TUCE",
    "alt1": "N",
    "alt2": "R",
    "alt3": "T",
    "answer": "3",
    "orgword": "LETTUCE"
});
