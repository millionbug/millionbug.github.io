(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Frame", "./ResManager", "./Images", "./Frame"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Frame_1 = require("./Frame");
    /**
     * Created by YangSir on 2016/9/23.
     * 专业根据配置json文件处理生成动画帧
     */
    var ResManager_1 = require("./ResManager");
    var Images_1 = require("./Images");
    var Frame_2 = require("./Frame");
    var _resMan = new ResManager_1.ResManager;
    //var _resMan = Res;
    var _imgRes = new Images_1.Images;
    var frameRes = (function () {
        function frameRes() {
            this.className = "frame";
        }
        frameRes.prototype.load = function (name, url, loadedFN, selfThis) {
            //解析frameJSON格式配置文件
            function parse(animations, data) {
                var fs;
                switch (data.type) {
                    case 0:
                        console.log(_imgRes, data);
                        var res = selfThis.getResByName(_imgRes.ClassName, data.img); //
                        fs = new Frame_2.Frame("def", res.hEle);
                        fs.add({ "x": 0, "y": 0, "w": res.hEle.width, "h": res.hEle.height }); //看了好几天小说，差点捡不起来了
                        animations.add("def", fs);
                        break;
                    case 1:
                        var res = selfThis.getResByName("image", data.img); //_imgRes.ClassName此处为images
                        if (res == null) {
                            console.log("Load image for frames: " + data.img + " error !");
                            return;
                        }
                        var r = data.rc[0];
                        var c = data.rc[1];
                        var w = data.rc[2];
                        var h = data.rc[3];
                        fs = data.animations;
                        //如果忽略则取全部
                        if (fs == null) {
                            fs = new Frame_2.Frame("def", res.hEle); // 这里就是之前的默认帧动画名称
                            for (var i = 0; i < r; i++) {
                                for (var j = 0; j < c; j++) {
                                    fs.add({ "x": j * w, "y": i * h, "w": w, "h": h });
                                }
                            }
                            animations.add("def", fs);
                        }
                        else {
                            for (var fname in fs) {
                                if (fs.hasOwnProperty(fname)) {
                                    var fss = fs[fname];
                                    var fm = new Frame_2.Frame(fname, res.hEle);
                                    for (var j = fss[0]; j <= fss[fss.length - 1]; j++) {
                                        var fx = j % c;
                                        fx |= fx;
                                        var fy = j / c;
                                        fy |= fy;
                                        fm.add({ "x": w * fx, "y": h * fy, "w": w, "h": h });
                                    }
                                    animations.add(fname, fm);
                                }
                            }
                        }
                        break;
                }
            }
            var obj = { "type": "frame", "name": name, "src": url, "frames": {}, "isLoaded": false };
            //加载动画资源
            ResUtil.loadFile(url, function (data) {
                obj.isLoaded = true;
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        var f = data[i];
                        obj.frames[i] = new Frame_1.Animation();
                        //解析动画资源
                        parse(obj.frames[i], f);
                    }
                }
                loadedFN && loadedFN();
            });
            return obj; //这里忘记return了，果然状态不大好啊
        };
        return frameRes;
    }());
    exports.frameRes = frameRes;
    var ResUtil = (function () {
        function ResUtil() {
        }
        ResUtil.loadFile = function (url, loadFN) {
            var self = this;
            var dt = "json";
            var obj = {
                url: url,
                type: "post",
                datatype: dt,
                success: function (data) {
                    loadFN(data);
                },
                error: function () {
                    console.log(url + "error");
                }
            };
            $.ajax(obj);
        };
        return ResUtil;
    }());
    exports.ResUtil = ResUtil;
});
//# sourceMappingURL=frameRes.js.map