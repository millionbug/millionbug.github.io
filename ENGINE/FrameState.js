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
    exports.FrameState = new FrameStateClass();
});
//# sourceMappingURL=FrameState.js.map