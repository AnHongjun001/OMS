function success_login(obj){
    var username = document.getElementById("username").value;
    document.cookie = "username=" + username + "; path=/";
    document.cookie = "token=" + obj.token + "; path=/";
    document.cookie = "usertype=" + $_GET.type + "; path=/";
    document.getElementById("tag").style.display='';
    document.getElementById("button").style.display='none';
    window.location.href = view_server + "view.html";
}

function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("userpwd").value;
    if(username===''){
        alert("用户名不能为空！");
        document.getElementById("username").focus();
        return;
    }
    if(password===''){
        alert("用户密码不能为空！");
        document.getElementById("userpwd").focus();
        return;
    }
    password = md5(password);
    var post_data = '{"_username":"' + username + '", "_token":"' + password + '", "_usertype":"' + $_GET['type'] + '", "_request":"login"}';
    ajax(api_server, post_data, success_login, true, '');
}

function init(obj){
    var type = '';
    if($_GET['type'] == 'hr') type = 'HR登入';
    else if($_GET['type'] == 'user') type = '个人登入';
    else if($_GET['type'] == 'admin') type = '管理员登入';
    else window.location.href = view_server + 'index.html';
    document.getElementById("site_title").innerHTML = type;
    document.title = obj.title;
    document.getElementById("site_logo").src = obj.logo;
    document.getElementById("site_cprt").innerHTML = obj.cprt;
}

ajax(api_server, void_post, init, true, '');
