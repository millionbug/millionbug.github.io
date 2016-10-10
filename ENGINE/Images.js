/**
 * Created by YangSir on 2016/9/23.
 * 这是管控图片文件加载的对象
 * 使用方法
 * var obj = {"name":"mario", "src":"./images/mario.png"}
 * var mario = new Images().load(obj.name, obj.url, function(){});
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Images = (function () {
        function Images() {
            this.ClassName = "images";
        }
        Images.prototype.load = function (name, url, loadedFN, selfThis) {
            var img = new Image();
            img.src = url;
            var obj = { "type": "image", "name": name, "hEle": img, "src": url, "isLoaded": false };
            img.onload = function () {
                obj.isLoaded = true;
                loadedFN && loadedFN();
            };
            return obj;
        };
        return Images;
    }());
    exports.Images = Images;
});
//# sourceMappingURL=Images.js.map