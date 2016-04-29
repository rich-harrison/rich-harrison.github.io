function executeRoll(value) {

    var dice = $('#dice');

    for (i = 1; i < 7; i++) {
        classString = "roll-" + i;
        dice.removeClass(classString);
    }

    dice.addClass("roll-null");

    setTimeout(function () {
        dice.removeClass("roll-null");
        dice.addClass("roll-" + value);
    }, 1500);
}
