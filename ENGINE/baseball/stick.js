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
        define(["require", "exports", "../Sprite", "../FrameState", "../event"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     *
     * Created by YangSir on 2016/10/14.
     */
    var Sprite_1 = require("../Sprite");
    var FrameState_1 = require("../FrameState");
    var event_1 = require("../event");
    var stick = (function (_super) {
        __extends(stick, _super);
        function stick(arg) {
            _super.call(this);
            this.w = arg.w;
            this.h = arg.h;
            this.self = arg.self;
        }
        stick.prototype.update = function () {
            var w = this.owner.w;
            var hw = this.w * 0.5;
            if (FrameState_1.Key.pressed(FrameState_1.Key.SPACE)) {
                //开始游戏
                console.log("space");
                if (this.self.state == 0) {
                    this.self.launchBall();
                }
            }
            if (FrameState_1.Key.pressed(FrameState_1.Key.A) && this.x > hw) {
                this.move(-5, 0);
            }
            if (FrameState_1.Key.pressed(FrameState_1.Key.D) && this.x < (w - hw)) {
                this.move(5, 0);
            }
            var ball = this.self.ball, bsx = this.x - this.w * 0.5 - ball.r, bex = bsx + this.w + ball.r, bsy = this.y - this.h * 0.5 - ball.r, bey = this.y + this.h * 0.5 + ball.r;
            if (ball.x >= bsx && ball.x <= bex && ball.y >= bsy && ball.y <= bey) {
                this.self.fireEvent(new event_1.event(this, this.self, this.self.doStickCollide));
            }
        };
        return stick;
    }(Sprite_1.Sprite));
    exports.stick = stick;
});
//# sourceMappingURL=stick.js.map