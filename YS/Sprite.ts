/**
 * Created by YangSir on 2016/9/20.
 */
import {RenderObj} from "./RenderObj";
import {Animation} from "./Frame";
import {Frame} from "./Frame";
import {frameCtrl} from "./Frame";
export class Sprite extends RenderObj {
    anims: Animation;
    animsCtrl: frameCtrl;
    //是否水平翻转
    isXFlip = false;
    //是否垂直翻转
    isYFlip = false;
    scaleX = 1;
    scaleY = 1;
    constructor(name?:string){
        super(name);
        this.anims = null;
        this.animsCtrl = new frameCtrl();
    }
    //设置帧动画集合对象
    setAnims(animations:Animation, currAnimName:string){
        var currAnimName = currAnimName||"def";  //为什么这儿可以是通用“||”
        this.anims = animations;
        this.animsCtrl.setAnims(animations,currAnimName);
    }
    //设置动画集
    addAnim(name:string, farmes: Frame, isCurrent: boolean){
        this.anims.add(name, frames);
        isCurrent&&this.animsCtrl.setCurrent(name);
    }
    //删除指定名称的动作
    removeAnims(name:string){
        this.anims.remove(name);
    }
    //按名称设定当前动作
    setAnim(name:string){
        this.animsCtrl.setCurrent(name);
    }
    //设置动画的速度
    setAnimSpeed(sp:number){
        this.animsCtrl.speed = sp;
    }
    //按名称获取动作
    getAnim(name:string){
        return this.anims.get(name);
    }
    //获取当前运行的动画
    getCurrentAnim(){
        return this.animsCtrl.getCurrent();
    }
    //获取当前运行的帧
    getCurrFrame(){
        return this.animsCtrl.getCurrFrame();
    }
    //获取下一帧
    getNextFrame(){
        return this.animsCtrl.getNextFrame();
    }
    //渲染方法，每一帧调用，ctx是canvas环境
    render(ctx){
        ctx.translate(this.x, this.y);
        var hw = 0.5*this.w;
        var hh = 0.5*this.h;
        var scaleX = (this.isXFlip)?-this.scaleX:this.scaleX;
        var scaleY = (this.isYFlip)?-this.scaleY:this.scaleY;
        if(this.deg!==0){//这里使用了判断是因为旋转操作在canvas中是非常消耗的操作，尽量减少使用
            ctx.rotate(this.deg*0.017453292);        //一个转换公式
        }
        ctx.scale(scaleX, scaleY);
        var f = this.getNextFrame();
        ctx.drawImage(f.img, f.x, f.y, f.w, f.h, -hw, -hh, this.w, this.h);
    }
}
