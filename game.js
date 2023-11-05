
var buttonColors = ["red","blue","green","yellow"];
var userChosenPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function(){

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenPattern.length-1);
})

function nextSequence(){
  userChosenPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColor);
}

// step - 8
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]){
    console.log("success");

    // for next pattern
    if (userChosenPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    // console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3")
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");

  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
  }, 100);

}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
