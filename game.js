var buttonColours = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


// Starting the game
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// logging user clicks
$(".btn").click(function(){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});


// Check the pattern
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
  }
  else{
    console.log("wrong");

    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}


// forming a colour sequence
function nextSequence(){

  userClickedPattern = [];

  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  chosenButtonID = "#" + randomChosenColour;
  $(chosenButtonID).fadeOut(150).fadeIn(150);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

}


// Restart game
function startOver(){

  level = 0;

  gamePattern = [];

  started = false;
  
}


// sounds for all boxes
function playSound(name){

  var colorAudio = new Audio("sounds/" + name + ".mp3");
  colorAudio.play();

}


// Animation when player clicks
function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
