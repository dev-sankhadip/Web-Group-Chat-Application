//start sign up coding

function signup()
{
	var name=btoa(document.getElementById("uname").value);
	var email=btoa(document.getElementById("email").value);
	var mobile=btoa(document.getElementById("mobile").value);
	var password=btoa(document.getElementById("password").value);
	var user_input={name:name, email:email, mobile:mobile, password:password};
	var user_data=JSON.stringify(user_input);
	if(name!="" && email!="" && mobile!="" && password!="")
	{
		localStorage.setItem(email,user_data);
		document.getElementById("span").innerHTML="Sign up sucess";
		document.getElementById("uname").value="";
	    document.getElementById("email").value="";
	    document.getElementById("mobile").value="";
	    document.getElementById("password").value="";
	    setTimeout(function(){document.getElementById("span").innerHTML=""},2000);
		return false;
	}
}
function user_existed()
{
	var email=btoa(document.getElementById("email").value);
	if(localStorage.getItem(email)!=null)
	{
		document.getElementById("span").innerHTML="user alraedy existed";
		document.getElementById("password").disabled=true;
		document.getElementById("mobile").disabled=true;
		document.getElementById("sub2").disabled=true;
		document.getElementById("email").style.color="white";
		document.getElementById("email").style.background="black";
		document.getElementById("email").classList.add("pulse");
		document.getElementById("email").onclick=function() {
			this.value="";
			this.style.background="";
			this.style.color="";
			document.getElementById("password").disabled=false;
		    document.getElementById("mobile").disabled=false;
		    document.getElementById("sub2").disabled=false;
		    document.getElementById("span").innerHTML="";
		}
	}
}
var i=0;
function login()
{
	//start session storage coding for username
	var username1=document.getElementById("fname").value;
	var user_login1={username1:username1};
	var user_data1=JSON.stringify(user_login1);
	sessionStorage.setItem(username1+" uname1",user_data1);
	//end session storage coding for username
	var uname=btoa(document.getElementById("fname").value);
	sessionStorage.setItem('user_mail', uname);
	var password=btoa(document.getElementById("pwd").value);
	var login_input={uname:uname, password:password};
	var login_data=JSON.stringify(login_input);
	sessionStorage.setItem(uname,login_data);
	var session_data=sessionStorage.getItem(uname);
	var user_details=JSON.parse(session_data);
	if(localStorage.getItem(user_details.uname)==null)
	{
		alert("user not found");
	}
	else
	{
		if(localStorage.getItem(user_details.uname).match(user_details.password))
		{
			location.replace("welcome.html");
			return false;
		}
		else
		{
			alert("password not matched");
		}
	}
}