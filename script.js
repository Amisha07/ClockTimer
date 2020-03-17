let timerObj = {
    minute: 0,
    second: 0,
    timerId: 0
}

function soundAlarm() {
    let amount = 3;
    let audio = new Audio('Timer_Sound_Effect.mp3');

    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();

    }

    for(let i=0; i < amount; i++) {
        setTimeout(playSound, 1200 * i);

    }

}

function updateValue(key, value){
    if(value < 0) {
        value = 0;
        console.log("Positive numerbs only");
    }

    if(key == "second") {
        if(value < 10) {
            value = "0" + value;
        }

        if(value > 59) {
            value = 59;
        }
    }

    $("#" + key).html(value || 0);
    timerObj[key] = value;

}

(function detectChanges(key) {
   
    let input = "#" + key + "-input";

    $(input).change(function() {
        updateValue(key, $(input).val());
    });

    $(input).keyup(function() {
        updateValue(key, $(input).val());
    });

    return arguments.callee;

})("minute")("second");



function startTimer() {
      buttonManager(["start", false], ["pause", true], ["stop", true]);
      freezeInputs();
      timerObj.timerId = setInterval(function() {
            timerObj.second--;
            if(timerObj.second < 0) {
                if(timerObj.minute == 0) {
                    soundAlarm();
                    return stopTimer();
                }
            timerObj.second = 59;
            timerObj.minute--;  
            }
        updateValue("minute", timerObj.minute);
        updateValue("second", timerObj.second);   
      }, 1000);
}

function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInputs();
    
}

function pauseTimer() {
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    clearInterval(timerObj.timerId)
}





function buttonManager(...buttonsArray) {
    for(let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
        if (buttonsArray[i][1]) {
            $(button).removeAttr('disabled');
        } else {
            $(button).attr('disabled', 'disabled');
        }
    }
}


function freezeInputs() {
    $("#minute-input").attr('disabled', 'disabled');
    $("#second-input").attr('disabled', 'disabled');
}

function unfreezeInputs() {
    $("#minute-input").removeAttr('disabled', 'disabled');
    $("#second-input").removeAttr('disabled', 'disabled');
}