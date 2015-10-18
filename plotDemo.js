var PhaserGame = function (game) {
    this.bmd = null;

    this.points = {
        'x': [ 32, 128, 256, 384, 512, 608 ],
        'y': [ 240, 240, 240, 240, 240, 240 ]
    };

};

PhaserGame.prototype = {

    inti: function () {
        this.game.renderer.renderSession.roundPixels = true;
    },

    create: function() {
        this.stage.backgroundColor = '#204090';
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();
        this.mode = 0;
        this.changing = false;

        var py = this.points.y;

        for (var i = 0; i < py.length; i++)
        {
            py[i] = this.rnd.between(32, 432);
        }
        this.plot();
    },

    plot: function () {
        console.log("plot() mode: " + this.mode);
        this.bmd.clear();
        this.path = [];

        var x = 1 / this.game.width;

        for (var i = 0; i <= 1; i += x) {
            if (this.mode === 0){
                var px = this.math.linearInterpolation(this.points.x, i);
                var py = this.math.linearInterpolation(this.points.y, i);
            }
            else if (this.mode === 1) {
                var px = this.math.bezierInterpolation(this.points.x, i);
                var py = this.math.bezierInterpolation(this.points.y, i);
            }
            else if (this.mode === 2) {
                var px = this.math.catmullRomInterpolation(this.points.x, i);
                var py = this.math.catmullRomInterpolation(this.points.y, i);
            }

            this.path.push( { x: px, y: py });

            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
        }

        for (var p = 0; p < this.points.x.length; p++) {
            this.bmd.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
        }
    },

    changeMode: function () {
        this.mode++;

        if (this.mode === 3)
        {
            this.mode = 0;
        }

        if (this.mode === 0)
        {
            // this.hint.text = "Linear";
        }
        else if (this.mode === 1)
        {
            // this.hint.text = "Bezier";
        }
        else if (this.mode === 2)
        {
            // this.hint.text = "Catmull Rom";
        }
        this.plot();
    },

    update: function() {
        if (this.game.input.activePointer.isDown && !this.changing) {
            this.changeMode();
            this.changing = true;
        }
        if (this.changing && this.game.input.activePointer.isUp) {
            this.changing = false;
        }
    },
};