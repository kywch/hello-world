/* ************************************ */
/* Define experimental variables */
/* ************************************ */

/* this is an experiment */
//var maadm_experiment = [];

// generic task variables
var flag_debug = false;
var time_psolve = 7000; // ms
var progress_bar =
    "<div class='progress_box'><div class='meter'> <span style='width: 100%'></span></div></div>";
var sbjId = "";

// practice-related indices
var curr_prac_word = 0;
var curr_prac_math = 0;
var curr_screening = 0;

// holding the problems
var problem_math = {};
var problem_word = {};
var problem_standby = {};
var problem_current = {};

// choice / point-related
var curr_probcate = ""; // math or word
var curr_correct = false;
var correct_math = 0;
var correct_word = 0;

// no minimum resp time --> Ps can proceed as fast as possible
var mindur_psolve = 300;

/* ************************************ */
/* Helper functions */
/* ************************************ */

function debugProblemHTML(prob_info) {
    if (flag_debug) {
        return " (<b>" + prob_info.type + "</b>) ";
    } else {
        return "";
    }
}

function generateProblemHTML(prob_type, prob_info, flag_disp = 'problem') {
    if (flag_debug) {
        console.log("generateProblemHTML: ", prob_type, prob_info);
    }
    if (prob_type == 'math') {
        // answers
        let answer = parseInt(prob_info.num1) * parseInt(prob_info.num2);
        let html_num1 = prob_info.num1;
        let html_num2 = prob_info.num2;
        let html_prob = prob_info.problem;

        // filling up spaces with white 0 s
        if (html_num1.length == 3) {
            html_num1 = "<span style='color:white'>0</span>".concat(html_num1);
        }
        if (html_num2.length == 1) {
            html_num2 = "<span style='color:white'>00</span>".concat(html_num2);
        } else if (html_num2.length == 2) {
            html_num2 = "<span style='color:white'>0</span>".concat(html_num2);
        }
        if (html_prob.length == 3) {
            html_prob = "<span style='color:white'>0</span>".concat(html_prob);
        }
        html_prob = html_prob.replace("?", "<span class='math_square'>&#x25a1;</span>");

        if (flag_disp == 'problem') {
            return "<div class='math_question'><p>" + html_num1 + "</p><p>&times;" + html_num2 +
                "</p><hr>" + html_prob + "</p></div>" +
                "<div class='math_answer'><p><span class='math_alt'>" + prob_info.alt1 +
                "</span> <span class='math_alt'>" + prob_info.alt2 +
                "</span> <span class='math_alt'>" + prob_info.alt3 + "</span></p></div>";

        } else if (flag_disp == 'feedback') {
            answer = answer.toString();
            if (answer.length == 3) {
                answer = "<span style='color:white'>0</span>".concat(answer);
            }
            return "<div class='math_question'><p>" + html_num1 + "</p><p>&times;" + html_num2 +
                "</p><hr>" + answer + "</p></div>";

        } else {
            console.log("Error (generateProblemHTML): Wrong flag_disp.");
            return "<b>Error (generateProblemHTML): Wrong flag_disp.</b>";
        }

    } else if (prob_type == 'word') {
        let html_prob = prob_info.problem;

        html_prob = html_prob.replace(/9/g, "~");
        html_prob = html_prob.replace("?", "<span class='word_square'>&#x25a1;</span>");

        if (flag_disp == 'problem') {
            return "<div class='word_question'><p>" + html_prob + "</p></div>" +
                "<div class='word_answer'><p><span class='word_alt'>" + prob_info.alt1 +
                "</span> <span class='word_alt'>" + prob_info.alt2 +
                "</span> <span class='word_alt'>" + prob_info.alt3 + "</span></p></div>";

        } else if (flag_disp == 'feedback') {
            // require orgword
            return "<div class='word_question'><p>" + prob_info.orgword + "</p></div>";

        } else {
            console.log("Error (generateProblemHTML): Wrong flag_disp.");
            return "<b>Error (generateProblemHTML): Wrong flag_disp.</b>";
        }

    } else {
        console.log("Error (generateProblemHTML): Wrong problem type.");
        return "<b>Error (generateProblemHTML): Wrong problem type.</b>";
    }
}

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* Task practice - word
  - word instructions
  - use pre-determined problems of varioud difficulty: 1-1-1-2-3-4-5-6-6-7-7-7
  - show timer during the practice, max 7 sec
  - feedback always provided
