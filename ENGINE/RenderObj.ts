/**
 * Created by YangSir on 2016/9/1.
 */
import {ClassFactory} from "./ClassFactory";
export class RenderObj{
    _renderObjSID = 0;
    name: string;
    //拥有着，指向场景对象
    owner = null;
    //x,y方向坐标
    x:number = 0;
    y:number = 0;
    //对象高度和宽度
    w:number = 0;
    h:number = 0;
    //x,y方向的速度
    dx:number = 0;
    dy:number = 0;
    //x,y方向的加速度
    vx:number = 0;
    vy:number = 0;
    //角度
    deg:number = 0;
    //z-index
    zIdx:number = 0;
    //是否可见
    isVisible:boolean = true;
    //是否可移除
    canRemove:boolean = false;
    constructor(name?:string){
        this.name = name||("Unnamed_"+(this._renderObjSID++));
    }
    //设置位置
    moveTo(x:number,y:number){
        this.x = x||this.x;
        this.y = y||this.y;
    }
    //移动
    move(xOff:number, yOff:number){
        this.x += xOff;
        this.y += yOff;
    }
    //移动一小步，通过自己的设定速度(还要考虑加速度)进行移动
    moveStep(){
        // console.log("superupdateok");
        this.dx += this.vx;
        this.dy += this.vy;
        this.x += this.dx;
        this.y += this.dy;
    }
    //旋转deg度+
    rotate(deg:number){
        this.deg = deg;
    }
    //更新方法，每一祯调用
    update(){
        this.moveStep();
    }
    //渲染方法
    render(ctx){

    }
}