var nav_output = '';

var MyPage = {
	title:"",
	firm_name:"",
	cprt:"",
	message:{
		display:"",
		data:[
			["#", "John Smith", "Today", "Lorem Ipsum has been the industry's standard dummy text ever since the..."],
			["#", "John Smith", "Yesterday", "Lorem Ipsum has been the industry's standard dummy text ever since the..."],
			["#", "John Smith", "Yesterday", "Lorem Ipsum has been the industry's standard dummy text ever since the..."]
		],
		init:function(){
			document.getElementById("MyPage_message").style.display = this.display;
			if(this.display!=="") return;
			document.getElementById("MyPage_message_container").innerHTML = '';
			for(i = 0; i<this.data.length; ++i) 
				create_message_items(this.data[i][0], this.data[i][1], this.data[i][2], this.data[i][3]);
			create_message_readAll();
		}
	},
	tasks:{
		display:"",
		data:[
			["#", "task 1", 20],
			["#", "task 2", 40],
			["#", "task 3", 50],
			["#", "task 4", 70],
			["#", "task 5", 80],
			["#", "task 6", 90]
		],
		init:function(){
			document.getElementById("MyPage_tasks").style.display = this.display;
			if(this.display!=="") return;
			document.getElementById("MyPage_tasks_container").innerHTML = '';
			for(i = 0; i<this.data.length; ++i)
				create_tasks_items(this.data[i][0], this.data[i][1], this.data[i][2]);
			create_tasks_readAll();
		}
	},
	navigation:{
		data:{
			title:[],
			next:[],
			son:[],
			ico:[],
			active:0,
			page:[],
			addr:[]
		},
		init:function(){
			create_navigation(0, 1, this.data);
			document.getElementById("main-menu").innerHTML = window.nav_output;
			change_page(this.data.active);
		},
		set_active_menu:function(id){
			try{document.getElementById("nav"+this.data.active).classList.remove("active-menu");}
			catch(err){}
			document.getElementById("nav"+id).classList.add("active-menu");
			this.data.active = id;
		}
	},
	init:function(){
	    var type = '';
	    var usertype = getCookie('usertype');
	    if(usertype=='hr') type = 'HR';
	    if(usertype=='user') type = '个人';
	    if(usertype=='admin') type = '管理员';
		document.getElementById("usertype").innerHTML = type + ' · ' + usertype;
		document.title = this.title;
		document.getElementById("firm_name").innerHTML = this.firm_name;
		document.getElementById("site_cprt").innerHTML = this.cprt;
		this.message.init();
		this.tasks.init();
		this.navigation.init();
	}
}

var post_data = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getNavigation"}';

ajax(api_server, post_data, load_navigation, false, '');
ajax(api_server, void_post, load_baseinfo, false, '');

MyPage.init();

function onload_page(obj){
    MyPage.navigation.data.addr = obj.addr;
    var nav = MyPage.navigation.data;
    document.getElementById("page_title").innerHTML += '&nbsp;&nbsp;<small>' + obj.stitle + '</small>';
    document.getElementById("page_addr").innerHTML = '';
    for(i = 0; i<nav.addr.length-1; ++i)
	    document.getElementById("page_addr").innerHTML += '<li style="cursor:pointer"><a>' + nav.addr[i] + '</a></li>'
	document.getElementById("page_addr").innerHTML += '<li style="cursor:pointer" class="active">' + nav.addr[nav.addr.length-1] + '</li>';
	get_innerHTML(obj.htm);
	for(var i = 0; i<obj.js.length; ++i){
	    script = document.createElement("script");
	    script.src = obj.js[i];
	    document.body.appendChild(script);
	}
}

function change_page(id){
    document.getElementById("page_addr").innerHTML = '导航栏加载中...';
    document.getElementById("site-page").innerHTML = '页面加载中...';
    MyPage.navigation.set_active_menu(id);
    var nav = MyPage.navigation.data;
	document.getElementById("page_title").innerHTML = '<br>' + nav.title[id];
	var post = '{"_username":"' + getCookie('username') + '", "_token":"' + getCookie('token') + '", "_usertype":"' + getCookie('usertype') + '", "_request":"getPage", "page":"' + nav.page[id] + '"}';
	ajax(api_server, post, onload_page, true, '');
}

function load_baseinfo(obj){
	MyPage.title = obj.title;
	MyPage.cprt = obj.cprt;
	MyPage.firm_name = obj.firm_name;
}

function load_navigation(obj){
	MyPage.navigation.data.title = obj.title;
	MyPage.navigation.data.next = obj.next;
	MyPage.navigation.data.son = obj.son;
	MyPage.navigation.data.ico = obj.ico;
	MyPage.navigation.data.active = obj.active;
	MyPage.navigation.data.page = obj.page;
}