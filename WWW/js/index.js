function page_init(obj){
    document.getElementById("site_title").innerHTML = obj.title;
    document.title = obj.title;
    document.getElementById("firm_name").innerHTML = obj.firm_name;
    document.getElementById("site_cprt").innerHTML = obj.cprt;
    document.getElementById("site_logo").src = obj.logo;
}

ajax(api_server, void_post, page_init, true, '');