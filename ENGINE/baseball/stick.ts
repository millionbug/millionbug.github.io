/**
 *
 * Created by YangSir on 2016/10/14.
 */
import {Sprite} from "../Sprite"
import {Key} from "../FrameState";
import {event} from "../event";
import {stickGame} from "./game";
export class stick extends Sprite{
    ClassName: "stick";
    w:number;
    h:number;
    self:stickGame;
    constructor(arg:{w:number, h:number, self:stickGame}){
        super();
        this.w = arg.w ;
        this.h = arg.h;
        this.self = arg.self;
    }
    update(){
        var w = this.owner.w;
        var hw = this.w*0.5;
        if(Key.pressed(Key.SPACE)){
            //开始游戏
            console.log("space");
            if(this.self.state == 0){
                this.self.launchBall();
            }
        }
        if(Key.pressed(Key.A)&&this.x>hw){
            this.move(-5,0);
        }
        if(Key.pressed(Key.D)&&this.x<(w-hw)){
            this.move(5,0);
        }
        var ball = this.self.ball,
            bsx = this.x-this.w*0.5-ball.r,
            bex = bsx+this.w+ball.r,
            bsy = this.y-this.h*0.5-ball.r,
            bey = this.y+this.h*0.5+ball.r;
        if(ball.x>=bsx&&ball.x<=bex&&ball.y>=bsy&&ball.y<=bey)
        {
            this.self.fireEvent(new event(this,this.self,this.self.doStickCollide));
        }
    }
}