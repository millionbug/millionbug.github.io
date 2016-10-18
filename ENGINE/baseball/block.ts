/**
 * Created by YangSir on 2016/10/14.
 */
import {event} from "../event";
import {Sprite} from "../Sprite";
import {stickGame} from "./game";
export class block extends Sprite{
    ClassName = "block";
    //关卡
    lev:number;
    //被击中次数
    hit:number;
    //保存this
    self:stickGame;
    constructor(self:stickGame){
        super();
        this.lev = 1;
        this.hit = 0;
        this.thisself(self);
    }
    thisself(self:stickGame){
        this.self = self;
    }
    update(){
        var ball = this.self.ball,
            bsx = this.x-this.w*0.5-ball.r,
            bex = bsx+this.w+ball.r,
            bsy = this.y-this.h*0.5-ball.r,
            bey = this.y+this.h*0.5+ball.r;
        if(ball.x>=bsx&&ball.x<=bex&&ball.y>=bsy&&ball.y<=bey){
                ++this.hit;
            this.self.fireEvent(new event(this, this.self, this.self.doBlockCollide));
        }
    }
    //更新动画
    updateAnim(){
        this.setCAnim("s"+(this.lev-this.hit));
    }
    //判断是否可以销毁
    canRelease(){
        return (this.hit==this.lev);
    }
    //获取分数
    getScore(lev){
        return this.lev;
    }
}
