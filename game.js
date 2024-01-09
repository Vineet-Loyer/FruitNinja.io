var playing = false;
var trials;
var score;
var step;
var action; //used for set interval fucntion
var fruit = ['applefu', 'bananafu', 'blueberryfu', 'cherriesfu', 'grapesfu', 'mangofu', 'orangefu', 'pineapplefu', 'watermellonfu'];
//are we already playing?
$(function() {
    $("#startreset").click(function() {
        remove("playzone");
        remove("instruction");
        //are we playing 
        //yes 
        //reload page
        if (playing == true) {
            location.reload();
        } else {


            //no not playing
            playing = true; //game initiated
            score = 0;
            $("#score").html("Score:" + score);
        }
        //show trials left
        $("#trialsLeft").show();
        trials = 3;
        addHeart(trials);
        $("#gameOver").hide();
        //button text to reset game
        $("#startreset").html("Reset Game");
        startAction();
    });

    //1. create random fruit

    //2. move fruit down 1 step
    //  if( is fruit too low)
    //   {
    //       if(any trials left)
    //       {
    //           remove one heart
    //      }
    //       else
    //       {
    //           show game over
    //           and change button text to start game
    //       }
    //   }
    //   else{
    //       goto step 2
    //   }
    //3. change button text to reset game
    //4. show trials left box

    //other functions
    //1. slice fruit

    $("#fruit1").mouseover(function() {
        score++;
        $("#score").html(score);
        var audio = new Audio('sounds/slice.mp3'); //2. play sound on slice
        audio.play();

        //make fruit stop going down
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 200); //slice fruit
        //send new fruit
        setTimeout(startAction, 500);

    });

    //3. increase score by one
    function addHeart(t) {
        $("#trialsLeft").empty();
        for (var i = 0; i < t; i++) {
            $("#trialsLeft").append('<i class="fa-solid fa-heart-pulse"></i>');
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit(); //chooses ranodom fruit
        //random placement of fruit in playzone 1 to 500px(as fruit size is 100px)
        var left = Math.round(Math.random() * 500 + 1);
        $("#fruit1").css({
            'left': left,
            'top': -50
        });
        //generate step
        step = Math.round(Math.random() * 5 + 1);
        //move fruit every 10ms
        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + step); //original value +step
            //if the fruit is too low
            if ($("#fruit1").position().top > $("#playzone").height()) {
                //check trials left
                if (trials > 1) {
                    $("#fruit1").show();
                    chooseFruit(); //chooses ranodom fruit
                    //random placement of fruit in playzone 1 to 500px(as fruit size is 100px)
                    var left = Math.round(Math.random() * 500 + 1);
                    $("#fruit1").css({
                        'left': left,
                        'top': -50
                    });
                    //generate step
                    step = Math.round(Math.random() * 5 + 1);

                    //reduce number of trials by one
                    --trials;
                    //show trials in box
                    addHeart(trials);

                } else {
                    //gameover
                    playing = false; //as not playing anymore
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                    add("playzone");
                    add("instruction");

                }
            }
        }, 10);



    }

    function chooseFruit() {
        var randomNu = Math.round(Math.random() * 8);
        $("#fruit1").attr('src', 'img/' + fruit[randomNu] + '.png');
    }

    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }

    function add(Id) {
        document.getElementById(Id).classList.add("blur");
    }

    function remove(Id) {
        document.getElementById(Id).classList.remove("blur");
    }
});