*/

/* Word practice problems (12): 1-1-1-2-3-4-5-6-6-7-7-7
    wp0143 (1,3) - wp0044 (1,2) - wp0061 (1,1) -
    wp1372 (2,3) - wp0002 (3,1) - wp0018 (4,2) -
    wp1716 (5,1) - wp0013 (6,2) - wp1195 (6,3) -
    wp1279 (7,2) - wp0160 (7,1) - wp0838 (7,3)
*/
// require practice_word_problems, which should have been loaded successfully

var sequence_word_practice = [];

var enter_word_practice_page = {
    type: "text",
    cont_key: [13, 32], // space bar
    text: "<div class = centerbox><p class = block-text>" +
        "Press <strong>Enter</strong> or <strong>Space bar</strong> key to practice word problems.</p>" +
        "<p class = block-text>The instuctions are provided in the next page.</p></div>",
    timing_post_trial: 1000
};
sequence_word_practice.push(enter_word_practice_page);

/* define instructions block */
var word_instruct_page = {
    type: "text",
    data: {
        exp_stage: 'word_instruction'
    },
    cont_key: "p",
    text: "<div class = centerbox>" +
        "<p class = block-text>An incomplete English word, <b>including proper nouns (e.g. the names of specific places)</b>, " +
        "will appear in the center of the screen, and three letters will appear in the lower center of the screen.</p>" +
        "<p class = block-text>Your task is to make the word a correct English word by " +
        "filling in the <b><font color=blue>blue box</font></b> with one of the lower three letters. " +
        "Some letters were replaced with tildes (~) to make problems harder. </p>" +
        "<p class = block-text>Here, you will use 'i', 'o', and 'p' keys to <b>select the left (i), middle (o), and right (p) " +
        "letter</b> as an answer for each question.</p>" +
        "<p class = block-text>Press the correct answer key to continue.</p>" +
        "<div class='word_question'><p>Q~" + "<span class='word_square'>&#x25a1;</span>" + "Z</p></div>" +
        "<div class='word_answer'><p><span class='word_alt'>A</span> <span class='word_alt'>E</span> <span class='word_alt'>I</span></p></div>" +
        "</div>",
    timing_post_trial: 1000
};
sequence_word_practice.push(word_instruct_page);

var start_word_practice_page = {
    type: "text",
    cont_key: "o",
    text: "<div class = centerbox><p class = block-text>" +
        "Now, you will be presented with <b>3</b> practice word problems.</p> " +
        "<p class = block-text>Each problem must be answered <b>within 7 seconds</b>. " +
        "Please note that the 7 sec timer will be shown to you <b>only</b> during the practice block. </p>" +
        "<p class = block-text>Press &quot;<b>o</b>&quot; key to begin a problem.</p>" +
        "</div>",
    timing_post_trial: 1000,
    data: {
        exp_stage: 'word_practice_block_start'
    },
    on_finish: function() {
        curr_prac_word = 0;
        if (flag_debug) {
            console.log("Starting the word practice ... ");
            console.log("Up next: ", practice_word_problems[curr_prac_word].orgword);
        }
    }
};
sequence_word_practice.push(start_word_practice_page);

