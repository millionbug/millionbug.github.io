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



export class key{
        A=65;
        B=66;
        C=67;
        D=68;
        E=69;
        F=70;
        G=71;
        H=72;
        I=73;
        J=74;
        K=75;
        L=76;
        M=77;
        N=78;
        O=79;
        P=80;
        Q=81;
        R=82;
        S=83;
        T=84;
        U=85;
        V=86;
        W=87;
        X=89;
        Y=90;
        Z=91;
        N0=48;
        N1=49;
        N2=50;
        N3=51;
        N4=52;
        N5=53;
        N6=54;
        N7=55;
        N8=56;
        N9=57;
        LEFT=37;
        RIGHT=39;
        UP=38;
        DOWN=40;
        ENTER=13;
        SPACE=32;
        TAB=9;
        SHIFT=16;
        ALT=18;
        CTRL=17;
        //记录键盘状态
        states=new Array(255);
        //设置是否可用
        setEnabled(flag){
            var self = this;
            if(flag){
                var st = this.states;
                this.clearKeyStates();
                document.onkeydown = function(e){
                    st[e.keyCode] = 1;
                }
                document.onkeyup = function(e){
                    st[e.keyCode] = 0;
                }
            }else{
                document.onkeydown = null;
                document.onkeyup = null;
            }
        }
        //判断是否按键
        pressed(key){
            return this.states[key];
        }
        //复位所有状态
        clearKeyStates(){
            for(var i = 0; i<255; i++){
                this.states[i] = 0;
            }
        }
    }

let FrameState = new FrameStateClass();
    //初始化
let Key = new key();
Key.setEnabled(true);

export {
    Key,FrameState
}

