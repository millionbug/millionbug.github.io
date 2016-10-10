import {FrameState} from "./FrameState";
import {_appEventListener} from "./event";
import {sceneManager} from "./sceneManager";
import {ClassFactory} from "./ClassFactory";
/**
 * Created by YangSir on 2016/8/25.
 */
export class Game{
    private paused: boolean
    FrameStateBody = FrameState;
    sceneManager = ClassFactory.newInstance("sceneManager",{});
    constructor(pause: boolean){
        this.paused = false;
    }
    //保存所有监听器
    listeners: _appEventListener[] = [];
    //添加监听器
    addListener(ln: _appEventListener){
        this.listeners.push(ln);
    }
    //删除所有监听器
    clearListener(ln: _appEventListener){
        this.listeners.length = 0;
    }
    //游戏的主循环
    mainloop(){
        //执行游戏主循环
        let lns = this.listeners;
        for(let i=0,len=lns.length; i<len; i++){
            lns[i].enabled&&lns[i].onBeforeRender();
        }
        let scene = this.sceneManager.getCurrentScene();
        if(scene){
            scene.update();
            scene.render();
        }
        for(let i=0,len=lns.length; i<len; i++){
            lns[i].enabled&&lns[i].onAfterRender();
        }
    }
    //声明一个变量保存循环
    public tHand;
    //执行游戏
    run(fps?:number){
        fps = fps||60;
        let spf = (1000/fps)|0;
        let self: any = this;
        this.FrameStateBody.start();
        self.tHand = setInterval(function(){
            if(!self.paused){
                self.mainloop();
                self.FrameStateBody.update();
            }
        },spf);
    }
    stop(){
        clearInterval(this.tHand);
    }
}
