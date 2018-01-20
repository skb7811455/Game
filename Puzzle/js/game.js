      var sign=false;
      var imgs =[
        "./imgs/img0.jpg",
        "./imgs/img1.jpg",
        "./imgs/img2.jpg",
        "./imgs/img3.jpg",
        "./imgs/img4.jpg",
        "./imgs/img5.jpg",
        "./imgs/img6.jpg",
        "./imgs/img7.jpg",
        "./imgs/img8.jpg",
        "./imgs/img9.jpg",
        "./imgs/img10.jpg",
        "./imgs/img11.jpg",
        "./imgs/img12.jpg",
        "./imgs/img14.jpg",
        "./imgs/img18.jpg",
        "./imgs/img19.jpg",
        "./imgs/img20.jpg",
        "./imgs/img21.jpg",
        "./imgs/img22.jpg"
      ]
      var EventUtil = {
          addHandler:function(element,type,handler){
            if(element.addEventListener){
              element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
              element.attachEvent("on"+type,handler);
            }else{
              element["on"+type]=handler;
            }
          },
          removeHandler:function(element,type,handler){
            if(event.removeEventListener){
              element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
              element.detachEvent("on"+type,handler);
            }else{
              element["on"+type]=null;
            }
          },
          getEvent:function(event){
            return event?event:window.event;
          },
          getTarget:function(event){
            return event.target||event.srcElement;
          },
          preventDefault:function(event){
            if(event.preventDefault){
              event.preventDefault();
            }else{
              event.returnValue=false;
            }
          },
          stopPropagation:function(event){
            if(event.stopPropagation){
              event.stopPropagation();
            }else{
              event.cancelBubble=true;
            }
          }
      }
      function createBox(id,side,rightX,rightY){
        var o=new Object();
        o.ID=id;
        o.side=side;
        o.rightX=rightX;
        o.rightY=rightY;
        o.posX=rightX;
        o.posY=rightY;
        o.canvasId=id;
        
        o.getId=function(){
          return this.ID;
        }
        o.getCanvasId=function(){
          return this.canvasId;
        }
        o.setCanvasId=function(newID){
           this.canvasId=newID;
        }
        o.getPositionX=function(){
          return this.posX;
        }
        o.getPositionY=function(){
          return this.posY;
        }
        o.setPostionXY=function(x,y){
          this.posX=x;
          this.posY=y;
          //this.dom.style.left=x+"px";
          //this.dom.style.top=y+"px";
        }
        o.check=function(){
          if(this.canvasId==this.ID){
            return true;
          }else{
            return false;
          }
        }
        
        return o;
      }
      function createWrapper(side,posX,posY,dom){
        var o=new Object();
        o.side=side;
        o.posX=posX;
        o.canvasArr=[];
        o.posY=posY;
        o.dom=dom;
      
        o.init=function(){
          dom.style.left=this.posX;
          dom.style.top=this.posY;
          dom.style.width=this.side;
          dom.style.height=this.side;
          dom.style.position="relative";
        }
        o.addCanvas=function(canvas){
          this.canvasArr.push(canvas);
        }
        o.swapBox=function(box1,box2,img){
          var canvasID2=box2.getCanvasId();
          var canvasID1=box1.getCanvasId();
          this.canvasArr[canvasID1].draw(box2,img);
          box2.setCanvasId(canvasID1);
          this.canvasArr[canvasID2].draw(box1,img);
          box1.setCanvasId(canvasID2);

          this.canvasArr[canvasID1].setDomId(box2.getId());
          this.canvasArr[canvasID2].setDomId(box1.getId());
        }
        o.random=function(boxes,img){          
           for(var i=0;i<boxes.length;i++){
              var r1=Math.floor(Math.random()*boxes.length);
              var r2=Math.floor(Math.random()*boxes.length);
              this.swapBox(boxes[r1],boxes[r2],img);
           }
        }
        o.getPosX=function(){
          return this.posX;
        }
        o.getPosY=function(){
          return this.posY;
        }
        o.getSide=function(){
          return this.side;
        }
        return o;
      }
      function createCanvas(id,side,posX,posY,dom,divDom){
        var o=new Object();
        o.id=id;
        o.side=side;
        o.posX=posX;
        o.posY=posY;
        o.dom=dom;
        o.divDom=divDom;
        o.setDomId=function(id){
          this.divDom.id=id;
        }
        o.getDomId=function(){
          return this.divDom.id;
        }
        o.init=function(){
          dom.width=this.side;
          dom.height=this.side;
          divDom.id=id;
          divDom.style.draggable="true";
          divDom.style.left=this.posX+"px";
          divDom.style.top=this.posY+"px";
          divDom.width=this.side;
          divDom.height=this.side;
          divDom.style.border="1px blue solid ";
          divDom.style.minHeight=this.side+"px";
          divDom.style.minWidth=this.side+"px";
          divDom.style.position="absolute";
        }
        
        o.draw=function(box,img){
         
          var context=dom.getContext("2d");
          context.drawImage(img,box.getPositionX(),box.getPositionY(),side,side,0,0,side,side);
        }
        return o;
      }
      function check(boxes){
          for(var i=0;i<boxes.length;i++){
            if(!boxes[i].check()) return false;
          }
          return true;
      }      
      function freshDom(){
          var main=document.createElement("div");
          main.id="main";
          main.class="main";

          document.getElementsByClassName("game")[0].replaceChild(main,document.getElementById("main"));
      }
      function createRecord(easyDom,normalDom,difficultDom,hardDom){
        var o=new Object();
        o.easyDom=easyDom;
        o.normalDom=normalDom;
        o.difficultDom=difficultDom;
        o.hardDom=hardDom;
        o.showRecord=function(){
          localStorage.easyRecord?easyDom.firstChild.nodeValue=localStorage.easyRecord:0;
          localStorage.normalRecord?normalDom.firstChild.nodeValue=localStorage.normalRecord:0;
          localStorage.difficultRecord?difficultDom.firstChild.nodeValue=localStorage.difficultRecord:0;
          localStorage.hardRecord?hardDom.firstChild.nodeValue=localStorage.hardRecord:0;
        }
        o.savaUserRecord=function(newRecord,n){
          if(newRecord!=0){
           switch(n){
              case 3:
              if(!localStorage.easyRecord||newRecord<localStorage.easyRecord){
                localStorage.easyRecord=newRecord;
                this.showRecord();
                //easyDom.firstChild.nodeValue=localStorage.easyRecord;
                
              }
              break;
              case 4:
              if(!localStorage.normalRecord||newRecord<localStorage.normalRecord){
                localStorage.normalRecord=newRecord;
                this.showRecord();
               // normalDom.firstChild.nodeValue=localStorage.normalRecord;                          
              }
              break;
              case 5:
              if(!localStorage.difficultRecord||newRecord<localStorage.difficultRecord){
                localStorage.difficultRecord=newRecord; 
                this.showRecord();
               // difficultDom.firstChild.nodeValue=localStorage.difficultRecord;           
              }
              break;
              case 8:
              if(!localStorage.hardRecord||newRecord<localStorage.hardRecord){
                localStorage.hardRecord=newRecord;
                this.showRecord();
               // hardDom.firstChild.nodeValue=localStorage.hardRecord;
              }
              break;
            }
          }
        }
          return o;
      }
      function createTime(timeDom,totalTime){
        var o=new Object();
        o.timer=null;
        o.timeDom=timeDom;
        o.initTime=totalTime;
        o.totalTime=totalTime;
        
        o.updateClock=function(){
          if(totalTime>0){
              totalTime-=1;
              timeDom.firstChild.nodeValue=totalTime;
            }else{
              clearInterval(timer);
          }
        }
        o.startTime=function(time){
            clearInterval(timer);
            //totalTime=60;
            totalTime=time;
            initTime=time;
           // timeDom=document.getElementById("timer");
            timer=setInterval(this.updateClock,1000); 
        }
        o.getTotalTime=function(){
            return totalTime;
        }
        o.getInitTime=function(){
            return this.initTime;
        }
        return o;
      }
      function createGame(timeObject,recorder){
          var o=new Object();
          o.currentBox=null;
          o.img = null; 
          o.wrapper=null;
          o.boxes=null;
          o.timeObject=timeObject;
          o.recorder=recorder;
          o.key=4;
          o.changeImg=function(){
            for(var i=0;i<imgs.length;i++){
              var r=Math.floor(Math.random()*imgs.length);
              img.src=imgs[r];
            }
          }
          o.startTime=function(totalTime){
            timeObject.startTime(totalTime);
          }
          o.init=function(n){                
            
            key=n;

            var img = document.getElementById("img"); 
            var wrapDom=document.getElementById("main");
            var wrapSide=580;    

            wrapper=new createWrapper(wrapSide,0,0,wrapDom);
            wrapper.init();
            var side=wrapSide/n;
            boxes=[];
            var  k=0;
            for(var i=0;i<n;i++){
              var posY=side*i;
                for(var j=0;j<n;j++){
                  var posX=side*j;
                  var divDom = document.createElement('div');
                  var canvasDom = document.createElement('canvas');
                  var canvas=createCanvas(k,side,posX,posY,canvasDom,divDom);
                  canvas.init();
                  wrapper.addCanvas(canvas);            
                  this.addDivAction(divDom);                 
                  var box=createBox(k,side,posX,posY);
                  k++;
                  boxes.push(box);
                  canvas.draw(box,img);
                  wrapDom.appendChild(divDom);
                  wrapDom.appendChild(canvasDom);
                }
            } 
            wrapper.random(boxes,img);        
          }
          o.addDivAction=function(divDom){
                  EventUtil.addHandler(divDom,"touchstart",function(event){
                    if(sign==false){
                    currentBox=event.target.id;
                    sign=true;
                    }     
                  });
                  EventUtil.addHandler(divDom,"touchend",function(event){
                    if(currentBox!=event.target.id&&sign==true){
                       wrapper.swapBox(boxes[currentBox],boxes[event.target.id],img);
                       var totalTime=timeObject.getTotalTime();
                       var initTime=timeObject.getInitTime();
                      if(totalTime>0&&check(boxes)){
                        recorder.savaUserRecord(initTime-totalTime,key);
                        alert("挑战成功！"); 
                      }else if(totalTime==0){
                        alert("超时,挑战失败！");
                      }
                      sign=false;
                    }     
                  });
                  EventUtil.addHandler(divDom,"dragstart",function(event){
                    currentBox=event.target.id;      
                  });
                  EventUtil.addHandler(divDom,"dragover",function(event){
                    EventUtil.preventDefault(event);
                  });
                  EventUtil.addHandler(divDom,"dragenter",function(event){
                    EventUtil.preventDefault(event);
                  });
                  EventUtil.addHandler(divDom,"drop",function(event){
                    EventUtil.preventDefault(event);
                      wrapper.swapBox(boxes[currentBox],boxes[event.target.id],img);
                      var totalTime=timeObject.getTotalTime();
                      var initTime=timeObject.getInitTime();
                      if(check(boxes)&&totalTime>0){
                        recorder.savaUserRecord(initTime-totalTime,key);
                        alert("挑战成功！");  
                      }else if(totalTime==0){
                        alert("超时,挑战失败！");
                      }
                  });
          }
          return o;
      }        
      function createButtons(buttonDiv,game){
        var o=new Object(); 
        o.buttonDiv=buttonDiv;
        o.game=game;
        o.clickHandler=function(event){            
            switch(event.target.id){
                  case "easy":
                    freshDom();
                    game.init(3);
                    break;
                  case "normal":
                    freshDom();
                    game.init(4);
                    break;
                  case "difficult":
                    freshDom();
                    game.init(5);
                    break;
                  case "hard":
                    freshDom();
                    game.init(8);
                    break;
                  case "random":
                    wrapper.random(boxes,img);
                    break;
                  case "change":
                    game.changeImg();
                    break;
                  case "start":
                    game.startTime(60);
                    wrapper.random(boxes,img);
                    break;
            };      
        }  
        o.init=function(){
          EventUtil.addHandler(buttonDiv,"click",this.clickHandler)
        }
        return o;
      }
      window.onload=function(){

        var timeDom=document.getElementById("timer"); 
        var timeObject=createTime(timeDom,60);  

        var easyDom=document.getElementById("easyRecord");
        var normalDom=document.getElementById("normalRecord");
        var difficultDom=document.getElementById("difficultRecord");
        var hardDom=document.getElementById("hardRecord");

        var recorder=createRecord(easyDom,normalDom,difficultDom,hardDom);

        var game=createGame(timeObject,recorder);
        game.init(4);

        var buttonDiv=document.getElementById("choice");
        var buttons=createButtons(buttonDiv,game);
        buttons.init(); 
              
        recorder.showRecord();
      }