// setting up the word practice, using practice_word_problems
for (var ii = 0; ii < practice_word_problems.length; ii++) {
    var problem_page = {
        type: 'single-stim-rev',
        is_html: true,
        timing_response: time_psolve,
        minimum_duration: mindur_psolve,
        choices: ['i', 'o', 'p'], // 73, 79, 80
        stimulus: "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
            "to make a correct English word within 7 seconds. " +
            "Some letters were replaced with tildes (~) to make problems harder. " +
            "Use 'i', 'o', 'p' key to choose from the left, middle, and right letter. " +
            debugProblemHTML(practice_word_problems[ii]) + "</p>" +
            generateProblemHTML('word', practice_word_problems[ii]) + progress_bar + "</div>",
        data: {
            exp_stage: 'word_practice',
            prob_id: practice_word_problems[ii].probid
        },
        timing_post_trial: 0,
        on_finish: function(data) {
            // evaluate the response
            if (mapKey(data.key_press) == practice_word_problems[curr_prac_word].answer) {
                curr_correct = true;
            } else {
                curr_correct = false;
            }
        }
    };
    sequence_word_practice.push(problem_page);

    var feedback_page = {
        type: 'text',
        cont_key: [13, 32], // space bar
        timing_post_trial: 1000, // give a 1-sec break
        text: function() {
            let feedback_string = "<span class='very-large'><br><font color='red'>Incorrect.</font></span>";
            if (curr_correct) {
                feedback_string = "<span class='very-large'><br><font color='green'>Correct!</font></span>";
            }
            return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                "to make a correct English word within 7 seconds. " +
                "Some letters were replaced with tildes (~) to make problems harder. " +
                "Use 'i', 'o', 'p' key to choose from the left, middle, and right letter. " +
                debugProblemHTML(practice_word_problems[curr_prac_word]) + "</p>" +
                generateProblemHTML('word', practice_word_problems[curr_prac_word], 'feedback') +
                '<p class = center-block-text>' + feedback_string + '</p>' +
                '<p class = center-block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> key to start the next trial.</p></div>' +
                '</div>';
        },
        data: function() {
            return {
                exp_stage: 'word_practice',
                trial_info: 'result',
                prob_id: practice_word_problems[curr_prac_word].probid,
                prob_type: practice_word_problems[curr_prac_word].type, // difficulty
                correct: curr_correct
            };
        },
        on_finish: function(data) {
            curr_prac_word++;
            if (flag_debug) {
                if (curr_prac_word < practice_word_problems.length) {
                    console.log("Up next: ", practice_word_problems[curr_prac_word].orgword);
                }
            }
        }
    };
    sequence_word_practice.push(feedback_page);
}

/*
maadm_experiment.push({
    timeline: sequence_word_practice
});
//*/



/* Task practice - math
  - math instructions
  - use pre-determined problems of varioud difficulty: 1-1-1-2-2-2-3-4-4-5-6-7
  - show timer during the practice, max 7 sec
  - feedback always provided
*/

/* Math practice problems (12): 1-1-1-2-2-2-3-4-4-5-6-7
    mp1487 (1,2) - mp0003 (1,3) - mp1488 (1,1) -
    mp0009 (2,3) - mp0004 (2,2) - mp0005 (2,1) -
    mp0014 (3,1) - mp0013 (4,2) - mp0044 (4,3) -
    mp0011 (5,1) - mp0018 (6,3) - mp0019 (7,2)
*/
// require practice_math_problems, which should have been loaded successfully

var sequence_math_practice = [];

var enter_math_practice_page = {
    type: "text",
    cont_key: [13, 32], // space bar
    text: "<div class = centerbox><p class = block-text>" +
        "Press <strong>Enter</strong> or <strong>Space bar</strong> key to practice math problems.</p>" +
        "<p class = block-text>The instuctions are provided in the next page.</p></div>",
    timing_post_trial: 1000
};
sequence_math_practice.push(enter_math_practice_page);

/* define instructions block */
var math_instruct_page = {
    type: "text",
    data: {
        exp_stage: 'math_instruction'
    },
    cont_key: "i",
    text: "<div class = centerbox>" +
        "<p class = block-text>An incomplete multiplication equation will appear in the center of the screen, " +
        "and three numbers will appear in the lower center of the screen.</p>" +
        "<p class = block-text>Your task is to make the equation correct by filling in the <b><font color=blue>blue box</font></b> with one of the lower three numbers.</p>" +
        "<p class = block-text>Here, you will use 'i', 'o', and 'p' keys to <b>select the left (i), middle (o), and right (p) " +
        "number</b> as an answer for each question.</p>" +
        "<p class = block-text>Press the answer key to continue.</p>" +
        "<div class='math_question'><p><span style='color:white'>0</span>123</p><p>&times;<span style='color:white'>00</span>2</p>" +
        "<hr>" +
        "<span style='color:white'>0</span>2" + "<span class='math_square'>&#x25a1;</span>" + "6</p></div>" +
        "<div class='math_answer'><p><span class='math_alt'>4</span> <span class='math_alt'>5</span> <span class='math_alt'>6</span></p></div>" +
        "</div>",
    timing_post_trial: 1000
};
sequence_math_practice.push(math_instruct_page);

