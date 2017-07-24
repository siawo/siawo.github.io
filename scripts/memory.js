let myGame=
{
    on:false, //for keeping the status of on/off button
    start:document.getElementById("start"), //start element is stored
    strict:document.getElementById("strict"), //strict element is stored
    strict_val:0, //contains 0 for non-strict and 1 for strict mode
    arr:[], //contains the series of button to be glow
    count:document.getElementById("count"), // contains the element of count
    count_value:0, //contains the value of count
    set_value:["green","red","yellow","blue"], //contains array of value
    set_start:["#47ad4c","#9b1414","#d6c020","#37609e"], // contains initial color of the buttons
    set_blink:["#26ff00","#ff0000","#f8ff32","#00bbff"], // contains the color to be changed
    click:[],// contains the buttons clicked 
    button:[],// will contain the element of button
    counter:0,// for checking purpose
    set_time:[]//to conatins the objects of set time outs
}
for(let i=0;i<4;i++)//the element of buttons is passed to the array
{
    myGame.button[i]=document.getElementById("simon"+i);
}
function clear()// will clear all the set time out
{
    for(let i=0;i<myGame.set_time.length;i++)
    {
        clearTimeout(myGame.set_time[i]);
    }
}
function on(on)//when the on/off box is checked
{   
    myGame.on=on.checked;
    if(myGame.on)
    {
        myGame.start.disabled=false;//start button is enabled
        myGame.strict.disabled=false;//strict button is enabled
        myGame.count.style.opacity=1;//the opacity of the count text is increased
    }
    else
    {
        myGame.start.disabled=true;//start button is disabled
        myGame.strict.disabled=true;//start button is disabled
        for(let i=0;i<myGame.set_start.length;i++)//set the original colour back in button
        {
            myGame.button[i].style.background=myGame.set_start[i];
        }
        clear();//clearing the time outs
        disable(true);// disabling the buttons
        myGame.count.innerHTML="--";
        myGame.count.style.opacity=0.3;
        document.getElementById("light").style.background="#471c1c";   
    }
}
function reset()// this function is called by start button
{
    if(myGame.on)// this acts if the game is on
    {
        if(myGame.count_value>20)// this is for winning condition, only the count value is set back to 0
        {
            myGame.count_value=0;
        }
        else
        {
            clear();
            myGame.count.innerHTML="--";
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
function set()// it is called by strict button and helps to set value of strict and switch on the light
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
function createString()// next value is generated
{
    myGame.arr.push(Math.floor(Math.random() * 4));
    myGame.count_value=myGame.arr.length;
    if(myGame.count_value>20)// if the count is more than 20, user has won and the game resets
    {
        setTimeout(function()
            {
                myGame.count.innerHTML="WON";
                reset();
            },400);
        return;
    }
    var extra=myGame.count_value<=9?"0":"";
    myGame.count.innerHTML=extra + myGame.count_value;
    glow();// the button chneges it colour according to the string
}
function disable(x)// disables or enables the 4 buttons
{
    for(let i=0;i<4;i++)
    {
        myGame.button[i].disabled=x;
    }
}
function glow()// the buttons changes it colour to bring the glowing effect
{
    disable(true);// disable the buttons during the buttons glowing
    for(let i=0;i<myGame.arr.length;i++)
    {
        let simon=myGame.button[myGame.arr[i]];//the button to glow is set in simon
        let k=1000+(i*1000);// generates the time after which a button will glow
        myGame.set_time.push(
            setTimeout(function()
                {
                    if(myGame.on)
                    {
                        simon.style.background=myGame.set_blink[myGame.arr[i]];
                        document.getElementById(myGame.set_value[myGame.arr[i]]).play();//the sound is played according to the button

                    }
                    setTimeout(function() 
                        {
                            if(myGame.on)
                            {
                                simon.style.background=myGame.set_start[myGame.arr[i]];  
                            }
                            if(i==(myGame.arr.length-1) && myGame.on)// enables the button after all the glowing is done
                            {
                                disable(false);
                            }
                        },600 );
                }, k)
                );
    }
}
function click_button(simon)//function is called when the 4 buttons are clicked
{
    if(!simon.disabled)// it only executes when buttons are enabled
    {
        var index=myGame.set_value.indexOf(simon.value);
        document.getElementById(simon.value).play();// the sound is played according to the button clicked
        myGame.click.push(index);// a number is pushed according to the button clicked
        simon.style.background=myGame.set_blink[index];//this line and set time out helps in chneging the color of button during click
        setTimeout(function() 
            {
                    simon.style.background=myGame.set_start[index];     
            },200 );
        if(myGame.click[myGame.counter]!==myGame.arr[myGame.counter])// if the button clicked does not match then the buttons are disabled
        {
            disable(true);
            checking();// the checking function is called
        }
        else if(myGame.counter===myGame.arr.length-1)// if the checking of a complete string is done then the click array and counter is reset
        {
            myGame.click=[];
            myGame.counter=0;
            disable(true);
            setTimeout(createString,1000);// next random number is generated
        }
        else
        {
            myGame.counter++;// if all above conditions are false the counter value is incremented
        }
    }
}
function checking()
{
    document.getElementById("wrong").play();// play the sound for wrong button
    myGame.count.innerHTML="!!";// sets the count display as !!
    myGame.click=[];//reset of click array
    myGame.counter=0;// reset of counter
    if(myGame.strict_val===1)// if it is strict mode the game will start from stage 1 with new set of string
    {
        myGame.arr=[];
        setTimeout(createString,1000);
    }
    else// if it is non strict mode then previous string will glow
    {
        setTimeout(function()
        {
            var extra=myGame.count_value<=9?"0":"";
            myGame.count.innerHTML=extra+myGame.count_value;
            glow();
        },1000);
    }
}