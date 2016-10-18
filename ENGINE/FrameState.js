(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/8/25.
     * 帧数控制
     */
    var FrameStateClass = (function () {
        function FrameStateClass() {
            //最大帧数
            this.maxFrame = 0;
            //最小帧数
            this.minFrame = 999;
            //即时帧数
            this.currFrame = 0;
            //当前时间
            this.currTime = new Date();
            //每帧流逝的时间
            this.elapseTime = 0;
            //用于统计每帧开始时间
            this._sTime = 0;
            //统计每秒总帧数
            this._sTFrame = 0;
        }
        //启动帧状态检测器
        FrameStateClass.prototype.start = function () {
            this.currTime = this._sTime = new Date();
        };
        //每帧在游戏循环前调用此方法，更新和计算帧数
        FrameStateClass.prototype.update = function () {
            var fTime = new Date();
            if (fTime - this._sTime >= 1000) {
                //当前帧数
                this.currFrame = this._sTFrame;
                //计算最大帧数
                this.maxFrame = (this.currFrame > this.maxFrame) ? this.currFrame : this.maxFrame;
                //计算最小帧数
                this.minFrame = (this.currFrame < this.minFrame) ? this.currFrame : this.minFrame;
                this._sTFrame = 0;
                this._sTime = fTime;
            }
            else {
                ++this._sTFrame;
            }
            this.elapseTime = fTime - this.currTime;
            this.currTime = fTime;
        };
        return FrameStateClass;
    }());
    exports.FrameStateClass = FrameStateClass;
    var key = (function () {
        function key() {
            this.A = 65;
            this.B = 66;
            this.C = 67;
            this.D = 68;
            this.E = 69;
            this.F = 70;
            this.G = 71;
            this.H = 72;
            this.I = 73;
            this.J = 74;
            this.K = 75;
            this.L = 76;
            this.M = 77;
            this.N = 78;
            this.O = 79;
            this.P = 80;
            this.Q = 81;
            this.R = 82;
            this.S = 83;
            this.T = 84;
            this.U = 85;
            this.V = 86;
            this.W = 87;
            this.X = 89;
            this.Y = 90;
            this.Z = 91;
            this.N0 = 48;
            this.N1 = 49;
            this.N2 = 50;
            this.N3 = 51;
            this.N4 = 52;
            this.N5 = 53;
            this.N6 = 54;
            this.N7 = 55;
            this.N8 = 56;
            this.N9 = 57;
            this.LEFT = 37;
            this.RIGHT = 39;
            this.UP = 38;
            this.DOWN = 40;
            this.ENTER = 13;
            this.SPACE = 32;
            this.TAB = 9;
            this.SHIFT = 16;
            this.ALT = 18;
            this.CTRL = 17;
            //记录键盘状态
            this.states = new Array(255);
        }
        //设置是否可用
        key.prototype.setEnabled = function (flag) {
            var self = this;
            if (flag) {
                var st = this.states;
                this.clearKeyStates();
                document.onkeydown = function (e) {
                    st[e.keyCode] = 1;
                };
                document.onkeyup = function (e) {
                    st[e.keyCode] = 0;
                };
            }
            else {
                document.onkeydown = null;
                document.onkeyup = null;
            }
        };
        //判断是否按键
        key.prototype.pressed = function (key) {
            return this.states[key];
        };
        //复位所有状态
        key.prototype.clearKeyStates = function () {
            for (var i = 0; i < 255; i++) {
                this.states[i] = 0;
            }
        };
        return key;
    }());
    exports.key = key;
    var FrameState = new FrameStateClass();
    exports.FrameState = FrameState;
    //初始化
    var Key = new key();
    exports.Key = Key;
    Key.setEnabled(true);
});
//# sourceMappingURL=FrameState.js.map