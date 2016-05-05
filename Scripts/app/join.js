aj.join = (function (args) {

    var me = this;
    me.root = args.root;
    me.pager = args.pager;
    me.rtc;
    me.sessionId;
    me.init();

    me.app_id = "203628";
    me.key = "536dab0091e8fceb7588";
    me.secret = "e6963fdb017951975b1e";
    me.cluster = "eu";
});

aj.join.prototype = {

    init() {

        var me = this;

        me.root.off('click');

        me.root.on('click', '.btn-start', function() {
            me.startGame();
        });

        me.root.on('click', '.btn-join', function () {
            me.joinGame();
        });
    },

    joinGame() {

        //var me = this;
        //var pusher = new Pusher(me.key, {
        //    cluster: me.cluster,
        //    authEndpoint: 'http://localhost:60876/home/pusher_auth'
        //});

        //var channel = pusher.subscribe('private-test');
        //var list = me.root.find('.particpants-list ul');

        //channel.bind('join', function (data) {
        //    alert(data.name);
        //});

        //channel.bind('client-join', function (data) {
        //    alert(data.name);
        //});

        //var username = me.root.find('#username').val();

        //channel.bind('pusher:subscription_succeeded', function(members) {

        //    members.each(function(member) {
        //        list.append('<li>' + member.id + '</li>');
        //    });

        //    channel.trigger('client-join', {
        //        name: username
        //    });
        //});
    },

    startGame() {

        var me = this;

        var gameArgs = {
            playerCount: 3,
            iAmPlayer: 2,
            rtc: me.rtc
        }

        me.pager.next(gameArgs);
    }
}