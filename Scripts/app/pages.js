var aj = {}

aj.pages = (function (args) {

    var me = this;
    me.root = args.root;
    me.pages = me.root.find('.page');
    me.init();
});

aj.pages.prototype = {

    init() {

        var me = this;
        var target = me.root.find('.page').first();
        me.initPage(target);
    },

    next(args) {

        var me = this;
        var current = me.pages.filter(':not(.hidden)');
        var target = current.next('.page');

        if (!target || target.length === 0) {
            target = me.pages.first();
        }

        current.addClass('hidden');
        target.removeClass('hidden');

        me.initPage(target, args);
    },

    goto(pageN, args) {
        var me = this;
        var current = me.pages.filter(':not(.hidden)');
        var target = $(me.pages[pageN]);

        current.addClass('hidden');
        target.removeClass('hidden');

        me.initPage(target, args);
    },

    initPage(target, args) {

        var me = this;

        var controllerName = target.attr('data-controller');

        var baseArgs = {
            root: target,
            pager: me
        }

        if (args)
            $.extend(baseArgs, args);

        var controller = window.aj[controllerName];
        new controller(baseArgs);
    }
}