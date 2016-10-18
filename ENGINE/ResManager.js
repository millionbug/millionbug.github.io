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
     * Created by YangSir on 2016/9/23.
     */
    var ResManager = (function () {
        function ResManager() {
            //存储所有定义的资源类型
            this.defTypes = {};
            //存贮所有资源
            this.res = {};
        }
        //注册资源类型
        ResManager.prototype.regResType = function (type, clz) {
            if (this.defTypes[type] === undefined) {
                this.defTypes[type] = { "type": type, "class": clz };
            }
        };
        //根据类型获取资源类
        ResManager.prototype.getClass = function (type) {
            var res = this.defTypes[type]["class"];
            return res;
        };
        //加载资源类
        ResManager.prototype.load = function (type, name, src, loadedFN) {
            var self = this;
            var res = this.getClass(type).load(name, src, loadedFN, self);
            this.addRes(res);
            return res;
        };
        //添加资源
        ResManager.prototype.addRes = function (resObj) {
            console.log(resObj);
            this.res[resObj.type] = this.res[resObj.type] || {};
            this.res[resObj.type][resObj.name] = resObj;
        };
        //删除指定资源
        ResManager.prototype.removeRes = function (resObj) {
            var t = resObj.type, n = resObj.name;
            delete this.res[t][n];
            if (function (obj) {
                for (var i in obj) {
                    return false; //如果不是空则返回false
                }
                return true; //为空则删除掉这个隶属于的属性
            }(this.res[t])) {
                delete this.res[t];
            }
        };
        //清除所有元素
        ResManager.prototype.clearRes = function () {
            this.res = {};
        };
        //根据名称获取资源
        ResManager.prototype.getResByName = function (type, name) {
            return this.res[type][name]; //好像存储的时候有必要做这么多的
        };
        //获取帧动画对象
        ResManager.prototype.getAnimationsByName = function (fResName, fName) {
            var obj = this.res["frame"][fResName];
            var fm = obj.frames[fName];
            return fm;
        };
        //加载资源，url制定资源配置文件
        ResManager.prototype.loadRes = function (url, loadedFN, perLoadedFN) {
            var self = this;
            var dt = "json";
            var obj = {
                url: url,
                type: "get",
                dataType: dt,
                success: function (data) {
                    console.log(data);
                    self.parseRes(data, loadedFN, perLoadedFN);
                },
                error: function () {
                    console.log(url + "error");
                }
            };
            $.ajax(obj);
        };
        //解析资源
        ResManager.prototype.parseRes = function (res, loadedFN, perLoadedFN) {
            var resCount = 0;
            var totalCount = 0;
            var resType = [];
            this.res = [];
            for (var i in res) {
                if (res.hasOwnProperty(i)) {
                    resType.push(i);
                    totalCount += res[i].length;
                }
            }
            var cResTIdx = 0;
            var cRes = resType[cResTIdx];
            var cResCount = 0;
            var loadObj = null;
            var self = this;
            var loadHand = window.setInterval(function () {
                if (loadObj == null) {
                    loadObj = self.load(cRes, res[cRes][cResCount].name, res[cRes][cResCount].src, null);
                }
                else {
                    if (loadObj.isLoaded) {
                        resCount++;
                        cResCount++;
                        perLoadedFN && perLoadedFN(totalCount, resCount);
                        if (resCount == totalCount) {
                            window.clearInterval(loadHand);
                            loadedFN && loadedFN(loadedFN);
                            return;
                        }
                        if (cResCount >= res[cRes].length) {
                            cResTIdx++;
                            cRes = resType[cResTIdx];
                            cResCount = 0;
                        }
                        loadObj = self.load(cRes, res[cRes][cResCount].name, res[cRes][cResCount].src, null);
                    }
                }
            });
        };
        return ResManager;
    }());
    exports.ResManager = ResManager;
});
//# sourceMappingURL=ResManager.js.map