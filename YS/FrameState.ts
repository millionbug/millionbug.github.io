/**
 * Created by YangSir on 2016/8/25.
 * 帧数控制
 */
export class FrameStateClass{
    //最大帧数
    maxFrame:number = 0;
    //最小帧数
    minFrame:number = 999;
    //即时帧数
    currFrame:number = 0;
    //当前时间
    currTime:any = new Date();
    //每帧流逝的时间
    elapseTime: number = 0;
    //用于统计每帧开始时间
    _sTime: any = 0;
    //统计每秒总帧数
    _sTFrame: number = 0;
    //启动帧状态检测器
    start(){
        this.currTime = this._sTime = new Date();
    }
    //每帧在游戏循环前调用此方法，更新和计算帧数
    update(){
        let fTime: any = new Date();
        if(fTime-this._sTime>=1000){
            //当前帧数
            this.currFrame = this._sTFrame;
            //计算最大帧数
            this.maxFrame = (this.currFrame>this.maxFrame)?this.currFrame : this.maxFrame;
            //计算最小帧数
            this.minFrame = (this.currFrame<this.minFrame)?this.currFrame : this.minFrame;
            this._sTFrame = 0;
            this._sTime = fTime;
        }
        else {
            ++this._sTFrame;
        }
        this.elapseTime = fTime - this.currTime;
        this.currTime = fTime;
    }
}
export let FrameState = new FrameStateClass();
