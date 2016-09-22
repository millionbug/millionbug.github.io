/**
 * Created by YangSir on 2016/8/26.
 */
export class _EventListener{
    enabled: boolean;
    onBeforeRender(){
        return true;
    };
    onAfterRender(){
        return true;
    }
}
export class  _appEventListener extends _EventListener{
    enabled: boolean;
    onBeforeRender(){
        return true;
    }
    onAfterRender(){
        return true;
    }
    constructor(ln:_EventListener){
        if(ln){
            super();
            this.enabled = true;
            this.onBeforeRender = ln["onBeforeRender"]||this.onBeforeRender;
            this.onAfterRender = ln["onAfterRender"]||this.onAfterRender;
        }else{
        }
    }
}
