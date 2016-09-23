/**
 * Created by YangSir on 2016/9/4.
 */

/**
 *
 * Created by YangSir on 2016/8/25.
 */
import {Game} from "../app" ;

var g = new Game(false);
var sc = g.sceneManager.createScene({"name":"ballSceen", "w":400, "h": 300});
for(let i = 0; i<20;i++){
    var obj = sc.createRObj("ball",{"name":"ball"+i, "r":10});
    obj.moveTo(15*i,15*i);//这儿有一个类型出错了
    obj.dx = i;
    obj.dy = i;
}
g.run(15);