var doc = $(document);

doc.on('ready', function() {

    var gameArgs = {
        root: doc.find('body')
    }

    var game = new aj.game(gameArgs);
});
