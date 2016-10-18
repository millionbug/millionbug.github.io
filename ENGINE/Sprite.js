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
        define(["require", "exports", "./RenderObj", "./Frame"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/9/20.
     */
    var RenderObj_1 = require("./RenderObj");
    var Frame_1 = require("./Frame");
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(name) {
            _super.call(this, name);
            //是否水平翻转
            this.isXFlip = false;
            //是否垂直翻转
            this.isYFlip = false;
            this.scaleX = 1;
            this.scaleY = 1;
            this.anims = null;
            this.animsCtrl = new Frame_1.frameCtrl();
        }
        //设置帧动画集合对象
        Sprite.prototype.setAnims = function (animations, currAnimName) {
            var currAnimName = currAnimName || "def"; //为什么这儿可以是通用“||”
            this.anims = animations;
            this.animsCtrl.setAnims(animations, currAnimName);
        };
        //设置动画集
        Sprite.prototype.addAnim = function (name, farmes, isCurrent) {
            this.anims.add(name, frames);
            isCurrent && this.animsCtrl.setCurrent(name);
        };
        //删除指定名称的动作
        Sprite.prototype.removeAnims = function (name) {
            this.anims.remove(name);
        };
        //按名称设定当前动作
        Sprite.prototype.setCAnim = function (name) {
            this.animsCtrl.setCurrent(name);
        };
        //设置动画的速度
        Sprite.prototype.setAnimSpeed = function (sp) {
            this.animsCtrl.speed = sp;
        };
        //按名称获取动作
        Sprite.prototype.getAnim = function (name) {
            return this.anims.get(name);
        };
        //获取当前运行的动画
        Sprite.prototype.getCurrentAnim = function () {
            return this.animsCtrl.getCurrent();
        };
        //获取当前运行的帧
        Sprite.prototype.getCurrFrame = function () {
            return this.animsCtrl.getCurrFrame();
        };
        //获取下一帧
        Sprite.prototype.getNextFrame = function () {
            return this.animsCtrl.getNextFrame();
        };
        //渲染方法，每一帧调用，ctx是canvas环境
        Sprite.prototype.render = function (ctx) {
            ctx.translate(this.x, this.y);
            var hw = 0.5 * this.w;
            var hh = 0.5 * this.h;
            var scaleX = (this.isXFlip) ? -this.scaleX : this.scaleX;
            var scaleY = (this.isYFlip) ? -this.scaleY : this.scaleY;
            if (this.deg !== 0) {
                ctx.rotate(this.deg * 0.017453292); //一个转换公式
            }
            ctx.scale(scaleX, scaleY);
            var f = this.getNextFrame();
            ctx.drawImage(f.img, f.x, f.y, f.w, f.h, -hw, -hh, this.w, this.h);
        };
        return Sprite;
    }(RenderObj_1.RenderObj));
    exports.Sprite = Sprite;
});
//# sourceMappingURL=Sprite.js.map