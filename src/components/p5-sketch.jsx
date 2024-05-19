import React from 'react';
import Sketch from 'react-p5';

function P5Sketch({seed}) {



    const canvaswidth =  window.innerWidth*0.8; 
    const canvasheight =  window.innerHeight*0.8; 

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvaswidth, canvasheight).parent(canvasParentRef);
        p5.background(0,0,0);
    }

    const draw = (p5) => {
        if(seed){
            p5.randomSeed(seed);
        }
        //
        p5.frameRate(1);
        let colorDistrabution = [[20,20,20],[200,200,200],[210,210,210],[230,230,230],[250,250,250]]
        
        function createrandomnumfromdist(r,distrabution,min,max){
            // distrabution = [(p1,x1),(p2,x2)]
            // validation
            if (min>max){
                p5.text("wrong min max", 400, 100);
               return 0
            }
            let prevx = min;
            for (let i = 0; i < distrabution.length; i++) {
                
                if(distrabution[i][1]<prevx||distrabution[i][1]>max){
                    p5.text("wrong order",400, 100);
                    return  0
                }
                prevx = distrabution[i][1]
              
              }
             let prevsize = min;
            let prevp = 0;
            // find segment 
            for (let i = 0; i < distrabution.length; i++) {

                if(r>prevx && distrabution[i][0]>r){
                  
                   return (p5.random(  prevsize,distrabution[i][1]))
                }
                prevp  = distrabution[i][0]
                prevsize= distrabution[i][1]
              }
            
            return p5.random(distrabution[ distrabution.length-1][1],max);   
        }
        function solvelineandcircle(x1,y1,r,angle,movein){
            let perpangle = angle+p5.HALF_PI
            let offx = p5.cos(perpangle)*(r-movein)
            let offy = p5.sin(perpangle)*(r-movein)
            return [[x1+offx,y1+offy],[x1-offx,y1-offy]]
        }
        // function breakfrontlegs(torsox,torsoy,footx,fooy){

        // }
        function fillcurvin(res,depth,x1,y1,x2,y2,size1,size2,color1,color2){
            p5.stroke(color1[0],color1[1],color1[2])
            p5.fill(color1[0],color1[1],color1[2])
            for(let i = 1 ; i<=res;i++){
                p5.stroke(color1[0]/res*i+color2[0]/res*(res-i),color1[1]/res*i+color2[1]/res*(res-i)
                ,color1[2]/res*i+color2[2]/res*(res-i))
                p5.fill(color1[0]/res*i+color2[0]/res*(res-i),color1[1]/res*i+color2[1]/res*(res-i)
                ,color1[2]/res*i+color2[2]/res*(res-i))
                p5.ellipse(((x1/res)*(i)+(x2/res)*(res-i)), ((y1/res)*(i)+(y2/res)*(res-i)),
                ((size1/res)*(i)+(size2/res)*(res-i))*((p5.sq(res-2*i)/(depth*res))+(((depth-1)/depth)*res))/res );
            }
            }
        function fillcurvout(res,depth,x1,y1,x2,y2,size1,size2,color1,color2){
            p5.stroke(color1[0],color1[1],color1[2])
            p5.fill(color1[0],color1[1],color1[2])
            for(let i = 1 ; i<=res;i++){
                p5.stroke(color1[0]/res*i+color2[0]/res*(res-i),color1[1]/res*i+color2[1]/res*(res-i)
                ,color1[2]/res*i+color2[2]/res*(res-i))
                p5.fill(color1[0]/res*i+color2[0]/res*(res-i),color1[1]/res*i+color2[1]/res*(res-i)
                ,color1[2]/res*i+color2[2]/res*(res-i))
                p5.ellipse(((x1/res)*(i)+(x2/res)*(res-i)), ((y1/res)*(i)+(y2/res)*(res-i)),
                ((size1/res)*(i)+(size2/res)*(res-i))*((-1*p5.sq(res-2*i)/(depth*res))+(((depth-1)/depth)*res))/res );
            }
            }
        function createtailpoints(number,x,y,angle,distance){
            let tailpoints = []
            let temp =[]
            let angledist = [[0.05,-(p5.PI)/4],[0.1,-(p5.PI)/16],[0.8,0],[0.1,p5.PI/4]] 
            let newdistance = distance
            let distancedist = [[0.05,-distance/4],[0.1,-distance/16],[0.8,distance/16],[0.1,distance/4]]
            temp.push(x)
            temp.push(y)
            tailpoints.push(temp)
            temp.push(x)
            temp.push(y)
            tailpoints.push(temp)
            for(let i = 2 ; i<=number;i++){
                let temp =[] 
                let anglevarent = createrandomnumfromdist(p5.random(),angledist,-p5.PI/2,p5.PI/2)
                if(p5.random()>0.5){
                    angle =  angle +anglevarent;
                }else{
                    angle =  angle -anglevarent;
                }
               
                temp.push(x+distance*p5.cos(angle))
                temp.push(y+distance*p5.sin(angle))
                tailpoints.push(temp)
                x = x+distance*p5.cos(angle)
                y = y+distance*p5.sin(angle)
                p5.print(anglevarent);
               
                newdistance = newdistance + createrandomnumfromdist(p5.random(),distancedist,-distance/2,distance/2)
            }
           return tailpoints
        }



        let avecanvassize = p5.sqrt(canvaswidth*canvasheight);
        let maxsizfits = (p5.min( avecanvassize,canvaswidth, canvasheight))/4
        let sizedis = [[0.05,maxsizfits*7/16],[0.9,maxsizfits*9/16]]
            
       
        p5.background(0);
        let randomnum = p5.random();
        let maintorsosize = createrandomnumfromdist( randomnum,sizedis, maxsizfits/4, maxsizfits);
        let mainx = canvaswidth/2
        let mainy = canvasheight/2
       
            
        let hipsizedis = [[0.5,maintorsosize*1/16],[0.1,maintorsosize*7/8]]
        let hipsize =  createrandomnumfromdist( randomnum,hipsizedis, 0,maintorsosize*5/4);
        let hipsddis =  [[0.5,p5.PI]]
        let hipdistdis = [[0.5,maintorsosize*7/16],[0.9,maintorsosize*8/16]]
        let hipsd = createrandomnumfromdist( randomnum,hipsddis, 0,2*p5.PI);
        let hipsdist =  createrandomnumfromdist( randomnum, hipdistdis,maintorsosize*1/16,maintorsosize);
        let hipsx = mainx + hipsdist*p5.cos(hipsd);
        let hipsy = mainy + hipsdist*p5.sin(hipsd)
       // p5.ellipse(hipsx,hipsy,hipsize );

        
        let headsizedis = [[0.1,maintorsosize*1/16],[0.955,maintorsosize*5/8]]
        let headsize =  createrandomnumfromdist( randomnum,headsizedis, 0,maintorsosize);
        let headddis =  [[0.5,p5.PI]]
        let headdistdis = [[0.5,maintorsosize*7/16],[0.9,maintorsosize*8/16]]
        let headd = createrandomnumfromdist( randomnum,headddis, 0,2*p5.PI);
        let headdist =  createrandomnumfromdist( randomnum, headdistdis,maintorsosize*1/16,maintorsosize);
    
        let headx = mainx + headdist*p5.cos(headd);
        let heady = mainy + headdist*p5.sin(headd);
        

      
        // tail
        let numtailpoints = Math.floor(p5.random(2,5));
        let tailpoints = createtailpoints(numtailpoints,hipsx,hipsy,hipsd,hipsdist);
     
       

        //back legs
     
        let blegd = 1/2*p5.PI;
        let blegsize = maintorsosize*15/16
        let blegdist = 100
        let blegx = hipsx+blegdist*p5.cos(blegd)
        let blegy = hipsy+blegdist*p5.sin(blegd)
        let backlegpoints = solvelineandcircle(blegx,blegy,blegsize/2,blegd,10);
        let torsobacklegspoints = solvelineandcircle(hipsx,hipsy,hipsize/2,blegd,15);
        //front legs
        let flegd = 1/2*p5.PI;
        let flegsize = maintorsosize*15/16
        let flegdist = 100
        let flegx = mainx+flegdist*p5.cos(flegd)
        let flegy = mainy+flegdist*p5.sin(flegd)
        let frontlegpoints = solvelineandcircle(flegx,flegy,flegsize/2,flegd,10);
        let torsofrontlegspoints = solvelineandcircle(mainx,mainy,maintorsosize/2,flegd,15);
        // face
      
      
        let eyeangledist = [[.95,p5.PI*8/32]]
        let eyeangle =  createrandomnumfromdist( randomnum,eyeangledist, p5.PI*5/32, p5.PI/4);
        let eyedistancedist = [[0.5,headsize*6/32]]
        let eyedistance =createrandomnumfromdist( randomnum,eyedistancedist,  headsize/32, headsize*7/32);
       


       
        // ears
        let earsize = p5.random(20,headsize*1/2)

        //tails
        p5.noFill();
        p5.stroke( [colorDistrabution[1][0],colorDistrabution[1][1],colorDistrabution[1][2]])
        p5.strokeWeight( 10+Math.floor(p5.random(0,13)));
        p5.beginShape();
        for(let i = 0 ; i<tailpoints.length ;i++){
            p5.curveVertex(tailpoints[i][0], tailpoints[i][1]);
        } 
        p5.endShape();
        //Ear Types
        function createMouseEar(){
            p5.fill([colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]])
            p5.ellipse(headx-(headsize/2)*p5.cos(p5.PI/2+eyeangle), heady-(headsize/2)*p5.sin(p5.PI/2+eyeangle), earsize);
            p5.ellipse(headx-(headsize/2)*p5.cos(p5.PI/2-eyeangle), heady-(headsize/2)*p5.sin(p5.PI/2-eyeangle), earsize);
        }
        function createRabbitEar(){
            p5.fill([colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]])
            fillcurvout(20,10,
                headx-(headsize/2)*p5.cos(p5.PI/2+eyeangle)-earsize/4,
                heady-(headsize/2)*p5.sin(p5.PI/2+eyeangle)+20,
                headx-(headsize/2)*p5.cos(p5.PI/2+eyeangle)-earsize/4,
                heady-(headsize/2)*p5.sin(p5.PI/2+eyeangle)-earsize*1.5,earsize,earsize,
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]]);

            fillcurvout(20,10,
                headx-(headsize/2)*p5.cos(p5.PI/2-eyeangle)+earsize/4,
                heady-(headsize/2)*p5.sin(p5.PI/2-eyeangle)+20,
                headx-(headsize/2)*p5.cos(p5.PI/2-eyeangle)+earsize/4,
                heady-(headsize/2)*p5.sin(p5.PI/2-eyeangle)-earsize*1.5,earsize,earsize,
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]]);           
        }
        function createCatEar(){
            p5.fill([colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]])

            let angleoffset = p5.random(0,eyeangle*3/4)
            fillcurvout(20,10,
                headx-(headsize/2-10)*p5.cos(p5.PI/2+eyeangle),
                heady-(headsize/2-10)*p5.sin(p5.PI/2+eyeangle),
                headx-(headsize/2+earsize)*p5.cos(p5.PI/2+eyeangle-angleoffset),
                heady-(headsize/2+earsize)*p5.sin(p5.PI/2+eyeangle-angleoffset),earsize*1.5,earsize*1.5/8,
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]]);

            fillcurvout(20,10,
                headx-(headsize/2-10)*p5.cos(p5.PI/2-eyeangle),
                heady-(headsize/2-10)*p5.sin(p5.PI/2-eyeangle),
                headx-(headsize/2+earsize)*p5.cos(p5.PI/2-eyeangle+angleoffset),
                heady-(headsize/2+earsize)*p5.sin(p5.PI/2-eyeangle+angleoffset),earsize*1.5,earsize*1.5/8,
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
                [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]]);

           
        }
        // Snout Types
        function createCowsnout(){
           
            p5.fill([colorDistrabution[4][0],colorDistrabution[4][1],colorDistrabution[4][2]])
            let snoutwidth = p5.random(20,headsize*1/2)
            let snoutheight = p5.random(snoutwidth-20,headsize*1/2)
           
            p5.print(snoutwidth);
            p5.ellipse(headx-(headsize/4)*p5.cos(p5.PI*3/2), heady-(headsize/4)*p5.sin(p5.PI*3/2), snoutwidth,snoutheight);
            let spacing = p5.random(snoutwidth*10/64,snoutwidth*20/64)
            p5.fill([colorDistrabution[0][0],colorDistrabution[0][1],colorDistrabution[0][2]])
            p5.ellipse(headx-(headsize/4)*p5.cos(p5.PI*3/2)+spacing, heady-(headsize/4)*p5.sin(p5.PI*3/2), snoutwidth/4,snoutheight/4);
            p5.ellipse(headx-(headsize/4)*p5.cos(p5.PI*3/2)-spacing, heady-(headsize/4)*p5.sin(p5.PI*3/2), snoutwidth/4,snoutheight/4);
            return 1
        
        }
        function createSnootsnout(){
            let snoutwidth = p5.random(20,headsize*1/2)
            let snoutheight = p5.random(snoutwidth-20,headsize*1/2)
            let snoutoffset = p5.random(0,headsize*3/4)
    
            fillcurvin(15,10,headx-(headsize/4)*p5.cos(p5.PI*3/2),heady-(headsize/4+snoutoffset)*p5.sin(p5.PI*3/2)
            ,headx,heady ,snoutwidth,headsize,
            [colorDistrabution[4][0],colorDistrabution[4][1],colorDistrabution[4][2]],
            [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]])

            
            p5.ellipse(headx-(headsize/4)*p5.cos(p5.PI*3/2), heady-(headsize/4+snoutoffset)*p5.sin(p5.PI*3/2), snoutwidth,snoutwidth);
 
            let spacing = p5.random(snoutwidth*10/64,snoutwidth*20/64)
            p5.fill(colorDistrabution[0][0],colorDistrabution[0][1],colorDistrabution[0][2])
            p5.ellipse(headx, heady-(headsize/4+snoutoffset)*p5.sin(p5.PI*3/2), snoutwidth/2,snoutheight/2);
            
            return 1
        
        }
      
       
       
       
        // Legs
        p5.strokeWeight(0);
      
       


        

        fillcurvin(20,10,backlegpoints[1][0],backlegpoints[1][1],torsobacklegspoints[1][0],torsobacklegspoints[1][1],15,hipsize/4,
        [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]],
        [colorDistrabution[1][0],colorDistrabution[1][1],colorDistrabution[1][2]]);
        fillcurvin(20,10,backlegpoints[0][0],backlegpoints[0][1],torsobacklegspoints[0][0],torsobacklegspoints[0][1],15,hipsize/4,
        [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]],
        [colorDistrabution[1][0],colorDistrabution[1][1],colorDistrabution[1][2]]);
        p5.ellipse(hipsx,hipsy,hipsize );
       
        // body
        fillcurvin(8,20,mainx,mainy,hipsx,hipsy,maintorsosize,hipsize,
            [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]],
            [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]]);
         // torso
         p5.ellipse(mainx, mainy,maintorsosize );

         // front legs
        fillcurvin(20,10,frontlegpoints[1][0],frontlegpoints[1][1],torsofrontlegspoints[1][0],torsofrontlegspoints[1][1],15,hipsize/4,
        [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
        [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]]);
        fillcurvin(20,10,frontlegpoints[0][0],frontlegpoints[0][1],torsofrontlegspoints[0][0],torsofrontlegspoints[0][1],15,hipsize/4,
        [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
        [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]]);

        // neck
        fillcurvin(15,10,headx,heady,mainx,mainy,headsize,maintorsosize,
            [colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]],
            [colorDistrabution[2][0],colorDistrabution[2][1],colorDistrabution[2][2]]);
       
       
        
        //ears
        let earshapes = ["mouse","rabbit","cat"]
        let ear = Math.floor(p5.random(0,earshapes.length))
        let eardictionary ={
            "mouse":createMouseEar,
            "rabbit" : createRabbitEar,
            "cat" :createCatEar,
        }
        eardictionary[earshapes[ear]]();

        // head
        p5.fill([colorDistrabution[3][0],colorDistrabution[3][1],colorDistrabution[3][2]])
        p5.ellipse(headx, heady,headsize );
        let snoutshapes = ["cow","snoot"]
        let snout = Math.floor(p5.random(0,snoutshapes.length))
        let snoutdictionary ={
            "cow":createCowsnout,
            "snoot": createSnootsnout
        }
        p5.print(snout);
        p5.print(snoutdictionary);
        snoutdictionary[snoutshapes[snout]]();

      
       
        p5.fill([colorDistrabution[0][0],colorDistrabution[0][1],colorDistrabution[0][2]])
        p5.ellipse(headx-eyedistance*p5.cos(p5.PI/2+eyeangle), heady-eyedistance*p5.sin(p5.PI/2+eyeangle),10);
        p5.ellipse(headx-eyedistance*p5.cos(p5.PI/2-eyeangle), heady-eyedistance*p5.sin(p5.PI/2-eyeangle),10);
        
        
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;