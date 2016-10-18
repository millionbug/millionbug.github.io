(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./FrameState"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/9/7.
     */
    var FrameState_1 = require("./FrameState");
    var Frame = (function () {
        function Frame(name, img, duration) {
            //保存每帧位置和持续时间的信息
            this.frames = [];
            this.name = name;
            this.img = img;
            this.duration = duration | 50; // "||"不等于"|"第一个逻辑运算符，第二个是二进制取值
        }
        //添加帧数据
        Frame.prototype.add = function (f) {
            if (!f.img) {
                f.img = this.img;
            }
            if (!f.duration) {
                f.duration = this.duration;
            }
            this.frames.push(f);
        };
        //插入帧数据
        Frame.prototype.insert = function (idx, f) {
            var len = this.frames.length;
            if (len == 0 && idx == 0 || len == idx) {
                this.frames.push(f);
            }
            else if (idx > len || idx < 0) {
                return;
            }
            else {
                this.frames.splice(idx, 0, f);
            }
        };
        //移除帧数据
        Frame.prototype.remove = function (idx) {
            this.frames.splice(idx, 1);
            //this.frames.removeIdx(idx);
        };
        //删除所有帧
        Frame.prototype.clear = function () {
            this.frames.length = 0;
        };
        Frame.prototype.get = function (idx) {
            return this.frames[idx];
        };
        //获取总数
        Frame.prototype.getCount = function () {
            return this.frames.length;
        };
        return Frame;
    }());
    exports.Frame = Frame;
    var Animation = (function () {
        function Animation() {
            this.anims = {};
        }
        //添加动画集合
        Animation.prototype.add = function (name, frames) {
            this.anims[name] = frames;
        };
        //删除动画帧集合
        Animation.prototype.remove = function (name) {
            this.anims[name] = null;
        };
        //清空帧动画集合
        Animation.prototype.clear = function () {
            this.anims = {};
        };
        //获取当前帧动画
        Animation.prototype.get = function (name) {
            return this.anims[name];
        };
        return Animation;
    }());
    exports.Animation = Animation;
    var frameCtrl = (function () {
        function frameCtrl(processFrameFN) {
            if (processFrameFN === null || processFrameFN === undefined) {
                this.processFrame = function () {
                    //计算上一帧到现在的时间
                    this.fDur += FrameState_1.FrameState.elapseTime * this.speed;
                    if (this.fDur >= this.currFrames.frames[this.currFIdx]["duration"]) {
                        this.fDur = 0;
                        if (this.currFIdx < this.feIdx - 1) {
                            ++this.currFIdx;
                        }
                        else {
                            if (this.isCycle) {
                                this.currFIdx = this.fsIdx;
                            }
                        }
                    }
                };
            }
            else {
                this.processFrame = processFrameFN;
            }
        }
        frameCtrl.prototype.reset = function () {
            this.fsIdx = 0;
            this.feIdx = this.currFrames.getCount();
            this.currFIdx = 0;
            this.isCycle = true;
            this.fDur = 0;
            this.speed = 1;
        };
        //设置frames
        frameCtrl.prototype.setAnims = function (animations, currAnimName) {
            this.anims = animations;
            currAnimName = currAnimName || "def";
            //设置当前动画帧集
            this.setCurrent(currAnimName);
        };
        //设置当前帧动画
        frameCtrl.prototype.setCurrent = function (name) {
            var cFrames = this.anims.get(name);
            if (this.currFrames != cFrames) {
                var oSpeed = this.speed | 1;
                this.currFrames = cFrames;
                this.reset();
                this.speed = oSpeed;
            }
        };
        //获取当前帧动画
        frameCtrl.prototype.getCurrent = function () {
            return this.currFrames;
        };
        frameCtrl.prototype.getCurrFrameIdx = function () {
            return this.currFIdx;
        };
        //获取当前帧
        frameCtrl.prototype.getCurrFrame = function () {
            return this.currFrames.get(this.currFIdx);
        };
        //获取下一帧
        frameCtrl.prototype.getNextFrame = function () {
            this.processFrame();
            return this.currFrames.get(this.currFIdx);
        };
        return frameCtrl;
    }());
    exports.frameCtrl = frameCtrl;
});
//# sourceMappingURL=Frame.js.map