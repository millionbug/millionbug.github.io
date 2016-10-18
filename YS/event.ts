/**
 * Created by YangSir on 2016/8/26.
 */
export interface _EventListener{
    enabled: boolean;
    onBeforeRender();
    onAfterRender();
};
export class  _appEventListener implements _EventListener{
    enabled: boolean;
    onBeforeRender(){
        return true;
    }
    onAfterRender(){
        return true;
    }
    constructor(ln:_EventListener){
        if(ln){
            //super();
            this.enabled = true;
            this.onBeforeRender = ln["onBeforeRender"]||this.onBeforeRender;
            this.onAfterRender = ln["onAfterRender"]||this.onAfterRender;
        }else{
        }
    }
}

export class event{
    src;
    obj;
    method;
    constructor(src, obj, method){
        this.src = src;
        this.obj = obj;
        this.method = method;
    }
    exec(){
        this.method&&this.method.call(this.obj, this.src);
    }
}