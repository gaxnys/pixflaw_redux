(this.webpackJsonppixflaw_redux=this.webpackJsonppixflaw_redux||[]).push([[0],{10:function(e,t,a){e.exports=a(13)},11:function(e,t,a){},13:function(e,t,a){"use strict";a.r(t);var n,r,o=a(0),i=a(8),s=a(7),l=(a(11),function(e,t,a){return{type:"TOUCHES",touches:e,windowWidth:t,windowHeight:a}}),h={w:"up",ArrowUp:"up",a:"left",ArrowLeft:"left",s:"down",ArrowDown:"down",d:"right",ArrowRight:"right"," ":"up"},c=function(e,t,a){var n=0,r=0,i=28e5/Math.pow(t,2),s=.15;a&&(i=6,s=.3);var l,h=Object(o.a)(e);try{for(h.s();!(l=h.n()).done;){switch(l.value){case"up":r+=i;break;case"left":n+=Math.atan(s/t);break;case"down":r-=1;break;case"right":n-=Math.atan(s/t)}}}catch(c){h.e(c)}finally{h.f()}return{r:r-=4e6/Math.pow(t,2),angle:n}},u=function(e,t,a){var n,r,i={up:!1,left:!1,down:!1,right:!1,almost:!1},s=Math.atan(30/e),l=Object(o.a)(a);try{for(l.s();!(n=l.n()).done;){var h=n.value,c=h.r-e,u=(r=h.angle-t)>Math.PI?r-2*Math.PI:r<-Math.PI?r+2*Math.PI:r;i.almost=i.almost||Math.abs(c)<36&&Math.abs(u)<Math.atan(27/e)&&c<0,Math.abs(c)>35||(Math.abs(u)>s||(35-Math.abs(c)<30-Math.abs(e*Math.tan(u))?c>=0?i.up=i.up||Math.abs(c)-35:i.down=i.down||35-Math.abs(c):u>=0?i.left=i.left||Math.abs(u)-s:i.right=i.right||s-Math.abs(u)))}}catch(d){l.e(d)}finally{l.f()}return i},d=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{keys:new Set,velR:0,velAngle:0,posR:3100,posAngle:Math.PI/2,cameraR:3100,cameraAngle:Math.PI/2,debounce:0},a=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0;switch(a.type){case"KEY_DOWN":return(e=new Set(t.keys)).add(h[a.key]),Object.assign({},t,{keys:e});case"KEY_UP":return(e=new Set(t.keys)).delete(h[a.key]),Object.assign({},t,{keys:e});case"TOUCHES":return e=new Set,2===a.touches.length?(10===t.debounce&&(e=new Set(t.keys)),e.add("up")):a.touches.length>0&&(t.keys.has("up")&&e.add("up"),a.touches[0].clientX>a.windowWidth/2?e.add("right"):e.add("left")),Object.assign({},t,{keys:e});case"GAME_TICK":var r=u(t.posR,t.posAngle,n.level),o=t.posR-15-1<n.planetRadius||r.almost,i=c(t.keys,t.posR,o),s=Math.min(t.velR+i.r,10);(r.up&&t.velR>0||r.down&&t.velR<0)&&(s=0);var l=t.posR+s+r.down+r.up;t.posR-15<n.planetRadius&&(l=n.planetRadius+15,s=s<-10?-(s+10):0,s=0);var d=o?.25:.125,p=t.velAngle+i.angle,v=Math.sign(-t.velAngle)*d;p+=Math.tan(v/t.posR),Math.abs(p)<Math.tan(d/t.posR)&&(p=0),(r.left&&t.velAngle>0||r.right&&t.velAngle<0)&&(p=0);var f=t.posAngle+p+r.left+r.right;f>2*Math.PI?f-=2*Math.PI:f<0&&(f+=2*Math.PI);var g=(20*t.cameraR+l)/21,y=f-t.cameraAngle;y>Math.PI?y-=2*Math.PI:y<-Math.PI&&(y+=2*Math.PI);var w=t.cameraAngle+y/20;w>2*Math.PI?w-=2*Math.PI:w<0&&(w+=2*Math.PI);var M=t.debounce;return 0==t.keys.size?M=0:t.debounce<10&&(M+=1),Object.assign({},t,{velAngle:p,velR:s,posAngle:f,posR:l,cameraAngle:w,cameraR:g,debounce:M});case"LEVEL_WIN":return Object.assign({},t,{posR:3e3,cameraR:3e3});default:return t}},p=function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],i=[];i.length<e;){var s,l=2*Math.random()*Math.PI,h=(s=r?Math.random()+Math.random():Math.pow(Math.random(),3))>1?2-s:s,c=h*(t-a)+a;if(c>a){var u=Math.round(c*Math.cos(l)),d=Math.round(c*Math.sin(l)),p=!0;if(n>0){var v,f=Object(o.a)(i);try{for(f.s();!(v=f.n()).done;){var g=v.value;if(Math.abs(g.posX-u)+Math.abs(g.posY-d)<n){p=!1;break}}}catch(y){f.e(y)}finally{f.f()}}p&&i.push({angle:l,r:c,posX:u,posY:d})}}return i},v=function(e){return 4e3*Math.pow(1.5,e)},f=function(e){return p(1e3,v(e),3e3,60,!1)},g={level:f(0),wins:0,planetRadius:3e3,goalRadius:v(0)},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.assign({},g),t=arguments.length>1?arguments[1]:void 0,a=e.wins;switch(t.type){case"LEVEL_WIN":a+=1;case"RESET_LEVEL":return Object.assign({},e,{level:f(a),wins:a,planetRadius:3e3,goalRadius:v(a)});default:return e}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GAME_TICK":return{player:d(e.player,t,e.level),level:y(e.level,t)};default:return{player:d(e.player,t),level:y(e.level,t)}}},M=a(1),b=a(2),R=a(4),m=a(3),k=function(){function e(t){Object(M.a)(this,e),this.context=document.createElement("canvas").getContext("2d"),this.getState=t,this.currentValue=void 0,this.updateCanvas=!1,this.updatePosition=!1}return Object(b.a)(e,[{key:"shouldComponentUpdate",value:function(){var e=this.currentValue;return this.currentValue=this.getState(),this.updateCanvas=this.shouldCanvasUpdate(e,this.currentValue),this.updatePosition=this.shouldPositionUpdate(e,this.currentValue),this.updateCanvas||this.updatePosition}},{key:"shouldCanvasUpdate",value:function(e,t){return this.updateCanvas=e!==t}},{key:"shouldPositionUpdate",value:function(e,t){return this.updatePosition=e!==t}},{key:"render",value:function(){throw"Component class shall not be instantiated directly"}}]),e}(),P=function(e){Object(R.a)(a,e);var t=Object(m.a)(a);function a(){return Object(M.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"shouldCanvasUpdate",value:function(e,t){return void 0===e||(this.updateCanvas=e.player.posAngle!==t.player.posAngle||e.player.posR!==t.player.posR)}},{key:"shouldPositionUpdate",value:function(e,t){return void 0===e||(this.updatePosition=e.player.posAngle!==t.player.posAngle||e.player.posR!==t.player.posR||e.player.cameraAngle!==t.player.cameraAngle||e.player.cameraR!==t.player.cameraR)}},{key:"render",value:function(){var e=this.getState();if(this.updateCanvas){this.context.fillStyle="#007DFF";var t=this.context.canvas;this.context.clearRect(0,0,t.width,t.height),this.context.save(),this.context.translate(40,60),this.context.rotate(e.player.posAngle),this.context.fillRect(-15,-10,30,20),this.context.restore()}return{canvas:this.context.canvas,angle:e.player.posAngle,r:e.player.posR,offsetX:40,offsetY:60}}},{key:"renderToContext",value:function(e,t){var a=t.level.wins;e.save(),e.fillStyle="#007DFF",e.rotate(t.player.posAngle),e.translate(t.player.posR,0),e.fillRect(-15,-10,30,20),e.fillStyle="#FFFFFF";for(var n=0;n<a;n++){var r=Math.floor(n/2+1),o=Math.floor(n%2+1);e.fillRect(7.5*r-15-2,20/3*o-10-2,4,4)}e.restore()}}]),a}(k),A=function(e){Object(R.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(M.a)(this,a),(n=t.call(this,e)).context.canvas.width=8100,n.context.canvas.height=8100,n.center=4050;n.points=p(1e3,2995),n.randoms=[];for(var r=0;r<n.points.length;r++)n.randoms.push(Math.random());return n.context.canvas.width=100,n.context.canvas.height=100,n}return Object(b.a)(a,[{key:"shouldCanvasUpdate",value:function(e,t){return this.updateCanvas=!1}},{key:"shouldPositionUpdate",value:function(e,t){return this.updatePosition=!1}},{key:"render",value:function(){this.getState();return{canvas:this.context.canvas,angle:0,r:0,offsetX:this.center,offsetY:this.center}}},{key:"renderToContext",value:function(e,t,a){e.fillStyle="#999999";var n,r=Object(o.a)(t.level.level);try{for(r.s();!(n=r.n()).done;){var i=n.value;e.save();Math.tan(20/i.r);e.rotate(i.angle),e.fillRect(i.r-20,-20,40,40),e.restore()}}catch(c){r.e(c)}finally{r.f()}e.fillStyle="#666666",e.beginPath(),e.arc(a,a,t.level.planetRadius,0,2*Math.PI),e.fill(),e.strokeStyle="#00FF00",e.lineWidth=10,e.beginPath(),e.arc(a,a,t.level.goalRadius,0,2*Math.PI),e.stroke();for(var s=0;s<this.points.length;s++){var l=this.points[s],h=this.randoms[s];e.fillStyle="hsl(0, 0%, "+Math.round(100*h)+"%)",e.fillRect(a+l.posX,a+l.posY,5,5)}}}]),a}(k),O=[function(e){Object(R.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(M.a)(this,a),(n=t.call(this,e)).points=p(2e4,4e3),n}return Object(b.a)(a,[{key:"shouldCanvasUpdate",value:function(e,t){return this.updateCanvas=!1}},{key:"shouldPositionUpdate",value:function(e,t){return this.updatePosition=!1}},{key:"renderToContext",value:function(e,t){e.fillStyle="#FFFFFF";var a,n=.9*t.player.cameraR-3e3,r=t.player.cameraAngle,i=n*Math.cos(r),s=n*Math.sin(r),l=Object(o.a)(this.points);try{for(l.s();!(a=l.n()).done;){var h=a.value,c=Math.round(h.r*Math.cos(h.angle)+i),u=Math.round(h.r*Math.sin(h.angle)+s);e.fillRect(c,u,1,1)}}catch(d){l.e(d)}finally{l.f()}}}]),a}(k),A,P],E=function(){var e=document.getElementById("root"),t=document.createElement("canvas");return t.width=window.innerWidth,t.height=window.innerHeight,window.onresize=function(e){t.width=window.innerWidth,t.height=window.innerHeight},e.appendChild(t),t.getContext("2d")}();Object(s.createLogger)({predicate:function(e,t){return"RENDER_TICK"!==t.type&&"GAME_TICK"!==t.type}});r=Object(i.a)(w);var C,I,j=O.map((function(e){return new e(r.getState)})),x=(C=r.getState,I=E,function(){var e=n;if((n=C())!==e&&j.reduce((function(e,t){return e||t.shouldComponentUpdate()}),!1)){I.fillStyle="#000",I.fillRect(0,0,I.canvas.width,I.canvas.height),I.save();var t=I.canvas;I.translate(t.width/2,t.height/2),I.scale(1,-1),I.translate(0,-n.player.cameraR);var a=-n.player.cameraAngle+Math.PI/2;I.rotate(a);var r,i=Object(o.a)(j);try{for(i.s();!(r=i.n()).done;)r.value.renderToContext(I,n,0)}catch(s){i.e(s)}finally{i.f()}I.restore()}});window.requestAnimationFrame((function e(t){x(),window.requestAnimationFrame(e)})),window.setInterval((function(){var e,t=r.getState();t.player.posR>t.level.goalRadius&&r.dispatch({type:"LEVEL_WIN"}),r.dispatch({type:"GAME_TICK",scale:e})}),10),window.onkeydown=function(e){"r"===e.key&&r.dispatch({type:"RESET_LEVEL"}),r.dispatch({type:"KEY_DOWN",key:e.key})},window.onkeyup=function(e){return r.dispatch({type:"KEY_UP",key:e.key})},document.body.addEventListener("touchstart",(function(e){e.preventDefault(),r.dispatch(l(e.touches,window.innerWidth,window.innerHeight))}),{passive:!1}),document.body.addEventListener("touchend",(function(e){e.preventDefault(),r.dispatch(l(e.touches,window.innerWidth,window.innerHeight))}),{passive:!1}),document.body.addEventListener("touchcancel",(function(e){e.preventDefault(),r.dispatch(l(e.touches,window.innerWidth,window.innerHeight))}),{passive:!1})}},[[10,1,2]]]);
//# sourceMappingURL=main.7140d3d0.chunk.js.map