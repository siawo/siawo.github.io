let myGame=
{
    on:false,
    start:document.getElementById("start"),
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
    counter:0,
    set_time:[]
}
for(let i=0;i<4;i++)
{
    myGame.button[i]=document.getElementById("simon"+i);
}
function clear()
{
    for(let i=0;i<myGame.set_time.length;i++)
    {
        clearTimeout(myGame.set_time[i]);
    }
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
        for(let i=0;i<myGame.set_start.length;i++)
        {
            myGame.button[i].style.background=myGame.set_start[i];
        }
        clear();
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
        if(myGame.count_value>20)
        {
            myGame.count_value=0;
        }
        else
        {
            clear();
            myGame.count.innerHTML="- -";
            myGame.arr=[];
            myGame.click=[];
            for(let i=0;i<myGame.set_start.length;i++)
            {
                myGame.button[i].style.background=myGame.set_start[i];
            }
            myGame.set_time.push(setTimeout(createString,1000));
        }
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
        myGame.set_time.push(setTimeout(function()
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
        }, k));
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
        if(myGame.click[myGame.counter]!==myGame.arr[myGame.counter])
        {
            disable(true);
            checking();
        }
        else if(myGame.counter===myGame.arr.length-1)
        {
            myGame.click=[];
            myGame.counter=0;
            disable(true);
            setTimeout(createString,1000);
        }
        else
        {
            myGame.counter++;
        }
    }
}
function checking()
{
    document.getElementById("wrong").play();
    myGame.count.innerHTML="! !";
    myGame.click=[];
    myGame.counter=0;
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
        },1000);
    }
}