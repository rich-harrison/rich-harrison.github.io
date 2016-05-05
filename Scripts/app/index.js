var doc = $(document);

doc.on('ready', function() {

    var root = doc.find('.pages');

    var args = {
        root: root
    }

    var pages = new aj.pages(args);
});
