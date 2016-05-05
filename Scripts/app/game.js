aj.game = (function (args) {

    var me = this;
    me.root = args.root;
    me.pager = args.pager;

    me.canvas;
    me.sizeX = 8,
    me.sizeY = 8,
    me.boxSizeX = 70,
    me.boxSizeY = 70,
    me.boxMargin = 10,
    me.tiles = new Array(),
    me.context,
    me.tileBackground,
    me.players = new Array(),
    me.currentPlayerTurn = 1;
    me.iAmPlayer = 1;
    me.dialog,
    me.playerCount = 4;
    me.orange = "#f05126";
    me.purple = "#422562";
    me.blue = "#51c5dc";
    me.pink = "#eb1378";
    me.green = '#d3dc26';
    me.red = '#c93149';

    $.extend(me, args);
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

        me.reset();
        me.renderBoard();
        me.initPlayers();
        me.initEvents();
    },

    reset() {

        var me = this;
        me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);
        executeRoll();
        me.resetDialog();
        me.root.find('.btn-roll-dice').text('Player 1 Roll Die');
    },

    initEvents() {

        var me = this;

        me.root.off('click');

        me.root.on('click', '.dialog .radiobox', function () {

            var sender = $(this);
            var currentPage = sender.closest('.dialog-page');
            var targetPageIndex = parseInt(currentPage.attr('data-page')) + 1;
            currentPage.fadeOut(function () {
                currentPage.siblings('.dialog-page[data-page="' + targetPageIndex + '"]').fadeIn();
            });
        });

        me.root.on('click', '.dialog .dialog-closer', function () {
            me.dialog.fadeOut(function () {
                me.resetDialog();
            });
        });

        me.root.on('click', '.btn-end-game', function () {
            me.pager.next();
        });

        me.root.on('click', '.btn-roll-dice', function () {
            me.rollDice($(this));
        });
    },

    rollDice(sender) {

        var me = this;

        var n = Math.floor(Math.random() * 6) + 1;

        me.dialog.fadeOut(function () {
            me.resetDialog();
            executeRoll(n);
        });

        setTimeout(function () {
            me.movePlayerByN(n, me.currentPlayerTurn);
            me.currentPlayerTurn++;
            if (me.currentPlayerTurn > me.players.length) {
                me.currentPlayerTurn = 1;
            }
            sender.text('Player ' + me.currentPlayerTurn + ' Roll Die');
        }, 3500);
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

    renderPlayer(tileNumber, playerNumber, redrawN) {

        var me = this;
        var newPos = me.tiles[tileNumber - 1];

        var playerColor = me.getColour(playerNumber);

        var occupierCount = 0;
        for (var p = 0; p < me.players.length; p++) {
            var player = me.players[p];
            if (player[1] === tileNumber && player[0] !== playerNumber)
                occupierCount++;
        }

        var offset = 40 / (occupierCount + 1) * (redrawN - 1);
        me.context.fillStyle = playerColor;
        me.context.lineWidth = "2";
        me.context.strokeStyle = "white";
        me.context.beginPath();
        me.context.arc(newPos[1] + 20 + offset, newPos[2] + 20 + offset, 15, 0, Math.PI * 2, true);
        me.context.fill();
        me.context.stroke();
        me.context.font = "14px Panton";
        me.context.fillStyle = "#ffffff";
        me.context.fillText(playerNumber, newPos[1] + 20 + offset, newPos[2] + 25 + offset);
        me.context.closePath();
    },

    getColour(n) {
        var me = this;
        switch (n) {
            case 1:
                return me.blue;
            case 2:
                return me.pink;
            case 3:
                return me.red;
            case 4:
                return me.green;
            case 5:
                return me.orange;
            case 6:
                return me.purple;
            default:
                return '#000000';
        }
    },

    isEven(n) {
        return n % 2 === 0;
    },

    movePlayerByN(n, playerNumber) {

        var me = this;

        var currentTile = me.players[playerNumber - 1][1];

        var target = currentTile + n;

        if (target > me.tiles.length) {
            target = target - me.tiles.length;
        }

        var curPos = me.tiles[currentTile - 1];

        me.renderTile(curPos[1], curPos[2], currentTile);

        me.players[playerNumber - 1][1] = target;

        var newPos = me.tiles[target - 1];
        me.renderTile(newPos[1], newPos[2], target);

        var redrawN = 0;
        for (var c = 0; c < me.players.length; c++) {
            var player = me.players[c];
            if (player[0] !== playerNumber && player[1] === target) {
                redrawN++;
                me.renderPlayer(player[1], player[0], redrawN);
            }
        }

        me.renderPlayer(target, playerNumber, redrawN + 1);

        var redrawN = 0;
        for (var c = 0; c < me.players.length; c++) {
            var player = me.players[c];
            if (player[0] !== playerNumber && player[1] === currentTile) {
                redrawN++;
                me.renderPlayer(player[1], player[0], redrawN);
            }
        }

        if (me.isEven(target) && playerNumber === me.iAmPlayer) {
            me.raiseEvent();
        }
    },

    initPlayers() {

        var me = this;
        var startPanel = 1;
        for (var i = 0; i < me.playerCount; i++) {
            var playerNumber = i + 1;
            me.players.push([playerNumber, startPanel]);
        }

        for (var x = 0; x < me.players.length; x++) {
            var player = me.players[x];
            me.renderPlayer(startPanel, player[0], player[0]);
        }
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
        me.dialog.hide();
    }
}