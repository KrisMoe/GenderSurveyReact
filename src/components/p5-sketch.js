import React from 'react';
import Sketch from 'react-p5';

function P5Sketch() {



    const canvaswidth = 500; 
    const canvasheight = 400; 
    const first = true;
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvaswidth, canvasheight).parent(canvasParentRef);
        p5.background(51,51,51);
    }

    const draw = (p5) => {
        //p5.randomSeed(152);
       
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
                //p5.text(prevx, 100, 100);
                if(r>prevx && distrabution[i][0]>r){
                    // p5.text(prevx, 50, 250);
                    // p5.text(r, 50, 300);
                    // p5.text(distrabution[i][0], 50, 350);d
                   return (p5.random(  prevsize,distrabution[i][1]))
                }
                prevp  = distrabution[i][0]
                prevsize= distrabution[i][1]
              }
            //   p5.text(prevx, 50, 250);
            //   p5.text(r, 50, 300);
            //   p5.text(distrabution[distrabution.length-1][0], 50, 350);
            return p5.random(distrabution[ distrabution.length-1][1],max);   
        }
        function solvelineandcircle(x1,y1,r,angle,movein){
            let perpangle = angle+p5.HALF_PI
            let offx = p5.cos(perpangle)*(r-movein)
            let offy = p5.sin(perpangle)*(r-movein)
            return [[x1+offx,y1+offy],[x1-offx,y1-offy]]
        }
        function breakfrontlegs(torsox,torsoy,footx,fooy){

        }
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
       


        let avecanvassize = p5.sqrt(canvaswidth*canvasheight);
        let maxsizfits = (p5.min( avecanvassize,canvaswidth, canvasheight))/4
        let sizedis = [[0.05,maxsizfits*7/16],[0.9,maxsizfits*9/16]]
       
        p5.frameRate(4);
        p5.background(200);
        let randomnum = p5.random();
        let maintorsosize = createrandomnumfromdist( randomnum,sizedis, maxsizfits/4, maxsizfits);
        let mainx = 200
        let mainy = 200
        
       
       
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
        

      
        // spine

        //back legs
     
        let blegd = 1/2*p5.PI;
        let blegsize = maintorsosize*15/16
        let blegdist = 100
        let blegx = hipsx+blegdist*p5.cos(blegd)
        let blegy = hipsy+blegdist*p5.sin(blegd)
        let backlegpoints = solvelineandcircle(blegx,blegy,blegsize/2,blegd,10);
        let torsobacklegspoints = solvelineandcircle(hipsx,hipsy,hipsize/2,blegd,10);
        //front legs
        let flegd = 1/2*p5.PI;
        let flegsize = maintorsosize*15/16
        let flegdist = 100
        let flegx = mainx+flegdist*p5.cos(flegd)
        let flegy = mainy+flegdist*p5.sin(flegd)
        let frontlegpoints = solvelineandcircle(flegx,flegy,flegsize/2,flegd,10);
        let torsofrontlegspoints = solvelineandcircle(mainx,mainy,maintorsosize/2,flegd,10);
        // face
        let eyeangledist = [[.95,p5.PI*8/32]]
        let eyeangle =  createrandomnumfromdist( randomnum,eyeangledist, p5.PI*5/32, p5.PI/4);
        let eyedistancedist = [[0.5,headsize*6/32]]
        let eyedistance =createrandomnumfromdist( randomnum,eyedistancedist,  headsize/32, headsize*7/32);
        p5.strokeWeight(8);
        p5.stroke(240,240,240)
        p5.fill(240,240,240);
        p5.line(frontlegpoints [0][0],frontlegpoints [0][1],torsofrontlegspoints[0][0],torsofrontlegspoints[0][1])
        p5.line(frontlegpoints[1][0],frontlegpoints[1][1],torsofrontlegspoints[1][0],torsofrontlegspoints[1][1])
        //p5.ellipse(flegx,flegy,flegsize );
        p5.line(backlegpoints [0][0],backlegpoints [0][1],torsobacklegspoints[0][0],torsobacklegspoints[0][1])
        p5.line(backlegpoints[1][0],backlegpoints[1][1],torsobacklegspoints[1][0],torsobacklegspoints[1][1]);
        //p5.ellipse(blegx,blegy,blegsize );



        fillcurvin(20,10,backlegpoints[1][0],backlegpoints[1][1],torsobacklegspoints[1][0],torsobacklegspoints[1][1],15,hipsize/4,
        [240,240,240],[220,220,220]);
        fillcurvin(20,10,backlegpoints[0][0],backlegpoints[0][1],torsobacklegspoints[0][0],torsobacklegspoints[0][1],15,hipsize/4,
        [240,240,240],[220,220,220]);
        p5.ellipse(hipsx,hipsy,hipsize );
       
       
        fillcurvin(8,20,mainx,mainy,hipsx,hipsy,maintorsosize,hipsize,[240,240,240],[240,240,240]);
        fillcurvin(15,10,mainx,mainy,headx,heady,maintorsosize,headsize,[240,240,240],[245,245,245]);
       
        //p5.ellipse((mainx/2+hipsx/2), (mainy/2+hipsy/2),(maintorsosize/2+hipsize/2)*(3/4) );
        p5.ellipse(mainx, mainy,maintorsosize );

        fillcurvin(20,10,frontlegpoints[1][0],frontlegpoints[1][1],torsofrontlegspoints[1][0],torsofrontlegspoints[1][1],15,hipsize/4,
        [250,250,250],[240,240,240]);
        fillcurvin(20,10,frontlegpoints[0][0],frontlegpoints[0][1],torsofrontlegspoints[0][0],torsofrontlegspoints[0][1],15,hipsize/4,
        [250,250,250],[240,240,240]);


        p5.stroke(245,245,245)
        p5.fill(245,245,245);
        p5.ellipse(headx, heady,headsize );
        p5.stroke(0,0,0);
        p5.fill(0,0,0);
        p5.ellipse(headx-eyedistance*p5.cos(p5.PI/2+eyeangle), heady-eyedistance*p5.sin(p5.PI/2+eyeangle),1);
        p5.ellipse(headx-eyedistance*p5.cos(p5.PI/2-eyeangle), heady-eyedistance*p5.sin(p5.PI/2-eyeangle),1);
      
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;