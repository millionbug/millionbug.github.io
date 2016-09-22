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
        define(["require", "exports", "../ClassFactory", "../Sprite", "../app", "../Frame"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/9/21.
     */
    var ClassFactory_1 = require("../ClassFactory");
    var Sprite_1 = require("../Sprite");
    var app_1 = require("../app");
    var Frame_1 = require("../Frame");
    var Mario = (function (_super) {
        __extends(Mario, _super);
        function Mario() {
            _super.apply(this, arguments);
        }
        Mario.prototype.update = function () {
            var w = this.owner.w;
            var h = this.owner.h;
            if (this.x < 20 || this.x > w - 20) {
                this.dx = -this.dx;
                this.isXFlip = (this.dx < 0);
            }
            _super.prototype.update.call(this);
        };
        return Mario;
    }(Sprite_1.Sprite));
    ClassFactory_1.ClassFactory.regClass("Mario", Mario);
    var g = new app_1.Game(false);
    //初始化游戏
    function initGame() {
        //获取场景管理器
        var scm = g.sceneManager;
        //创建场景
        var sc = scm.createScene({ "w": 640, "h": 400 });
        initRenderObj(sc);
    }
    //初始化创建精灵
    function initRenderObj(sc) {
        //设置跑步动画
        var runFrame = new Frame_1.Frame("run", document.getElementById("mr"));
        var crouchFrame = new Frame_1.Frame("crouch", document.getElementById("mr"));
        var jumpFrame = new Frame_1.Frame("jump", document.getElementById("mr"));
        //添加跑步帧
        for (var i = 0; i < 3; i++) {
            runFrame.add({ x: 32 * i, y: 0, w: 32, h: 32 });
        }
        //添加跳跃帧
        jumpFrame.add({ x: 0, y: 0, w: 32, h: 32 });
        jumpFrame.add({ x: 32 * 6, y: 0, w: 32, h: 32 });
        //添加蹲下帧
        crouchFrame.add({ x: 0, y: 0, w: 32, h: 32 });
        crouchFrame.add({ x: 32 * 14, y: 0, w: 32, h: 32 });
        //创建动画集合
        var anims = ClassFactory_1.ClassFactory.newInstance("Animation", {});
        anims.add("run", runFrame);
        anims.add("crouch", crouchFrame);
        anims.add("jump", jumpFrame);
        //创建30个mario
        for (var i = 0; i < 30; i++) {
            var mr = sc.createRObj("Mario", "mr");
            //设置随机位置
            mr.moveTo(parseInt(Math.random() * 400), parseInt(Math.random() * 400));
            //设置随机速度为0~3
            mr.dx = parseInt(Math.random() * 3 + 1);
            mr.setAnimSpeed(2 * Math.random());
            mr.w = mr.h = 64;
            mr.setAnims(anims, "run");
        }
    }
    initGame();
    g.run(-1);
});
//# sourceMappingURL=Mario.js.map