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
        define(["require", "exports", "../app", "../ResManager", "../ClassFactory", "../Images", "../frameRes", "../Sprite"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/10/6.
     */
    var app_1 = require("../app");
    var ResManager_1 = require("../ResManager");
    var ClassFactory_1 = require("../ClassFactory");
    var Images_1 = require("../Images");
    var frameRes_1 = require("../frameRes");
    var Sprite_1 = require("../Sprite");
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
    exports.Mario = Mario;
    ClassFactory_1.ClassFactory.regClass("Mario", Mario);
    var g = new app_1.Game(false);
    exports.Res = new ResManager_1.ResManager();
    exports.Res.regResType("images", new Images_1.Images());
    exports.Res.regResType("frame", new frameRes_1.frameRes());
    function initGame() {
        //获取场景管理器
        var scm = g.sceneManager;
        //创建场景
        var sc = g.sceneManager.createScene({ "w": 400, "h": 400 });
        loadRes(sc);
    }
    //加载资源
    function loadRes(scene) {
        exports.Res.loadRes("res.json", function (data) {
            //创建精灵
            initRenderObj(scene);
            //开始飞奔
            g.run(20);
        });
    }
    //初始化创建精灵
    function initRenderObj(sc) {
        //创建30个mario
        for (var i = 0; i < 30; i++) {
            var mr = sc.createRObj("Mario", "mr");
            //设置随机位置
            mr.moveTo(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
            //设置随机速度
            mr.dx = Math.floor((Math.random() + 1) * 3) - 1;
            mr.setAnimSpeed(2 * Math.random());
            mr.w = mr.h = 64;
            //获取Mario动画序列资源
            var anims = exports.Res.getAnimationsByName("sprite", "mario");
            mr.setAnims(anims, "run");
        }
    }
    //初始化游戏
    initGame();
});
//# sourceMappingURL=game.js.map