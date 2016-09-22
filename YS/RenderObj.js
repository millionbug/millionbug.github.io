(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var RenderObj = (function () {
        function RenderObj(name) {
            this._renderObjSID = 0;
            //拥有着，指向场景对象
            this.owner = null;
            //x,y方向坐标
            this.x = 0;
            this.y = 0;
            //对象高度和宽度
            this.w = 0;
            this.h = 0;
            //x,y方向的速度
            this.dx = 0;
            this.dy = 0;
            //x,y方向的加速度
            this.vx = 0;
            this.vy = 0;
            //角度
            this.deg = 0;
            //z-index
            this.zIdx = 0;
            //是否可见
            this.isVisible = true;
            //是否可移除
            this.canRemove = false;
            this.name = name || ("Unnamed_" + (this._renderObjSID++));
        }
        //设置位置
        RenderObj.prototype.moveTo = function (x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
        };
        //移动
        RenderObj.prototype.move = function (xOff, yOff) {
            this.x += xOff;
            this.y += yOff;
        };
        //移动一小步，通过自己的设定速度(还要考虑加速度)进行移动
        RenderObj.prototype.moveStep = function () {
            // console.log("superupdateok");
            this.dx += this.vx;
            this.dy += this.vy;
            this.x += this.dx;
            this.y += this.dy;
        };
        //旋转deg度
        RenderObj.prototype.rotate = function (deg) {
            this.deg = deg;
        };
        //更新方法，每一祯调用
        RenderObj.prototype.update = function () {
            this.moveStep();
        };
        //渲染方法
        RenderObj.prototype.render = function (ctx) {
        };
        return RenderObj;
    }());
    exports.RenderObj = RenderObj;
});
//# sourceMappingURL=RenderObj.js.map