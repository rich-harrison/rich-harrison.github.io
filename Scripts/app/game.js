var aj = {}

aj.game = (function (args) {

    var me = this;
    me.root = args.root;
    me.canvas;
    me.sizeX = 8,
    me.sizeY = 8,
    me.boxSizeX = 70,
    me.boxSizeY = 70,
    me.boxMargin = 10,
    me.tiles = new Array(),
    me.context,
    me.tileBackground,
    me.playerCurrentTile = 1,
    me.player,
    me.playerPosX = 45,
    me.playerPosY = 45,
    me.dialog,
    me.orange = "#f05126";
    me.purple = "#422562";
    me.blue = "#51c5dc";
    me.init();
});

aj.game.prototype = {

    init() {

        var me = this;
        me.canvas = me.root.find('#canvas1')[0];
        me.canvas.width = 650;
        me.canvas.height = 750;
        me.context = me.canvas.getContext("2d");
        me.dialog = me.root.find('.dialog');
        me.tiles = new Array();

        me.renderBoard();
        me.initPlayer();
        me.initDice();
        me.initEvents();
    },

    initEvents() {

        var me = this;

        me.root.on('click', '.dialog .radiobox', function() {

            var sender = $(this);
            var currentPage = sender.closest('.dialog-page');
            var targetPageIndex = parseInt(currentPage.attr('data-page')) + 1;
            currentPage.fadeOut(function() {
                currentPage.siblings('.dialog-page[data-page="' + targetPageIndex + '"]').fadeIn();
            });
        });

        me.root.on('click', '.dialog .dialog-closer', function() {
            me.dialog.fadeOut(function() {
                me.resetDialog();
            });
        });
    },

    initDice() {
        var me = this;
        me.root.on('click', '.roll-button', function() {
            var n = Math.floor(Math.random() * 6) + 1;
            executeRoll(n);
            me.movePlayerByN(n);
        });
    },

    renderBoard() {

        var me = this;

        me.renderBrandName();

        var curX = 0;
        var curY = 0;
        var curTile = 1;

        curY += me.boxMargin;

        for (var x = 0; x < me.sizeX; x++) {

            curX += me.boxMargin;
            me.renderTile(curX, curY, curTile);
            me.registerNewTileCreated(curX, curY);
            curTile++;

            if (x < me.sizeX - 1)
                curX += me.boxSizeX;
        }

        for (var y = 0; y < me.sizeY; y++) {

            curY += me.boxMargin;
            curY += me.boxSizeY;
            me.renderTile(curX, curY, curTile);
            me.registerNewTileCreated(curX, curY);
            curTile++;
        }

        for (var xx = 0; xx < me.sizeX - 1; xx++) {

            curX -= me.boxSizeX;
            curX -= me.boxMargin;
            me.renderTile(curX, curY, curTile);
            me.registerNewTileCreated(curX, curY);
            curTile++;
        }

        for (var yy = 0; yy < me.sizeY - 1; yy++) {

            curY -= me.boxMargin;
            curY -= me.boxSizeY;
            me.renderTile(curX, curY, curTile);
            me.registerNewTileCreated(curX, curY);
            curTile++;
        }
    },

    renderBrandName() {

        var me = this;
        me.context.font = "92px Panton";
        me.context.fillStyle = "#51c5dc";
        me.context.translate(240, 480);
        me.context.rotate(45 * -(Math.PI / 180));
        me.context.textAlign = "center";
        me.context.fillText("Amberplay", 150, 0);
        me.context.rotate(-45 * -(Math.PI / 180));
        me.context.translate(-240, -480);
    },

    renderTile(x, y, curTile) {

        var me = this;
        me.context.beginPath();
        me.context.lineWidth = "1";
        me.context.fillStyle = me.isEven(curTile) ? me.purple : me.orange;
        me.context.strokeStyle = "white";
        me.context.rect(x, y, me.boxSizeX, me.boxSizeY);
        me.context.fill();
        me.context.stroke();
    },

    registerNewTileCreated(x, y, curTile) {
        var me = this;
        var coords = [curTile, x, y];
        me.tiles.push(coords);
        curTile++;
    },

    renderPlayer(tileNumber) {

        var me = this;
        var newPos = me.tiles[tileNumber - 1];

        me.context.fillStyle = me.blue;
        me.context.lineWidth = "3";
        me.context.strokeStyle = "white";
        me.context.beginPath();
        me.context.arc(newPos[1] + 35, newPos[2] + 35, 20, 0, Math.PI * 2, true);
        me.context.fill();
        me.context.stroke();
        me.context.closePath();
    },

    isEven(n) {
        return n % 2 === 0;
    },

    movePlayerByN(n) {

        var me = this;

        me.dialog.fadeOut();

        setTimeout(function () {

            var target = me.playerCurrentTile + n;

            if (target > me.tiles.length) {
                target = target - me.tiles.length;
            }

            var curPos = me.tiles[me.playerCurrentTile - 1];

            me.renderTile(curPos[1], curPos[2], me.playerCurrentTile);

            me.renderPlayer(target);

            me.playerCurrentTile = target;

            if (me.isEven(me.playerCurrentTile)) {
                me.raiseEvent();
            }
        }, 3500);
    },

    initPlayer() {

        var me = this;
        me.renderPlayer(1);
    },

    raiseEvent() {
        var me = this;
        me.dialog.fadeIn();
    },

    resetDialog() {
        var me = this;
        me.dialog.find('.radiobox.ticked').removeClass('ticked');
        me.dialog.find('.dialog-page').hide();
        me.dialog.find('.dialog-page[data-page="1"]').show();
    }
}