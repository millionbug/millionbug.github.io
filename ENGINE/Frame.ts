
/**
 * Created by YangSir on 2016/9/7.
 */
import {FrameState} from "./FrameState";
interface fData{
    x: number,
    y: number,
    w: number,
    h: number,
    duration?: number,
    img?: any
}

export class Frame{
    //帧动画的名称
    name: string;
    //帧动画每帧所持续的时间
    duration: number;
    //保存每帧位置和持续时间的信息
    frames = [];
    //对应的动画帧序列图
    img: any;
    constructor(name, img, duration?){
        this.name = name;
        this.img = img;
        this.duration = duration|50;   // "||"不等于"|"第一个逻辑运算符，第二个是二进制取值
    }
    //添加帧数据
    add(f: fData){
        if(!f.img){
            f.img = this.img;
        }
        if(!f.duration){
            f.duration = this.duration;
        }
        this.frames.push(f);
    }
    //插入帧数据
    insert(idx: number,f: fData){
        var len = this.frames.length;
        if(len==0&&idx==0||len==idx){
            this.frames.push(f);
        }else if(idx>len||idx<0){
            return;
        }else{
            this.frames.splice(idx, 0, f);
        }
    }
    //移除帧数据
    remove(idx: number){
        this.frames.splice(idx,1);
        //this.frames.removeIdx(idx);
    }
    //删除所有帧
    clear(){
        this.frames.length = 0;
    }
    get(idx: number){
        return this.frames[idx];
    }
    //获取总数
    getCount(){
        return this.frames.length;
    }
}
export class Animation{
    anims = {};
    //添加动画集合
    add(name, frames){
        this.anims[name] = frames;
    }
    //删除动画帧集合
    remove(name: string){
        this.anims[name] = null;
    }
    //清空帧动画集合
    clear(){
        this.anims = {};
    }
    //获取当前帧动画
    get(name: string){
        return this.anims[name];
    }
}
export class frameCtrl{
    processFrame:Function;
    //动画集合
    anims: Animation;
    //开始帧索引
    fsIdx: number;
    //结束帧索引
    feIdx: number;
    //当前运行帧索引
    currFIdx: number;
    //当前运行的帧集合
    currFrames: Frame;
    //是否循环
    isCycle: boolean;
    //当前帧已经运行的时间
    fDur: number;
    //动画速度
    speed: number;
    constructor(processFrameFN?: any){
        if(processFrameFN===null||processFrameFN===undefined){
            this.processFrame = function (){
                //计算上一帧到现在的时间
                this.fDur += FrameState.elapseTime * this.speed;
                if(this.fDur>=this.currFrames.frames[this.currFIdx]["duration"]){
                    this.fDur = 0;
                    if(this.currFIdx < this.feIdx-1){
                        ++this.currFIdx;
                    }else{
                        if(this.isCycle){
                            this.currFIdx = this.fsIdx;
                        }
                    }
                }
            };
        }
        else{
            this.processFrame = processFrameFN;
        }
    }
    reset(){
        this.fsIdx = 0;
        this.feIdx = this.currFrames.getCount();
        this.currFIdx = 0;
        this.isCycle = true;
        this.fDur = 0;
        this.speed = 1;
    }
    //设置frames
    setAnims(animations:Animation, currAnimName:string){
        this.anims = animations;
        currAnimName = currAnimName||"def";
        //设置当前动画帧集
        this.setCurrent(currAnimName);
    }
    //设置当前帧动画
    setCurrent(name){
        var cFrames = this.anims.get(name);
        if(this.currFrames!=cFrames){
            var oSpeed = this.speed|1;
            this.currFrames = cFrames;
            this.reset();
            this.speed = oSpeed;
        }
    }
    //获取当前帧动画
    getCurrent(){
        return this.currFrames;
    }
    getCurrFrameIdx(){
        return this.currFIdx;
    }
    //获取当前帧
    getCurrFrame(){
        return this.currFrames.get(this.currFIdx);
    }
    //获取下一帧
    getNextFrame(){
        this.processFrame();
        return this.currFrames.get(this.currFIdx);
    }
}

