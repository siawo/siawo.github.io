let myGame=
{
    on:false,
    start:document.getElementById("start"),
    start_val:0,
    strict:document.getElementById("strict"),
    strict_val:0,
    arr:[],
    count:document.getElementById("count"),
    count_value:0,
    set_value:["green","red","yellow","blue"],
    set_start:["#47ad4c","#9b1414","#d6c020","#37609e"],
    set_blink:["#26ff00","#ff0000","#f8ff32","#00bbff"],
    click:[],
    button:[],
    counter:0
}
for(let i=0;i<4;i++)
{
    myGame.button[i]=document.getElementById("simon"+i);
}
function on(on)
{   
    myGame.on=on.checked;
    if(myGame.on)
    {
        myGame.start.disabled=false;
        myGame.strict.disabled=false;
        myGame.count.style.opacity=1;
    }
    else
    {
        myGame.start.disabled=true;
        myGame.strict.disabled=true;
        myGame.start_val=0;
        for(let i=0;i<myGame.set_start.length;i++)
        {
            myGame.button[i].style.background=myGame.set_start[i];
        }
        disable(true);
        myGame.count.innerHTML="- -";
        myGame.count.style.opacity=0.4;
        document.getElementById("light").style.background="#471c1c";   
    }
}
function reset()
{
    if(myGame.on)
    {
        myGame.start_val=1;
        myGame.count.innerHTML=myGame.count_value;
        myGame.arr=[];
        myGame.click=[];
        setTimeout(createString,1000);
    }

}
function set()
{
    if(myGame.on)
    {
        if(myGame.strict_val==0)
        {
            myGame.strict_val=1;
            document.getElementById("light").style.background="red";
        }
        else
        {
            myGame.strict_val=0;
            document.getElementById("light").style.background="#471c1c";
        }
    }
}
function createString()
{
    myGame.arr.push(Math.floor(Math.random() * 4));
    myGame.count_value=myGame.arr.length;
    if(myGame.count_value>20)
    {
        setTimeout(function()
            {
                myGame.count.innerHTML="WON";
                reset();
            },400);
        return;
    }
    myGame.count.innerHTML=myGame.count_value;
    glow();
}
function disable(x)
{
    for(let i=0;i<4;i++)
    {
        myGame.button[i].disabled=x;
    }
}
function glow()
{
    disable(true);
    for(let i=0;i<myGame.arr.length;i++)
    {
        let simon=myGame.button[myGame.arr[i]];
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
                if(i==(myGame.arr.length-1) && myGame.on)
                {
                disable(false);
                }
            },600 );
        }, k);
    }
}
function click_button(simon)
{
    if(!simon.disabled)
    {
        var index=myGame.set_value.indexOf(simon.value)
        document.getElementById(simon.value).play();
        myGame.click.push(index);
        simon.style.background=myGame.set_blink[index];
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[index];     
            },200 );
        checking();
    }
}
function checking()
{
    for(let i=0;i<myGame.click.length;i++)
    {
        if(!(myGame.click[i]===myGame.arr[i]))
        {
                    document.getElementById("wrong").play();
                    myGame.count.innerHTML="! !";
            myGame.click=[];
            if(myGame.strict_val===1)
            {
                myGame.arr=[];
                setTimeout(createString,1000);
            }
            else
            {
                setTimeout(function()
                {
                    myGame.count.innerHTML=myGame.count_value;
                    glow();
                },2000);
            }
        }
        else if((myGame.arr.length===myGame.click.length)&&(i===(myGame.arr.length-1)) && myGame.on)
        {
            setTimeout(createString,1000);
            myGame.click=[];
        }
    }
}