var start_math_practice_page = {
    type: "text",
    cont_key: "o",
    text: "<div class = centerbox><p class = block-text>" +
        "Now, you will be presented with <b>3</b> practice math problems. " +
        "<p class = block-text>Each problem must be answered <b>within 7 seconds</b>. " +
        "Please note that the 7 sec timer will be shown to you <b>only</b> during the practice block. </p>" +
        "<p class = block-text>Press &quot;<b>o</b>&quot; key to begin a problem.</p>" +
        "</div>",
    timing_post_trial: 1000,
    data: {
        exp_stage: 'math_practice_block_start'
    },
    on_finish: function() {
        curr_prac_math = 0;
        if (flag_debug) {
            let answer = parseInt(practice_math_problems[curr_prac_math].num1) * parseInt(practice_math_problems[curr_prac_math].num2);
            console.log("Starting the math practice ... ");
            console.log("Up next: ", answer);
        }
    }
};
sequence_math_practice.push(start_math_practice_page);

// setting up the word practice, using practice_word_problems
for (var ii = 0; ii < practice_math_problems.length; ii++) {
    var problem_page = {
        type: 'single-stim-rev',
        is_html: true,
        timing_response: time_psolve,
        minimum_duration: mindur_psolve,
        choices: ['i', 'o', 'p'], // 73, 79, 80
        stimulus: "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
            "to make the equation correct within 7 seconds. " +
            "Use 'i', 'o', 'p' key to choose from the left, middle, and right option. " +
            debugProblemHTML(practice_math_problems[ii]) + "</p>" +
            generateProblemHTML('math', practice_math_problems[ii]) + '<br><br>' + progress_bar + "</div>",
        data: {
            exp_stage: 'math_practice',
            prob_id: practice_math_problems[ii].probid
        },
        timing_post_trial: 0,
        on_finish: function(data) {
            // evaluate the response
            if (mapKey(data.key_press) == practice_math_problems[curr_prac_math].answer) {
                curr_correct = true;
            } else {
                curr_correct = false;
            }
        }
    };
    sequence_math_practice.push(problem_page);

    var feedback_page = {
        type: 'text',
        cont_key: [13, 32], // space bar
        timing_post_trial: 1000, // give a 1-sec break
        text: function() {
            let feedback_string = "<span class='very-large'><br><font color='red'>Incorrect.</font></span>";
            if (curr_correct) {
                feedback_string = "<span class='very-large'><br><font color='green'>Correct!</font></span>";
            }
            return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                "to make the equation correct within 7 seconds. " +
                "Use 'i', 'o', 'p' key to choose from the left, middle, and right option. " +
                debugProblemHTML(practice_math_problems[curr_prac_math]) + "</p>" +
                generateProblemHTML('math', practice_math_problems[curr_prac_math], 'feedback') +
                '<p class = center-block-text>' + feedback_string + '</p>' +
                '<p class = center-block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> key to start the next trial.</p></div>';
        },
        data: function() {
            return {
                exp_stage: 'math_practice',
                trial_info: 'result',
                prob_id: practice_math_problems[curr_prac_math].probid,
                prob_type: practice_math_problems[curr_prac_math].type, // difficulty
                correct: curr_correct
            };
        },
        on_finish: function(data) {
            curr_prac_math++;
            if (flag_debug) {
                if (curr_prac_math < practice_math_problems.length) {
                    let answer = parseInt(practice_math_problems[curr_prac_math].num1) * parseInt(practice_math_problems[curr_prac_math].num2);
                    console.log("Up next: ", answer);
                }
            }
        }
    };
    sequence_math_practice.push(feedback_page);
}

/*
maadm_experiment.push({
    timeline: sequence_math_practice
});
//*/



/* Solve screening problems (24) without feedback */

screening_problems = shuffle(screening_problems);

var sequence_screening = [];

var enter_screening_page = {
    type: "text",
    cont_key: [13, 32], // space bar
    text: "<div class = centerbox><p class = block-text>" +
        "Now, you will be presented with 24 math and word problems. " +
        "Please solve them as accurate as possible. " +
        "However, you will not receive accuracy feedback.</p> " +
        "<p class = block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> to begin a problem.</p></div>",
    data: {
        exp_stage: 'screening_block_start'
    },
    timing_post_trial: 1000
};
sequence_screening.push(enter_screening_page);

