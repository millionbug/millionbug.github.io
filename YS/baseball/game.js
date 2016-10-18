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
        define(["require", "exports", "../app", "../event", "../ResManager", "../Images", "../frameRes", "../frameRes"], factory);
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
    var frameRes_2 = require("../frameRes");
    var Res = new ResManager_1.ResManager();
    Res.regResType("image", new Images_1.Images());
    Res.regResType("frame", new frameRes_1.frameRes());
    var g = new app_1.Game(false);
    var stickGame = (function (_super) {
        __extends(stickGame, _super);
        function stickGame() {
            _super.call(this, false);
            //配置
            this.cfg = null;
            this.ball = null;
            //挡板对象
            this.stick = null;
            //游戏状态
            this.state = -1;
            var scm = this.sceneManager;
            var x = (document.body.clientWidth - 400) * 0.5;
            var tSC = scm.createScene({ "x": x, "w": 400, "h": 500, "name": "title" });
            var mSC = scm.createScene({ "color": "gray", "x": x, "w": 400, "h": 500, "name": "main" });
            var eSC = scm.createScene({ "x": x, "w": 400, "h": 500, "name": "end" });
            this.initTSC(tSC);
            this.initMSC(mSC);
            this.initESC(eSC);
            this.initListener();
            this.showScene("title");
            this.loadRes();
            this.run(60);
        }
        stickGame.prototype.initTSC = function (sc) {
            //创建UI,创建加载进度条
            var pBar = $("<div id='pCBar' style='position:absolute;" +
                "border-radius:3px;border:2px solid yellow;" +
                "left:50px;top:245px;height:10px;width:300px;'></div>");
            pBar.append("<div id='pBar' style='position:absolute;" +
                "left:0px;top:0px;overflow:hidden;" +
                "background-color:#ff4b29;width:1px'></div>");
            sc.holder.append("<div id='pTxt' style='text-align:center;" +
                "position:absolute;font-size:26px;color:black;" +
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
        stickGame.prototype.initESC = function (eSC) {
            //创建UI
            var sc = eSC;
            sc.holder.append("<div id='pEndTxt' style='text-align:center;fonct-size:35" +
                "position:absolute;border-radius:3px;color:blue;left:50px;top: 245px;" +
                "height:10px;width:300px;'>GOOD GAME</div>");
        };
        //初始化监听器
        stickGame.prototype.initListener = function () {
            var self = this;
            //增加监听器
            var ltn = new event_1._appEventListener({
                enabled: true,
                onAfterRender: function () {
                    if (self.cfg.blockNum == 0) {
                        if (self.cfg.maxLev == self.cfg.level) {
                            self.showSuccess();
                        }
                        else {
                            self.cfg.level++;
                            self.loadLevel();
                        }
                    }
                    self.updateUI();
                },
                onBeforeRender: function () {
                    return;
                }
            });
            this.addListener(ltn);
        };
        //复位游戏
        stickGame.prototype.resetGame = function () {
            this.resetBall();
            this.state = 0;
        };
        //重置球的位置
        stickGame.prototype.resetBall = function () {
            this.ball.moveTo(this.stick.x, this.stick.y - (this.stick.h + this.ball.h) * 0.5 + 1);
            //this.ball.dx = this.ball.dy = 0;
        };
        //展示对应场景
        stickGame.prototype.showScene = function (name) {
            var sc = this.sceneManager.getScene(name);
            this.sceneManager.bringToTop(sc);
        };
        //处理触发的事件
        stickGame.prototype.fireEvent = function (e) {
            e.exec();
        };
        //
        //开始游戏
        stickGame.prototype.launchBall = function () {
            this.ball.dx = 5;
            this.ball.dy = -5;
            this.state = 1;
        };
        //处理碰撞事件
        stickGame.prototype.doStickCollide = function () {
            this.ball.dy = -this.ball.dy;
            //新的变化没有规划
        };
        //处理碰撞事件
        stickGame.prototype.doBlockCollide = function (sender) {
            this.ball.dy = -this.ball.dy;
            //此处sender代表当前砖块
            var sc = sender.owner;
            if (sender.canRelease()) {
                sc.removeRObj(sender);
                --this.cfg.blockNum;
            }
            else {
                sender.updateAnim();
            }
        };
        //处理丢球事件
        stickGame.prototype.doLose = function () {
            --this.cfg.life;
            this.resetGame();
        };
        //加载资源
        stickGame.prototype.loadRes = function () {
            var self = this;
            var scm = this.sceneManager;
            var sc = scm.getScene("main");
            Res.loadRes("res.json", function () {
                //注意所有地方的加载最后都是通过这个函数使用jquery的ajax请求加载的。
                frameRes_2.ResUtil.loadFile("gamecfg.json", function (data) {
                    self.cfg = data;
                    self.showMain();
                });
            }, function (total, cur) {
                var pro = (cur / total) * 100 | 0;
                $("#pTxt").text("Loading:" + pro + "%");
                $("#pBar").width(pro * 3);
            });
        };
        //成功了
        stickGame.prototype.showSuccess = function () {
            this.showScene("end");
        };
        //
        stickGame.prototype.showMain = function () {
            this.loadCfg();
            this.showScene("main");
        };
        //从配置加载游戏
        stickGame.prototype.loadCfg = function () {
            var self = this, sc = this.sceneManager.getScene("main");
            function createStick(sc) {
                var cfg = self.cfg.stick;
                var st = sc.createRObj("stick", { w: "", h: "", self: self });
                st.w = cfg.w;
                st.h = cfg.h;
                var mx = sc.w * 0.5;
                st.moveTo(mx, sc.h - 30);
                var anims = Res.getAnimationsByName(cfg.resName, cfg.fName);
                st.setAnims(anims);
                self.stick = st;
            }
            function createBall(sc) {
                var cfg = self.cfg.ball;
                var ball = sc.createRObj("ball", { self: self, r: cfg.r });
                self.ball = ball;
                var anims = Res.getAnimationsByName(cfg.resName, cfg.fName);
                ball.setAnims(anims);
                ball.moveTo(self.stick.x, self.stick.y - (self.stick.h + self.ball.h) * 0.5 - 1);
            }
            createStick(sc);
            createBall(sc);
            this.loadLevel();
        };
        //更新生命
        stickGame.prototype.updateLife = function () {
            $("#pLifeTxt").text("Life:" + this.cfg.life);
        };
        //加载关卡
        stickGame.prototype.loadLevel = function () {
            var lev = this.cfg.level;
            var cfg = this.cfg["lev" + lev];
            var bcfg = this.cfg.block;
            //下面是加载关卡中单加载砖块，应该另外写成函数
            var self = this;
            var sc = this.sceneManager.getScene("main");
            var anims = Res.getAnimationsByName(bcfg.resName, bcfg.fName);
            var bOffy = 60;
            for (var i = 0, len1 = cfg.length; i < cfg.length; i++) {
                for (var j = 0, len2 = cfg[i].length; j < len2; j++) {
                    var bData = cfg[i][j];
                    if (bData > 0) {
                        var bk = sc.createRObj("block", self);
                        bk.setAnims(anims, "s" + bData); //这里是因为砖有不同的强度
                        bk.lev = bData;
                        bk.w = bcfg.w;
                        bk.h = bcfg.h;
                        bk.moveTo(bcfg.w * j + (bk.w * 0.5), i * bcfg.h + bOffy);
                        self.cfg.blockNum++;
                    }
                }
            }
            this.resetGame();
        };
        //更新分数
        stickGame.prototype.updateScore = function () {
            $("#pScTxt").text("Score" + this.cfg.score);
        };
        //更新关卡
        stickGame.prototype.updateLevel = function () {
        };
        //更新UI场景
        stickGame.prototype.updateUI = function () {
            this.updateLife();
            this.updateScore();
            this.updateLevel();
        };
        return stickGame;
    }(app_1.Game));
    exports.stickGame = stickGame;
    var baseBall = new stickGame();
});
//# sourceMappingURL=game.js.map