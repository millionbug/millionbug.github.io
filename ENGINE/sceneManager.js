(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./scene"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/8/30.
     */
    /*
    * 这个类是用来管理场景类的，由它去创建场景，销毁以及切换*/
    var scene_1 = require("./scene");
    var sceneManager = (function () {
        function sceneManager() {
            this.namedScenes = {};
            this.scenes = [];
        }
        sceneManager.prototype.createScene = function (args) {
            var sc = null;
            sc = new scene_1.scene(args);
            this.push(sc);
            return sc;
        };
        //场景重新排序
        sceneManager.prototype.sortSceneIdx = function () {
            for (var i = 0, len = this.scenes.length; i < len; i++) {
                var sc = this.scenes[i];
                sc.holder.css("z-index", i); //是对场景的显示分层排序
            }
        };
        sceneManager.prototype.push = function (scene) {
            if (!this.getScene(scene.name)) {
                this.scenes.push(scene);
                this.namedScenes[scene.name] = scene;
            }
        };
        sceneManager.prototype.pop = function () {
            var sc = this.scenes.pop();
            if (sc != null) {
                sc.clean();
                delete this.namedScenes[sc.name];
            }
        };
        //删除场景
        sceneManager.prototype.remove = function () {
            var sc = this.getScene(name);
            if (sc != null) {
                sc.clean();
                delete this.namedScenes[name];
                // ArrayUtil.removeFn(this.scenes, function(s){
                //     return s.name === name;
                // });
                this.sortSceneIdx();
            }
        };
        //交换场景位置
        sceneManager.prototype.swap = function (from, to) {
            if (from >= 0 && from <= this.scenes.length - 1 && to >= 0 && to <= this.scenes.length - 1) {
                var sc = this.scenes[from];
                this.scenes[from] = this.scenes[to];
                this.scenes[to] = sc;
                this.sortSceneIdx();
            }
        };
        //获取某个场景的索引
        sceneManager.prototype.getIdx = function (scene) {
            return scene.holder.css("z-index");
        };
        //把某个场景移动到最顶部
        sceneManager.prototype.bringToTop = function (scene) {
            var idx = this.getIdx(scene);
            if (idx != this.scenes.length - 1) {
                this.scenes.splice(idx, 1); //删除，替换，插入
                this.scenes[this.scenes.length] = scene;
                this.sortSceneIdx();
            }
        };
        //把某个场景移动到最底部
        sceneManager.prototype.bringToLast = function (scene) {
            var idx = this.getIdx(scene);
            if (idx != 0) {
                this.scenes.splice(idx, 1);
                this.scenes.splice(0, 0, scene);
                this.sortSceneIdx();
            }
        };
        //场景后移
        sceneManager.prototype.back = function (scene) {
            var idx = this.getIdx(scene);
            if (idx > 0) {
                this.swap(idx, idx - 1);
            }
        };
        //场景前移
        sceneManager.prototype.forward = function (scene) {
            var idx = this.getIdx(scene);
            if (idx < this.scenes.length) {
                this.swap(idx, idx + 1);
            }
        };
        //根据名称获取场景
        sceneManager.prototype.getScene = function (name) {
            return this.namedScenes[name];
        };
        //获取当前场景（顶部场景）
        sceneManager.prototype.getCurrentScene = function () {
            return this.scenes[this.scenes.length - 1];
        };
        //清除所有场景
        sceneManager.prototype.clearAll = function () {
            for (var i in this.scenes) {
                this.scenes[i].clean();
            }
            this.namedScenes = {};
            this.scenes = [];
        };
        return sceneManager;
    }());
    exports.sceneManager = sceneManager;
});
//# sourceMappingURL=sceneManager.js.map