for (var ii = 0; ii < screening_problems.length; ii++) {

    var problem_page = {
        type: 'single-stim-rev',
        is_html: true,
        timing_response: time_psolve,
        minimum_duration: mindur_psolve,
        choices: ['i', 'o', 'p'], // 73, 79, 80
        stimulus: function() {
            curr_probcate = screening_problems[curr_screening].type;
            if (curr_probcate == "m1") {
                return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                    "to make the equation correct within 7 seconds. " +
                    "Use 'i', 'o', 'p' key to choose from the left, middle, and right option. " +
                    "If the key doesn't work, just press the same key multiple times. " +
                    debugProblemHTML(screening_problems[curr_screening]) + "</p>" +
                    generateProblemHTML('math', screening_problems[curr_screening]) + "</div>";
            } else if (curr_probcate == "w1") {
                return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                    "to make a correct English word within 7 seconds. " +
                    "Some letters were replaced with tildes (~) to make problems harder. " +
                    "Use 'i', 'o', 'p' key to choose from the left, middle, and right letter. " +
                    "If the key doesn't work, just press the same key multiple times. " +
                    debugProblemHTML(screening_problems[curr_screening]) + "</p>" +
                    generateProblemHTML('word', screening_problems[curr_screening]) + "</div>";
            } else {
                console.log("Error(screening_problem): unrecognizable curr_probcate.");
                return "Error(screening_problem): unrecognizable curr_probcate.";
            }
        },
        timing_post_trial: 0,
        on_finish: function(data) {
            // evaluate the response
            if (mapKey(data.key_press) == screening_problems[curr_screening].answer) {
                curr_correct = true;
            } else {
                curr_correct = false;
            }
        }
    };
    sequence_screening.push(problem_page);

    var feedback_page = {
        type: 'text',
        cont_key: [13, 32], // space bar
        timing_post_trial: 1000, // give a 1-sec break
        text: function() {
            let next_string = "You have " + (screening_problems.length - curr_screening - 1).toString() + " problems to go."
            if (curr_probcate == "m1") {
                if (curr_correct) {
                    correct_math++;
                }
                return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                    "to make the equation correct within 7 seconds. " +
                    "Use 'i', 'o', 'p' key to choose from the left, middle, and right option. " +
                    "If the key doesn't work, just press the same key multiple times. " +
                    debugProblemHTML(screening_problems[curr_screening]) + "</p>" +
                    '<p class = center-block-text><br><br>' + next_string + '</p>' +
                    '<p class = center-block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> key to start the next trial.</p></div>';
            } else if (curr_probcate == "w1") {
                if (curr_correct) {
                    correct_word++;
                }
                return "<div class = centerbox><p class = block-text>Fill in the <font color=blue>blue box</font> " +
                    "to make a correct English word within 7 seconds. " +
                    "Some letters were replaced with tildes (~) to make problems harder. " +
                    "Use 'i', 'o', 'p' key to choose from the left, middle, and right letter. " +
                    "If the key doesn't work, just press the same key multiple times. " +
                    debugProblemHTML(screening_problems[curr_screening]) + "</p>" +
                    '<p class = center-block-text><br><br>' + next_string + '</p>' +
                    '<p class = center-block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> key to start the next trial.</p></div>';
            } else {
                console.log("Error(screening_feedback): unrecognizable curr_probcate.");
                return "Error(screening_feedback): unrecognizable curr_probcate.";
            }
        },
        on_finish: function() {
            curr_screening++;
            if (flag_debug) {
                console.log(curr_screening, correct_math, correct_word);
            }
        }
    };
    sequence_screening.push(feedback_page);
}

var finish_screening_page = {
    type: "text",
    cont_key: [13, 32], // space bar
    text: "<div class = centerbox><p class = block-text><span class='very-large'>You solved all problems.</span></p>" +
        "<p class = block-text>Press <strong>Enter</strong> or <strong>Space bar</strong> key to finish the problem-solving.</p>" +
        "</div>",
    timing_post_trial: 1000,
    data: {
        exp_stage: 'screening_block_finish'
    },
    on_finish: function() {
        if (flag_debug) {
            console.log("Done! # of correct problems: ", correct_math, correct_word);
        }
    }
};
sequence_screening.push(finish_screening_page);
