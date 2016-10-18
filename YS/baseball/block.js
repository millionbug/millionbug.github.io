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
        define(["require", "exports", "../event", "../Sprite"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/10/14.
     */
    var event_1 = require("../event");
    var Sprite_1 = require("../Sprite");
    var block = (function (_super) {
        __extends(block, _super);
        function block(self) {
            _super.call(this);
            this.ClassName = "block";
            this.lev = 1;
            this.hit = 0;
            this.thisself(self);
        }
        block.prototype.thisself = function (self) {
            this.self = self;
        };
        block.prototype.update = function () {
            var ball = this.self.ball, bsx = this.x - this.w * 0.5 - ball.r, bex = bsx + this.w + ball.r, bsy = this.y - this.h * 0.5 - ball.r, bey = this.y + this.h * 0.5 + ball.r;
            if (ball.x >= bsx && ball.x <= bex && ball.y >= bsy && ball.y <= bey) {
                ++this.hit;
                this.self.fireEvent(new event_1.event(this, this.self, this.self.doBlockCollide));
            }
        };
        //更新动画
        block.prototype.updateAnim = function () {
            this.setCAnim("s" + (this.lev - this.hit));
        };
        //判断是否可以销毁
        block.prototype.canRelease = function () {
            return (this.hit == this.lev);
        };
        //获取分数
        block.prototype.getScore = function (lev) {
            return this.lev;
        };
        return block;
    }(Sprite_1.Sprite));
    exports.block = block;
});
//# sourceMappingURL=block.js.map