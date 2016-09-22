/**
 * Created by YangSir on 2016/9/3.
 */
import {RenderObj} from "../RenderObj";
import {ClassFactory} from "../ClassFactory";
export class ball extends RenderObj{
    r:number;
    color:string;
    constructor(name:string, r:number){
        super(name);
        this.r = r||10;
        this.color = "black";
    }
    //重写父类方法
    update(){
        var w = this.owner.w;
        var h = this.owner.h;//这个w,h命名没有看懂
        if(this.x<this.r||this.x>w-this.r){
            this.dx = -this.dx;
        }
        if(this.y<this.r||this.y>h-this.r){
            this.dy = -this.dy;
        }
        super.update();  //调用父类方法
    }
    //重写父类render方法
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r-3, 0, Math.PI*2);
        ctx.fill();
        ctx.lineWidth = 2;
        //描边
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.stroke();
    }
}