(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./FrameState", "./ClassFactory"], factory);
    }
})(function (require, exports) {
    "use strict";
    var FrameState_1 = require("./FrameState");
    var ClassFactory_1 = require("./ClassFactory");
    /**
     * Created by YangSir on 2016/8/25.
     */
    var Game = (function () {
        function Game(pause) {
            this.FrameStateBody = FrameState_1.FrameState;
            this.sceneManager = ClassFactory_1.ClassFactory.newInstance("sceneManager", {});
            //保存所有监听器
            this.listeners = [];
            this.paused = false;
        }
        //添加监听器
        Game.prototype.addLitener = function (ln) {
            this.listeners.push(ln);
        };
        //删除所有监听器
        Game.prototype.clearListener = function (ln) {
            this.listeners.length = 0;
        };
        //游戏的主循环
        Game.prototype.mainloop = function () {
            //执行游戏主循环
            var lns = this.listeners;
            for (var i = 0, len = lns.length; i < len; i++) {
                lns[i].enabled && lns[i].onBeforeRender();
            }
            var scene = this.sceneManager.getCurrentScene();
            if (scene) {
                scene.update();
                scene.render();
            }
            for (var i = 0, len = lns.length; i < len; i++) {
                lns[i].enabled && lns[i].onAfterRender();
            }
        };
        //执行游戏
        Game.prototype.run = function (fps) {
            fps = fps || 60;
            var spf = (1000 / fps) | 0;
            var self = this;
            this.FrameStateBody.start();
            self.tHand = setInterval(function () {
                if (!self.paused) {
                    self.mainloop();
                    self.FrameStateBody.update();
                }
            }, spf);
        };
        Game.prototype.stop = function () {
            clearInterval(this.tHand);
        };
        return Game;
    }());
    exports.Game = Game;
});
//# sourceMappingURL=app.js.map