$(document).off('click', '.radiobox');
$(document).on('click', '.radiobox', function() {

    var sender = $(this);

    if (sender.hasClass('ticked'))
        sender.removeClass('ticked');
    else
        sender.addClass('ticked');
});


