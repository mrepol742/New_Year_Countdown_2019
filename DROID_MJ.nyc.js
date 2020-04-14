var countDownDate = new Date("Dec 31, 2019 24:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "404";
    document.getElementById("hours").innerHTML = "404";
    document.getElementById("minutes").innerHTML = "404";
    document.getElementById("seconds").innerHTML = "404";
    document.getElementById("mid").innerHTML = "404";
    document.getElementById("d").innerHTML = "404";
    document.getElementById("h").innerHTML = "404";
    document.getElementById("m").innerHTML = "404";
    document.getElementById("s").innerHTML = "404";      document.getElementById("k").innerHTML = "404";
  }
}, 1000);


    $(function(){
        var c= document.querySelector('canvas'),
        ctx=c.getContext('2d'),
        width=c.width=window.innerWidth,
        height=c.height=window.innerHeight,
        n_stars=500,
        stars=[],
        twinkleFactor=.6,
        maxStarRadius=8,
        fw1,fw2,fw3,fw4,fw5,fw7,fw8,fw6,
        minStrength=2,
        maxStrength=15,
        minTrails=10,
        maxTrails=40,
        particleRadius=2,
        trailLength=5,
        delay=.05,
        LIFE=140,
        g=5e-2,
        D=1e-3;
        var Particle=function(x,y,vx,vy,ax,ay,colour){
            this.x=x;
            this.y=y;
            this.vx=vx;
            this.vy=vy;
            this.ax=ax;
            this.ay=ay;
            this.life=LIFE;
            this.path=[];
            this.colour=colour;
            this.r=particleRadius;
            
            this.update=function(){
                this.life--;
                if(this.path.length>=trailLength)
                this.path.shift();
                this.path.push([this.x,this.y])
                this.vy+=this.ay;
                this.vx+=this.ax;
                this.x+=this.vx;
                this.y+=this.vy;
            }
            this.draw=function(){
                var opacity=~~(this.life*100/LIFE)/100;
                ctx.fillStyle='rgba('+this.colour+(opacity *0.4)+')';
                if(this.life>LIFE*0.95)
                ctx.fillStyle ='#0000ff';
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(this.x-this.r,this.y);
                var i=this.path.length -1;
                ctx.lineTo(this.path[0][0],this.path[0][1]);
                ctx.lineTo(this.x+this.r,this.y);
                ctx.closePath();
                ctx.fill();
                
                ctx.fillStyle ='rgba('+this.colour +opacity+')';
                if(this.life>LIFE*0.95)
                ctx.fillStyle ='#00ff00';
                ctx.beginPath ();
                ctx.arc(~this.x,~this.y,this.r,0,Math.PI*2);
                ctx.fill();
                ctx.closePath ();
            }
        }
        
        var Firework=function(){
            this.x=width*(Math.random()*0.8+0.1);
this.y=height*(Math.random()*0.8+0.1);
this.strength=Math.random()*(maxStrength -minStrength)+minStrength;
this.colour=~(Math.random()*255)+','+(Math.random()*255)+','+~(Math.random()*255)+'+';
        this.life=0;
        this.particles=(function (x,y,strength ,colour){
            var p=[];
            
            var n=~~(Math.random ()*(maxTrails - minTrails ))+minTrails;
            var ay=g;
            for(var i=n;i--;)
            {
                var ax=D;
                var angle=i*Math.PI*2/n;
                if(angle <Math.PI)ax*=-1;
                var vx=strength*Math.sin(angle );
                var vy=strength*Math.cos(angle);
                p.push(new Particle (x,y,vx,vy,ax,ay,colour ));
            }
            return p;
        })(this.x,this.y,this.strength ,this.colour);
        this.update=function(){
            this.life++;
            if(this.life<0)
            return;
    for(var i=this.particles.length ;i--;)
    {
        this.particles[i].update();
        this.particles[i].draw();
    }
        }
        };
        var Star =function(){
            this.x=Math.random()*width;
            this.y=Math.random()*maxStarRadius;
            this.b=~~(Math.random()*100)/100;
        }
        Star.prototype.draw=
        function (){
            this.b+=twinkleFactor*(Math.random()-.5);
            ctx.fillStyle ='rgba(255,0,0,'+this.b+')';
            ctx.beginPath();
            ctx.arc(~this.x,~this.y,this.r,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
        function createStars(){
            for(var i=n_stars;i--;)
            stars.push(new Star);
        }
        function main (){
            ctx.fillStyle ='#000';
            ctx.fillRect(0,0,width,height);
            for(var i=n_stars;i--;)
            stars[i].draw();
            fw1.update ();
            fw2.update ();
            fw3.update ();
            fw4.update ();
            fw5.update ();
            fw6.update ();
            fw7.update ();
            fw8.update ();
            if(fw1.life==LIFE*delay)
            {
            fw2=new Firework;
            fw4=new Firework;
            }
            if(fw5.life==LIFE*delay)
            {
            fw6=new Firework;
            fw8=new Firework;
            }
            
            if(fw2.life==LIFE*delay)
            {
            fw1=new Firework;
            fw3=new Firework;
            }
            if(fw6.life==LIFE*delay)
            {
            fw5=new Firework ;
            fw7=new Firework;
            }
            
            
            window.requestAnimationFrame(main);
        }
        function init(){
            fw1=new Firework ;
            fw2=new Firework ;
            fw3=new Firework ;
            fw4=new Firework ;
            fw5=new Firework ;
            fw6=new Firework ;
            fw7=new Firework ;
            fw8=new Firework ;
            fw2.life=-LIFE*delay;
            fw4.life=-LIFE*delay;
           fw6.life=-LIFE*delay;
           fw8.life=-LIFE*delay;
            
            createStars ();
            main();
            
        }
        init();
    });