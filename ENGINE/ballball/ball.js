var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../RenderObj"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/9/3.
     */
    var RenderObj_1 = require("../RenderObj");
    var ball = (function (_super) {
        __extends(ball, _super);
        function ball(name, r) {
            _super.call(this, name);
            this.r = r || 10;
            this.color = "black";
        }
        //重写父类方法
        ball.prototype.update = function () {
            var w = this.owner.w;
            var h = this.owner.h; //这个w,h命名没有看懂
            if (this.x < this.r || this.x > w - this.r) {
                this.dx = -this.dx;
            }
            if (this.y < this.r || this.y > h - this.r) {
                this.dy = -this.dy;
            }
            _super.prototype.update.call(this); //调用父类方法
        };
        //重写父类render方法
        ball.prototype.render = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r - 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.lineWidth = 2;
            //描边
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.stroke();
        };
        return ball;
    }(RenderObj_1.RenderObj));
    exports.ball = ball;
});
//# sourceMappingURL=ball.js.map