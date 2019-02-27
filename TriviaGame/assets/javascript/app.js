

var nbaQuestions = [
    {
        question: "Which player was the MVP of the 2005 NBA regular season?",
        choices: ['Kobe Bryant', 'LeBron James', 'Steve Nash', 'Kevin Garnett'],
        answer: 2,
        correct: 'Steve Nash'
    },
    {
        question: "During the 2011 NBA draft, which player was selected first overall?",
        choices: ['Kawhi Leonard', 'Kyrie Irving', 'Klay Thompson', 'Kemba Walker'],
        answer: 1,
        correct: 'Kyrie Irving'
    },
    {
        question: "What team was crowned NBA champions during the 2004 season?",
        choices: ['Los Angeles Lakers', 'San Antonio Spurs', 'Miami Heat', 'Detroit Pistons'],
        answer: 3,
        correct: 'Detroit Pistons'
    },
    {
        question: "Who led the NBA in scoring during the 2008 NBA regular season?",
        choices: ['LeBron James', 'Allen Iverson', 'Kobe Bryant', 'Carmelo Anthony'],
        answer: 0,
        correct: 'LeBron James'
    },
    {
        question: "The Boston Celtics have the most championships in NBA history with 17 titles. Which team takes the second spot with 16 NBA championships?",
        choices: ['Golden State Warriors', 'Chicago Bulls', 'Los Angeles Lakers', 'San Antonio Spurs'],
        answer: 2,
        correct: 'Los Angeles Lakers'
    },
    {
        question: "What player won the rookie of the year award during the 2013 NBA season?",
        choices: ['Damian Lillard', 'Bradley Beal', 'Anthony Davis', 'Andre Drummond'],
        answer: 0,
        correct: 'Damian Lillard'
    },
    {
        question: "Which city does not currently have an NBA franchise?",
        choices: ['New Orleans', 'Orlando', 'Seattle', 'Memphis'],
        answer: 2,
        correct: 'Seattle'
    },
    {
        question: "Which player won the defensive player of the year award during the 2018 NBA season?",
        choices: ['Paul George', 'Rudy Gobert', 'Kawhi Leonard', 'Draymond Green'],
        answer: 1,
        correct: 'Rudy Gobert'
    },
    {
        question: "Who is the youngest player in NBA history to make 500 three pointers?",
        choices: ['Stephen Curry', 'Damian Lillard', 'Kyrie Irving', 'D Angelo Russell'],
        answer: 3,
        correct: 'D Angelo Russell'
    },
    {
        question: "What team is the only franchise to overcome a 3-1 deficit in the NBA finals?",
        choices: ['Boston Celtics', 'Cleveland Cavaliers', 'Phoenix Suns', 'Utah Jazz'],
        answer: 1,
        correct: 'Cleveland Cavaliers'
    }
];

var questionCounter = 0;
var wins = 0;
var losses = 0;
var notAnswered = 0;

$(document).ready(function(){
    $(".start-screen").show();
    $("#main-content").hide();
    $(".scoreboard").hide();

})

var endGame = function () {
    $('.wins').text(wins);
    $('.losses').text(losses);
    $('.not-answered').text(notAnswered);
    $('#main-content').hide();
    $('.scoreboard').show();
}

var stop = function () {
    clearInterval(intervalId);

}

var setQuestion = function () {
    $(".question").text(nbaQuestions[questionCounter].question);
    $("#answer1").text(nbaQuestions[questionCounter].choices[0]);
    $("#answer2").text(nbaQuestions[questionCounter].choices[1]);
    $("#answer3").text(nbaQuestions[questionCounter].choices[2]);
    $("#answer4").text(nbaQuestions[questionCounter].choices[3]);
}

var questionTimer = function () {
    secondsLeft = 1;
    intervalId = setInterval(shotClock, 1000);
}

var runGame = function () {
    setQuestion();
    questionTimer();
    $('.answer').removeAttr('disabled');
}

var postTimer = function () {
    secondsLeft = 1;
    intervalId = setInterval(restClock, 1000);
    $('.answer').removeAttr('disabled');
}

var shotClock = function () {
    secondsLeft--;

    $('.timer').text(secondsLeft);
    if (secondsLeft === 0) {
        stop();
        notAnswered++;

        

        $('.answer').prop('disabled');

        $('.timer').text('Shot Clock Violation!');
        postTimer();
    }
}

var restClock = function () {
    secondsLeft--;

    $('.timer').text(secondsLeft);
    if (secondsLeft === 0) {
        stop();

        questionCounter++;
        if ((questionCounter + 1) > nbaQuestions.length) {
            endGame();
        }

        else {
            runGame();
        }
    }
};


$("#start-btn").click(function () {
    $(this).hide();
    $("#start-screen").hide();
    $("#main-content").show();
    runGame();
});

$(".answer").on('click', function () {
    $('.answer').prop('disabled');
    stop();
    postTimer();

    if (this.innerHTML !== nbaQuestions[questionCounter].correct) {
        $(this).addClass('wrong-answer');
        losses++;
        
    }

    if (this.innerHTML === nbaQuestions[questionCounter].correct) {
        wins++;
    }

    $(nbaQuestions[questionCounter].answer).addClass('right-answer').removeClass('wrong-answer');


})



$('#replay').on('click', function () {
    questionCounter = 0;
    wins = 0;
    losses = 0;
    notAnswered = 0;

    runGame();
})






