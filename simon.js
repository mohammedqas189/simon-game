var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var currentLevel = 0; 
var started = false; 

$(document).keypress( function () {
    if(!started){
        nextSequence(); 
        started = true; 
    }
});

$('.btn').click( function(){
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 
    flashButton(userChosenColor); 
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    console.log("Start of nextSequence")
    userClickedPattern = [];
    currentLevel++; 
    $("h1").text("Level " + currentLevel); 

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    flashButton(randomChosenColor);
}

function flashButton(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

function playSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play().catch( e => console.log("Audio play failed: ", e));
}
function checkAnswer(index){
    if(gamePattern[index] === userClickedPattern[index]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout( function(){
                nextSequence();  
            }, 1500);
        }
    } else{
        startOver();    
        $("body").addClass("game-over"); 
        setTimeout( function(){
                $("body").removeClass("game-over");
        }, 200);
        playSound("wrong")

    }
}
function startOver() {
    currentLevel = 0;
    gamePattern = [];
    started = false;
    $("h1").text("Game Over, Press Any Key to Restart");
}