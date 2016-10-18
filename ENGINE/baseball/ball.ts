import {Sprite} from "../Sprite";
import {Key} from "../FrameState";
import {stickGame} from "./game";
import {event} from "../event";
/**
 * Created by YangSir on 2016/10/14.
 */
export class ball extends Sprite{
    ClassName = "ball";
    self:stickGame;
    r:number;
    constructor(arg:{self:stickGame,r:number}){
        super();
        this.thisself(arg.self,arg.r);
    }
    thisself(self, r:number){
        this.self = self;
        this.r = r;
    }
    update(){
        var w = this.owner.w;
        var h = this.owner.h;
        this.h = 16;
        this.w = 16;
        //检测游戏中球的状态
        if(this.self.state == 0){
            this.self.resetBall();
        }
        //到达边界改变速度方向
        if(this.x<this.r||this.x>(w-this.r)){
            this.dx = (-this.dx);
        }
        if(this.y<this.r){
            this.dy = (-this.dy);
        }
        if(this.y>this.self.stick.y){
            this.self.fireEvent(new event(this, this.self, this.self.doLose))
        }
        super.update();
    }
}
