/**
 * Created by YangSir on 2016/9/1.
 */
import {RenderObj} from "./RenderObj";
import {FrameState} from "./FrameState";
import {FrameStateClass} from "./FrameState";
import {ball} from "./ballball/ball";
import {sceneManager}　from "./sceneManager";
import {scene} from "./scene";
import {Frame}  from "./Frame";
import {Animation}  from "./Frame";
import {frameCtrl}  from "./Frame";
import {Sprite} from "./Sprite";
export class ClassFactory{
    static ClassHome = {
    }
    static regClass(className, per){
        ClassFactory.ClassHome[className] = per;
        // window[className] = per;
    }
    static newInstance(ClassName, arg){
        var obj = new ClassFactory.ClassHome[ClassName](arg);
        return obj;
    }
}
ClassFactory.regClass("FrameStateClass",FrameState);
ClassFactory.regClass("RenderObj",RenderObj);
ClassFactory.regClass("ball",ball);
ClassFactory.regClass("sceneManager",sceneManager);
ClassFactory.regClass("scene",scene);
ClassFactory.regClass("Frame",Frame);
ClassFactory.regClass("Animation",Animation);
ClassFactory.regClass("frameCtrl",frameCtrl);
ClassFactory.regClass("Sprite",Sprite);
//window["FrameState"] = new FrameStateClass();   // ts不可以凭空添加属性，js属于动态语言可以，ts属于静态不可以

