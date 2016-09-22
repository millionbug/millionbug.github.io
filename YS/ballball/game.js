/**
 * Created by YangSir on 2016/9/4.
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../app"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     *
     * Created by YangSir on 2016/8/25.
     */
    var app_1 = require("../app");
    var g = new app_1.Game(false);
    var sc = g.sceneManager.createScene({ "name": "ballSceen", "w": 400, "h": 300 });
    for (var i = 0; i < 20; i++) {
        var obj = sc.createRObj("ball", { "name": "ball" + i, "r": 10 });
        obj.moveTo(15 * i, 15 * i); //这儿有一个类型出错了
        obj.dx = i;
        obj.dy = i;
    }
    g.run(15);
});
//# sourceMappingURL=game.js.map