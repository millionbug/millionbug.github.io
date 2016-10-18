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
        define(["require", "exports", "../Sprite", "../event"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Sprite_1 = require("../Sprite");
    var event_1 = require("../event");
    /**
     * Created by YangSir on 2016/10/14.
     */
    var ball = (function (_super) {
        __extends(ball, _super);
        function ball(arg) {
            _super.call(this);
            this.ClassName = "ball";
            this.thisself(arg.self, arg.r);
        }
        ball.prototype.thisself = function (self, r) {
            this.self = self;
            this.r = r;
        };
        ball.prototype.update = function () {
            var w = this.owner.w;
            var h = this.owner.h;
            this.h = 16;
            this.w = 16;
            //检测游戏中球的状态
            if (this.self.state == 0) {
                this.self.resetBall();
            }
            //到达边界改变速度方向
            if (this.x < this.r || this.x > (w - this.r)) {
                this.dx = (-this.dx);
            }
            if (this.y < this.r) {
                this.dy = (-this.dy);
            }
            if (this.y > this.self.stick.y) {
                this.self.fireEvent(new event_1.event(this, this.self, this.self.doLose));
            }
            _super.prototype.update.call(this);
        };
        return ball;
    }(Sprite_1.Sprite));
    exports.ball = ball;
});
//# sourceMappingURL=ball.js.map