(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../app", "../ResManager", "../Mario/Mario", "../ClassFactory", "../Images", "../frameRes"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/10/6.
     */
    var app_1 = require("../app");
    var ResManager_1 = require("../ResManager");
    var Mario_1 = require("../Mario/Mario");
    var ClassFactory_1 = require("../ClassFactory");
    var Images_1 = require("../Images");
    var frameRes_1 = require("../frameRes");
    ClassFactory_1.ClassFactory.regClass("Mario", Mario_1.Mario);
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