let myGame={
    on:false,
    start:0,
    strict:0,
    arr:[],
    count:0,
    set_value:["green","red","blue","yellow"],
    set_start:["#297a33","#a5222d","#d8d63c","#234c8e"],
    set_blink:["#12ed71","#f41202","#fcf900","#0238fc"],
    play_over:0,
    click:[]
}

    document.getElementById("on").addEventListener("click",
    function()
    {
         myGame.on=document.getElementById("on").checked;
         if(!myGame.on)
        {
            myGame.arr=[];
            myGame.click=[];
            count=0;
            document.getElementById("count").innerHTML="!!";
            document.getElementById("light").style.background="#471c1c";
        }

    });
    document.getElementById("start").addEventListener("click",
    function()
    {
        if(myGame.on)
        {
             myGame.start=1;
             //console.log(myGame.start);
             myGame.arr=[];
             myGame.click=[];
             createString();
        }
        else
        {
            myGame.start=0;   
        }
    });
    document.getElementById("strict").addEventListener("click",
    function()
    {
        if(myGame.on && myGame.strict==0)
        {
             myGame.strict=1
             document.getElementById("light").style.background="red";
        }
        else
        {
            myGame.strict=0;
            document.getElementById("light").style.background="#471c1c";   
        }
    });
    
function createString()
{
    myGame.arr.push(Math.floor(Math.random() * 4));
    myGame.count=myGame.arr.length;
    if(myGame.count>20)
    {
        setTimeout(function(){alert("you won");},400);
        myGame.arr=[];
        myGame.click=[];
        document.getElementById("count").innerHTML="!!";
        myGame.count=0;
        return;
    }
    document.getElementById("count").innerHTML=myGame.count;
    glow();
}
function disable(x)
{
    document.getElementById("simon0").disable=x;
    document.getElementById("simon1").disable=x;
    document.getElementById("simon2").disable=x;
    document.getElementById("simon3").disable=x;
}
function glow()
{
    disable(false);
    for(let i=0;i<myGame.arr.length;i++)
    {
        let simon=document.getElementById("simon"+myGame.arr[i]);
        let k=1000+(i*1000);
        setTimeout(function()
        {
            if(myGame.on)
            {
                simon.style.background=myGame.set_blink[myGame.arr[i]];
                document.getElementById(myGame.set_value[myGame.arr[i]]).play();

            }
            setTimeout(function() 
            {
                if(myGame.on)
                {
                    simon.style.background=myGame.set_start[myGame.arr[i]];  
                }
            },600 );
            if((i===myGame.arr.length-1) && myGame.on)
            {
                console.log("enter");

            }
            if(i==myGame.arr.length-1 && myGame.on)
            {
                disable(true);
            }
        }, k);
    }
} 
    //myGame.play_over=setInterval(glow,20000);
    document.getElementById("simon0").addEventListener("click",
    function()
    {
        var simon=document.getElementById("simon0");
        console.log("respense take",simon.value);
        simon.style.background=myGame.set_blink[0];
        document.getElementById("green").play();
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[0];
                         
            },300 );
        myGame.click.push(0);
        checking();
    });
    document.getElementById("simon1").addEventListener("click",
    function()
    {
        var simon=document.getElementById("simon1");
        console.log("respense take",simon.value);
        simon.style.background=myGame.set_blink[1];
        document.getElementById("red").play();
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[1];     
            },300 );
        myGame.click.push(1);
        checking();
    });
    document.getElementById("simon2").addEventListener("click",
    function()
    {
        var simon=document.getElementById("simon2");
        document.getElementById("yellow").play();
        console.log("respense take",simon.value);
        simon.style.background=myGame.set_blink[2];
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[2];     
            },300 );
        myGame.click.push(2);
        checking();
    });
    document.getElementById("simon3").addEventListener("click",
    function()
    {
        var simon=document.getElementById("simon3");
        document.getElementById("blue").play();
        console.log("respense take",simon.value);
        simon.style.background=myGame.set_blink[3];
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[3];     
            },300 );
        myGame.click.push(3);
        checking();
    });

function checking()
{
    console.log("click length:"+myGame.click.length);
    console.log("myGame.arr:"+myGame.arr);
    console.log("myGame.click:"+myGame.click);
    for(let i=0;i<myGame.click.length;i++)
    {
        if(!(myGame.click[i]===myGame.arr[i]))
        {
            setTimeout(function(){document.getElementById("wrong").play();alert("wrong answer");},400);
            myGame.click=[];
            if(myGame.strict===1)
            {
                myGame.arr=[];
                setTimeout(createString(),3000);
            }
            else
            {
                glow();
            }

        }
        else if((myGame.arr.length===myGame.click.length)&&(i===(myGame.arr.length-1)) && myGame.on)
        {
            setTimeout(createString(),3000);
            myGame.click=[];
        }
    }
}
