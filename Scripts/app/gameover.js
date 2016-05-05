aj.gameover = (function (args) {

    var me = this;
    me.root = args.root;
    me.pager = args.pager;
    me.init();
});

aj.gameover.prototype = {

    init() {

        var me = this;

        me.root.off('click');

        me.root.on('click', '.btn-play-again', function () {
            me.playAgain();
        });
    },

    playAgain() {

        var me = this;

        me.pager.goto(0);
    }
}