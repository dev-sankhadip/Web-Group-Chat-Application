var socket=io.connect('http://localhost:4000');
//all id and variable
var chatInfra = io.connect('/chat_infra');
var chatgot=io.connect('/chat_got');
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var username=document.getElementById("username");
var set=document.getElementById('set');
var image_display=document.getElementById("user_cont");


var uname=[];
//logout function
function logout()
{
  var user=confirm("Are you sure?");
  if(user==true)
  {
    sessionStorage.clear();
    setTimeout(function()
    {
      window.location="index.html";
      window.location=location.href;
    },2000);
  }
}

//message send function added
btn.addEventListener('click', function()
{
  if(message.value.length==0)
  {
    alert("please enter message");
  }
  else
  {
    var time1=new Date();
    var time2=time1.toLocaleTimeString();
    feedback.innerHTML="";
    output.innerHTML+='<div style="float:left;width:600px;"><p style="float:right;clear:right; background-color:#B8AA97; color:white; border-radius:11px; box-shadow:3px 3px 8px lightgrey; padding:8px;"><strong style="color:white;font-family:sans-serif;">'+handle.value+'</strong><br>'+message.value+' '+'<font size="1">'+time2+'<font></p></div>';
    chatgot.emit('chat',{
      message:message.value,
      handle:handle.value,
      time:time2
    });
    message.value="";
  }
})

//keypress function
message.addEventListener('keypress', function()
{
  chatgot.emit('typing', uname);
});
//recieve and show chat data
chatgot.on('chat', function(data)
{
  feedback.innerHTML="";
  output.innerHTML+='<div style="float:left;width:600px;"><p style="float:left;clear:left; background-color:#B8AA97; color:white;padding:3px;box-shadow:3px 3px 8px lightgrey;"><strong style="color:white;font-family:sans-serif;">'+data.handle+'</strong><br>'+data.message+' '+'<font size="1">'+data.time+'</font></p></div>';
});
//recieve data while typing
chatgot.on('typing', function(data)
{
  feedback.innerHTML='<p><em>'+data+' is typing a message..</em></p>';
})

//welcome message
chatInfra.on('welcome', function(data)
{
  feedback.innerHTML='<p><strong>'+data.free+'</strong></p>'
});
//print online user
chatInfra.on('onlineuser1', function(data)
{
  username.innerHTML+=data.name;
});


//set user name
set.addEventListener('click', function()
{
  if(handle.value.length==0)
  {
    alert("enter your name please");
  }
  else{
    btn.disabled=false;
    btn.style.cursor="pointer";
      /*if(set.innerHTML=="Set your name")
        {*/
           chatInfra.emit('setname',{
           name:handle.value
        });
        var userid={name:handle.value};
        var userid_data=JSON.stringify(userid);
        localStorage.setItem('cname',userid_data);
        /*set.innerHTML="Set your name";*/
        /*}*/
      /*else if(set.innerHTML=='Change your name here')
        {
          chatInfra.emit('changename',
            {
              cname:handle.value
            });
        }*/
}
});

//print the entered username
chatInfra.on('setuser', function(data)
{
  uname=data.name;
  output.innerHTML+='<p><em><font style="color:red;">'+data.name+' has joined the chatting room</font></em></p>';
  feedback.innerHTML="";
});

//print the changed name
chatInfra.on('changeuser',function(data)
{
  var udata= localStorage.getItem('cname');
  var udata_extract=JSON.parse(udata);
  output.innerHTML+='<p><em><strong><font style="color:red;">'+udata_extract.name+' has changed into '+data.cname+'</font></strong></em></p>';
})
//send image between user

function send_image()
{
  var input=document.getElementById("image-send");
  var image_url;
  var freader=new FileReader();
  freader.readAsDataURL(input.files[0]);
  freader.onloadend=function(event)
  {
    chatgot.emit('image', {image_url:event.target.result});
    var image_cont=document.createElement("DIV");
    image_cont.className="image-container";
    output.append(image_cont);
    var image_display=document.createElement("DIV");
    image_display.className="image-send";
    image_cont.append(image_display);
    image_cont.style.paddingBottom="2px";
    image_display.style.float="right";
    image_display.style.backgroundImage="url("+event.target.result+")";
    image_display.style.backgroundSize="cover";
    image_display.style.backgroundRepeat="none";

  }
}

chatgot.on('image', function(data)
{
  var image_cont=document.createElement("DIV");
    image_cont.className="image-container";
    output.append(image_cont);
    var image_display=document.createElement("DIV");
    image_display.className="image-send";
    image_cont.append(image_display);
    image_cont.style.paddingBottom="1px";
    image_display.style.float="left";
    image_display.style.backgroundImage="url("+data.image_url+")";
    image_display.style.backgroundSize="cover";
    image_display.style.backgroundRepeat="none";
});

/*send video between user

function send_video(input)
{
  var filename=document.getElementById("input").files[0];
  var url=URL.createObjectURL(filename);
  socket.emit('video',
  {
    video_url:url
  });
  var video_cont=document.createElement("DIV");
}

socket.on('video', function(data)
{
  var video=document.getElementById("video");
  video.src=data.video_url;
});*/