(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./RenderObj", "./FrameState", "./sceneManager", "./scene", "./Frame", "./Frame", "./Frame", "./Sprite", "./baseball/stick", "./baseball/ball", "./baseball/block"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/9/1.
     */
    var RenderObj_1 = require("./RenderObj");
    var FrameState_1 = require("./FrameState");
    //import {ball} from "./ballball/ball";
    var sceneManager_1 = require("./sceneManager");
    var scene_1 = require("./scene");
    var Frame_1 = require("./Frame");
    var Frame_2 = require("./Frame");
    var Frame_3 = require("./Frame");
    var Sprite_1 = require("./Sprite");
    var stick_1 = require("./baseball/stick");
    var ball_1 = require("./baseball/ball");
    var block_1 = require("./baseball/block");
    var ClassFactory = (function () {
        function ClassFactory() {
        }
        ClassFactory.regClass = function (className, per) {
            ClassFactory.ClassHome[className] = per;
            // window[className] = per;
        };
        ClassFactory.newInstance = function (ClassName, arg) {
            var obj = new ClassFactory.ClassHome[ClassName](arg);
            if (obj) {
                this.nameid++;
                obj.name = "Unnamed_" + this.nameid;
            }
            return obj;
        };
        ClassFactory.nameid = 0;
        ClassFactory.ClassHome = {};
        return ClassFactory;
    }());
    exports.ClassFactory = ClassFactory;
    ClassFactory.regClass("FrameStateClass", FrameState_1.FrameState);
    ClassFactory.regClass("RenderObj", RenderObj_1.RenderObj);
    ClassFactory.regClass("ball", ball_1.ball);
    ClassFactory.regClass("sceneManager", sceneManager_1.sceneManager);
    ClassFactory.regClass("scene", scene_1.scene);
    ClassFactory.regClass("Frame", Frame_1.Frame);
    ClassFactory.regClass("Animation", Frame_2.Animation);
    ClassFactory.regClass("frameCtrl", Frame_3.frameCtrl);
    ClassFactory.regClass("Sprite", Sprite_1.Sprite);
    ClassFactory.regClass("stick", stick_1.stick);
    ClassFactory.regClass("block", block_1.block);
});
//window["FrameState"] = new FrameStateClass();   // ts不可以凭空添加属性，js属于动态语言可以，ts属于静态不可以
//# sourceMappingURL=ClassFactory.js.map