window.onload=function(){
    var todolist=new TodoList();
    var header=document.getElementById("new-todo");
    var e_todolist=document.getElementsByClassName("todo-list")[0];
    var footer=document.getElementsByClassName("footer")[0];
    var toggleall=document.getElementById("toggle-all");

    header.addEventListener("keydown",function(event){
            if(event.keyCode==13){
                var html=todolist.add(this.value); 
                this.value='';
                render(html);
            }
    });
    toggleall.addEventListener("click",function () { 
        var html=todolist.checkedAll(this.checked);
        render(html);
     });
    
     //todolist.clear();
    render();

    function render(html){
        let innerhtml=html|| todolist.render();
        if(innerhtml){
            var listhtml=innerhtml.listhtml||'';
            e_todolist.innerHTML=listhtml;
            var footerhtml=innerhtml.footerhtml||'';
            footer.innerHTML=footerhtml;
        }
        bindEvent();
    }
    function bindEvent(){
        var toggle=document.getElementsByClassName("toggle");
        var destroy=document.getElementsByClassName("destroy");
        var editinput=document.getElementsByClassName("edit");
        var labels=document.querySelectorAll(".view label");

        if(toggle&&toggle.length>0){
            for (let index = 0; index < toggle.length; index++) {
                let element = toggle[index];
                element.addEventListener("click",function(){
                    let id=this.getAttribute("data-id");
                    if(id){
                        var html= todolist.completed(id,this.checked);
                        render(html);
                    }
                });
            }
            
        }
        
        if(destroy&&destroy.length>0){
            for (let index = 0; index < destroy.length; index++) {
                let element = destroy[index];
                element.addEventListener("click",function(){
                    let id=this.getAttribute("data-id");
                    if(id){
                        var html= todolist.delete(id);
                        render(html);
                    }
                });
            }      
        }
        if(labels&&labels.length>0){
            for (let index = 0; index < labels.length; index++) {
                let element = labels[index];
                element.addEventListener("dblclick",function(){
                    this.parentNode.parentNode.setAttribute('class','editing');
                });
            }
        }
        if(editinput&&editinput.length>0){
            for (let index = 0; index < editinput.length; index++) {
                let element = editinput[index];
                element.addEventListener("keydown",function(event){
                    if(event.keyCode==13){
                        let id=this.getAttribute("data-id");
                        if(id){
                            var html=todolist.edit(id,this.value); 
                            render(html);
                        }
                    }
                });
            }      
        }

        var filters=document.querySelectorAll(".filters a");
        if(filters&&filters.length>0){
            for (let index = 0; index < filters.length; index++) {
                const element = filters[index];
                element.addEventListener('click',function(){
                    let href= this.getAttribute('href');
                    let i= href.lastIndexOf("#/");
                    let flag=href.substring(i+2,href.length);
                    var html= todolist.filter(flag);
                    render(html);
                });
            }
        }

        var clearbtn=document.getElementsByClassName("clear-completed")[0];
        if(clearbtn){
            clearbtn.addEventListener("click",function(){
                render(todolist.clearCompleted());
            })
        }

    }
}