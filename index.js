window.onload=function(){
    var todolist=new TodoList();
    var header=document.getElementById("new-todo");
    var e_todolist=document.getElementsByClassName("todo-list")[0];
    var footer=document.getElementsByClassName("footer")[0];

    header.addEventListener("keydown",function(event){
            if(event.keyCode==13){
                var html=todolist.add(this.value); 
                render(html);
            }
    });

    function render(html){
        if(html){
            var listhtml=html.listhtml||'';
            e_todolist.innerHTML=listhtml;
            var footerhtml=html.footerhtml||'';
            footer.innerHTML=footerhtml;
        }
    }
}