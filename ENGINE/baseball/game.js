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
        define(["require", "exports", "../app", "../event", "../ResManager", "../Images", "../frameRes", "../ResManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     *
     * Created by YangSir on 2016/10/9.
     */
    var app_1 = require("../app");
    var event_1 = require("../event");
    var ResManager_1 = require("../ResManager");
    var Images_1 = require("../Images");
    var frameRes_1 = require("../frameRes");
    var ResManager_2 = require("../ResManager");
    var Res = new ResManager_1.ResManager();
    Res.regResType("images", new Images_1.Images());
    Res.regResType("frame", new frameRes_1.frameRes());
    var g = new app_1.Game(false);
    var stickGame = (function (_super) {
        __extends(stickGame, _super);
        function stickGame() {
            _super.call(this, false);
            this.cfg = null;
            this.ball = null;
            this.stick = null;
            this.state = -1;
            var scm = this.sceneManager;
            var x = (document.body.clientWidth - 400) * 0.5;
            var tSC = scm.createScene([{ "x": x, "w": 400, "h": 500, "name": "title" }]);
            var mSC = scm.createScene([{ "color": "gray", "x": x, "w": 400, "h": 500, "name": "main" }]);
            var eSC = scm.createScene([{ "x": x, "w": 400, "h": 500, "name": "end" }]);
            this.initTSC(tSC);
            this.initMSC(mSC);
            this.initESC(eSC);
            this.initListener();
            this.showScene("title");
            //¼ÓÔØ×ÊÔ´
            this.loadRes();
            this.run(60);
        }
        stickGame.prototype.loadRes = function () {
            var self = this;
            var scm = this.sceneManager;
            var sc = scm.getScene("main");
            Res.loadRes("res.json", function () {
                //注意所有地方的加载最后都是通过这个函数使用jquery的ajax请求加载的。
                ResManager_2.ResUtil.loadFile("gamecfg.json", function (data) {
                    self.cfg = data;
                    self.showMain();
                });
            }, function (total, cur) {
                var pro = (cur / total) * 100 | 0;
                $("#pTxt").text("Loading:" + pro + "%");
                $("#pBar").width(pro * 3);
            });
        };
        //
        stickGame.prototype.showMain = function () {
            this.loadCfg();
            this.showScene("main");
        };
        //
        stickGame.prototype.loadCfg = function () {
            var self = this, sc = this.sceneManager.getScene("main");
            function createStick(sc) {
                var cfg = self.cfg.stick;
                var st = sc.createRObj("stick", ["stick"]);
                st.w = cfg.w;
                st.h = cfg.h;
                var mx = sc.w * 0.5;
                st.moveTo(mx, sc.h - 30);
                var anims = ResManager_1.ResManager.getAnimationsByName(cfg.resName, cfg.fName);
                st.setAnims(anims);
                self.stick = st;
            }
            function createBall(sc) {
                var cfg = self.cfg.ball;
                var ball = sc.createRObj("ball", ["ball", cfg.r]);
                self.ball = ball;
                var anims = ResManager_1.ResManager.getAnimationsByName(cfg.resName, cfg.fName);
                ball.setAnims(anims);
            }
            createStick(sc);
            createBall(sc);
            this.loadLevel();
        };
        //展示对应场景
        stickGame.prototype.showScene = function (name) {
            var sc = this.sceneManager.getScene(name);
            this.sceneManager.bringToTop(sc);
        };
        stickGame.prototype.initTSC = function (sc) {
            //创建UI,创建加载进度条
            var pBar = $("<div id='pCBar' style='position:absolute;" +
                "border-radius:3px;border:2px;solid;yellow;" +
                "left:50px;top:245px;height:10px;width:300px;'></div>");
            pBar.append("<div id='pBar' style='position:absolute;" +
                "left:0px;top:0px;overflow:hidden;" +
                "background-color:#ff4b29;width:1px'></div>");
            sc.holder.append("<div id='pBar' style='text-align:center;" +
                "position:absolute;font-size:26px;color:white;" +
                "height:40px;width:400px;top:210px;'>Loading...</div>");
            sc.holder.append(pBar);
        };
        stickGame.prototype.initMSC = function (sc) {
            //创建UI
            sc.holder.append("<div id='pLifeTxt' style='text-align:left;" +
                "position:absolute;font-size:26px;color:red;" +
                "height:40px;width:130px;left:10px'>Life:0</div>");
            sc.holder.append("<div id='pLevTxt' style='text-align:left;" +
                "position:absolute;font-size:26px;color:red;" +
                "height:40px;width:130px;left:150px'>Level:1</div>");
            sc.holder.append("<div id='pScTxt' style='text-align:left;" +
                "position:absolute;font-size:26px;color:red;" +
                "height:40px;width:130px;left:290px'>Score:000</div>");
        };
        stickGame.prototype.initEsc = function (eSC) {
            //创建UI
            var sc = eSC;
            sc.holder.append("<div id='pEndTxt' style='text-align:center;fonct-size:35" +
                "position:absolute;border-radius:3px;color:white;left:50px;top: 245px;" +
                "height:10px;width:300px;'>GOOD GAME</div>");
        };
        //初始化监听器
        stickGame.prototype.initListener = function () {
            var self = this;
            //增加监听器
            var ltn = new event_1._appEventListener({
                enabled: true,
                onAfterRender: function () {
                    self.updateUI();
                    return;
                },
                onBeforeRender: function () {
                    return;
                }
            });
            this.addListener(ltn);
        };
        return stickGame;
    }(app_1.Game));
});
//# sourceMappingURL=game.js.map