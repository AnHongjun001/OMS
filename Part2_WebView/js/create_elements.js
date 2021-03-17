function create_message_items(url, from, date, msg){
	document.getElementById("MyPage_message_container").innerHTML += 
	'<li>' +
        '<a href="' + url + '">' +
            '<div>' +
                '<strong>' + from + '</strong>' +
                    '<span class="pull-right text-muted">' +
                        '<em>' + date + '</em>' +
                    '</span>' +
            '</div>' +
            '<div>' + msg + '</div>' +
        '</a>' +
    '</li>' +
    '<li class="divider"></li>';
}

function create_message_readAll(){
	document.getElementById("MyPage_message_container").innerHTML += 
	'<li>' +
        '<a class="text-center" href="#">' +
            '<strong>Read All Messages</strong>' +
            '<i class="fa fa-angle-right"></i>' +
        '</a>' +
    '</li>';
}

function create_tasks_items(url, title, progress){
	var style = '';
	if(progress<=25) style = 'progress-bar-danger';
	else if(progress<=50) style = 'progress-bar-warning';
	else if(progress<=75) style = 'progress-bar-info';
	else style = 'progress-bar-success';
	document.getElementById("MyPage_tasks_container").innerHTML += 
	'<li>' +
        '<a href="' + url + '">' +
            '<div>' +
                '<p>' + 
                    '<strong>' + title + '</strong>' +
                    '<span class="pull-right text-muted">' + progress + '% Complete</span>' +
                '</p>' +
                '<div class="progress progress-striped active">' +
                    '<div class="progress-bar ' + style + '" role="progressbar" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress + '%">' +
                        '<span class="sr-only">' + progress + '% Complete</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
    '</li>' +
    '<li class="divider"></li>';
}

function create_tasks_readAll(){
	document.getElementById("MyPage_tasks_container").innerHTML += 
	'<li>' +
	    '<a class="text-center" href="#">' +
	        '<strong>See All Tasks</strong>' +
	        '<i class="fa fa-angle-right"></i>' +
	    '</a>' +
	'</li>';
}

function create_navigation(id, deep, nav){
    if(id==undefined) return;
    window.nav_output += '<li>';
    window.nav_output += '<a style="cursor:pointer" id="nav' + id + '"';
    if(nav.son[id]==-1) window.nav_output += ' onclick=change_page(' + id + ')';
    window.nav_output += '>';
    if(nav.ico[id]!=="" && nav.ico[id]!=undefined)
        window.nav_output += '<i class="fa ' + nav.ico[id] + '"></i>';
    window.nav_output += nav.title[id];
    if(nav.son[id]!=-1 && nav.son[id]!=undefined)
        nav_output += '<span class="fa arrow"></span>';
    window.nav_output += '</a>';
    if(nav.son[id]!=-1){
        if(deep==1) 
            window.nav_output += '<ul class="nav nav-second-level">';
        else 
            window.nav_output += '<ul class="nav nav-third-level">';
        create_navigation(nav.son[id], deep+1, nav);
        window.nav_output += '</ul>';
    }
    window.nav_output += '</li>';
    if(nav.next[id]!=-1) create_navigation(nav.next[id], deep, nav);
}