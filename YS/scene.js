(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./jquery", "./ClassFactory"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/8/29.
     */
    /*
    * scene主要包含一个div以及一个canvas，div作为一个整个scene的容器，
    * 而canvas则是作为一个整个场景显示使用
    * 通常情况下，吧游戏显示的场景放在人、div容器中的最底层。
    * 而其他对象例如游戏ui则放在游戏最顶层*/
    require("./jquery");
    var ClassFactory_1 = require("./ClassFactory");
    var scene = (function () {
        function scene(arg) {
            //保存所有监听器
            this.listeners = [];
            //保存所有的渲染对象
            this.rObjs = [];
            this.nameRObjs = {};
            this.name = arg.name || "Unnamed";
            this.x = arg.x || 0;
            this.y = arg.y || 0;
            this.color = arg.color;
            this.w = arg.w || 320;
            this.h = arg.h || 200;
            this.holder = $("<div id="sc_" + this.name + "" style="position:absolute;overflow:hidden;left:0px;top:0px"> </div>");
            //绑定的canvas元素，以后的精灵都在这个canvas上进行绘制
            this.cvs = $("<canvas id="cv_" + this.name + "" style="z-index:-1;position:absolute;left:0px;top:0px"> </canvas>");
            this.ctx = this.cvs[0].getContext("2d");
            this.setPos();
            this.setSize();
            this.setColor(this.color);
            this.holder.append(this.cvs);
            this.holder.append(this.ctx);
            $(document.body).append(this.holder);
        }
        //创建渲染对象
        scene.prototype.createRObj = function (className, arg) {
            className = className || "RenderObj";
            var obj = ClassFactory_1.ClassFactory.newInstance(className, arg);
            this.addRobj(obj);
            return obj;
        };
        //添加对象
        scene.prototype.addRobj = function (renderObj) {
            renderObj.owner = this;
            this.rObjs.push(renderObj);
            this.nameRObjs[renderObj.name] = renderObj;
        };
        //删除对象
        scene.prototype.removeRObj = function (renderObj) {
            this.removeRObjByName(renderObj.name);
        };
        //根据名称删除对象
        scene.prototype.removeRObjByName = function (name) {
            if (this.nameRObjs[name]) {
                this.nameRObjs[name].canRemove = true;
            }
        };
        //删除所有可移除标记的渲染对象
        scene.prototype.removeAllCanRemove = function () {
            for (var i = 0, len = this.rObjs.length; i < len; i++) {
                if (this.rObjs[i].canremove) {
                    delete this.nameRObjs[this.rObjs[i].name];
                    this.rObjs.splice(i, 1);
                }
            }
        };
        //根据名称查找对象
        scene.prototype.getRObjByName = function (name) {
            return this.nameRObjs[name];
        };
        //删除所有渲染对象
        scene.prototype.clearRObj = function () {
            this.rObjs = [];
            this.nameRObjs = {};
        };
        //添加监听器
        scene.prototype.addListener = function (ln) {
            this.listeners.push(ln);
        };
        //删除监听器列表
        scene.prototype.clearListener = function () {
            this.listeners.length = 0;
        };
        scene.prototype.setPos = function (x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
            this.holder.css("left", this.x).css("top", this.y);
        };
        scene.prototype.setSize = function (w, y) {
            this.w = w || this.w;
            this.h = y || this.h;
            this.holder.css("width", this.w).css("height", this.h);
            this.cvs.attr("width", this.w).attr("height", this.h); //为什么是attr
        };
        scene.prototype.setColor = function (color) {
            this.color = color || this.color;
            this.holder.css("color", this.color);
        };
        scene.prototype.update = function () {
            // alert("scene.update,ok");
            //for循环更新所有精灵
            for (var i = 0, len = this.rObjs.length; i < len; i++) {
                this.rObjs[i].update();
            }
        };
        scene.prototype.render = function () {
            //for循环渲染所有精灵,并不是
            var ltns = this.listeners;
            this.clear(); //清除canvas
            //执行渲染前监听器
            for (var i = 0, len = ltns.length; i < len; i++) {
                ltns[i].enabled && ltns[i].onBeforeRender(this); //为什么要传入this啊
            }
            this.renderRObj();
            for (var i = 0, len = ltns.length; i < len; i++) {
                ltns[i].enabled && ltns[i].onAfterRender(this); //为什么要传入this啊
            }
        };
        //渲染所有对象
        scene.prototype.renderRObj = function () {
            for (var i = 0, len = this.rObjs.length; i < len; i++) {
                this.ctx.save();
                this.rObjs[i].isVisible && this.rObjs[i].render(this.ctx);
                this.ctx.restore();
            }
        };
        //清除背景
        scene.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.w, this.h);
        };
        //显示
        scene.prototype.show = function () {
            this.holder.show();
        };
        //隐藏
        scene.prototype.hide = function () {
            this.holder.hide();
        };
        scene.prototype.fadeOut = function (time, fn) {
            this.holder.fadeOut(time, fn);
        };
        scene.prototype.fadeIn = function (time, fn) {
            this.holder.fadeIn(time, fn);
        };
        //设置背景
        scene.prototype.setBGImg = function (imgURL, pattern) {
            this.holder.css("background-image", "url(" + imgURL + ")");
            switch (pattern) {
                case 0:
                    this.holder.css("background-repeat", "no-repeat");
                    this.holder.css("background-position", "center");
                    break;
                case 1:
                    this.holder.css("background-size", this.w + "px " + this.h + "px");
                    break;
            }
        };
        //清除相关所有内容
        scene.prototype.clean = function () {
            this.cvs.remove();
            this.holder.remove();
            this.cvs = this.holder = this.ctx = null;
        };
        return scene;
    }());
    exports.scene = scene;
});
//# sourceMappingURL=scene.js.map