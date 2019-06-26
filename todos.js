
class TodoList{
    add(text){
        let todo=new Todo(text);
        Utils.save(todo.id,todo);
        return this.render();
    }
    delete(id){
        Utils.delete(id);
        return this.render();
    }
    completed(id,completed){
        let todo=Utils.save(id);
        todo.completed=completed;
        Utils.save(id,todo);
        return this.render();
    }
    edit(id,text){
        let todo=Utils.save(id);
        if(text){
            let title=text.replace(/^\s+|\s+$/g,"");
            if(title){
                todo.text=title;
                Utils.save(id,todo);
            }
        }
        return this.render();
    }
    checkedAll(completed){
        let todos=Utils.getAll()||[];
        todos.forEach(todo=>{
            todo.completed=completed;
            Utils.save(todo.id,todo);
        });
        return this.render();
    }
    clearCompleted(){
        var completeds=this._filter('completed');
        if(completeds.length>0){
            completeds.forEach(todo=>{
                Utils.delete(todo.id);
            });
        }
        return this.render();
    }
    clear(){
        Utils.clear();
        return this.render();
    }
    _hasCompleted(){
        var completeds=this._filter('completed');
        return (completeds!=null&&completeds.length>0);
    }
    _filter(flag=''){
        const todos= Utils.getAll()||[];
        if(flag=='active'){
          return todos.filter(todo=>!todo.completed);
        }
        if(flag=='completed'){
            return todos.filter(todo=>todo.completed);
        }
        return todos;
    }
    filter(flag=''){
        return this.render(this._filter(flag),flag);
    }
    render(todolist,flag=''){
       let listhtml=this._renderList(todolist);
       let footerhtml=this._renderfooter(flag);
        return {
            listhtml:listhtml,
            footerhtml:footerhtml
        };
    }
    _renderList(todolist){
        let html="";
        let todos=todolist||Utils.getAll()||[];
            todos.forEach(todo => {
                html+=`
                <li class='${todo.completed?'completed':''}'>
                    <div class="view">
                        <input class="toggle" data-id='${todo.id}' type="checkbox" ${todo.completed?'checked':''}>
                        <label>${todo.text}</label>
                        <button class="destroy" data-id='${todo.id}'></button>
                    </div>
                <input class="edit" value="${todo.text}" data-id='${todo.id}'></input>
                </li> 
                `
            }); 
        return html;
     }
     _renderfooter(flag=''){
        let remaining=this._filter('active').length;
        let hascompleted=this._hasCompleted();
        if(!remaining&&!hascompleted){
            return '';
        }
         let html= `
         <span class="todo-count"><strong>${remaining}${remaining > 1 ? 'items' : 'item'} left</span>
            <ul class="filters">
                <li>
                    <a class="${flag==''?'selected':''}" href="#/">All</a>
                </li>
                <li>
    
                    <a href="#/active" class="${flag=='active'?'selected':''}">Active</a>
                </li>
                <li>
                    <a href="#/completed" class="${flag=='completed'?'selected':''}">Completed</a>
                </li>
            </ul>
         `;
        if(hascompleted){
           html+= `<button class="clear-completed">Clear completed</button>`;              
        }
        return html;
     }
}

const Utils = {
    
    save(key, data) {
        if (arguments.length > 1) {
         return localStorage.setItem(key, JSON.stringify(data));
      } else {
         let storeData = localStorage.getItem(key);
        return (storeData && JSON.parse(storeData)) || []; 
        }
     },
    delete(key){
        if(localStorage.hasOwnProperty(key)){
            localStorage.removeItem(key);
        } 
     },
    getAll(){
         let allData=[];
         for (let index = 0; index < localStorage.length; index++) {
            allData.push(JSON.parse(localStorage.getItem(localStorage.key(index))));
         }
         let datas=allData.sort((a,b)=>{
             return b.id-a.id
         });
       return datas||[];
     },
    getOrder(){ 
        var ids=[];
        this.getAll().forEach(data=>{
            ids.push(data.id);
        });
         return ids.length>0?Math.max(...ids)+1:1;
     },
    clear(){
       localStorage.clear();
   }
}
