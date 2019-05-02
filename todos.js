class Todo {
    constructor(text,completed=false){
        this.id=Utils.getOrder();
        this.text=text;
        this.completed=completed;
    }
}


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
    edit(id,text,completed){
        let todo=new Todo(id,text,completed);
        Utils.save(id,todo);
        return this.render();
    }
    _hasCompeleted(){
        var complateds=this._filter('completed');
        return (complateds!=null&&complateds.length>0);
    }
    _filter(flag=''){
        const todos= Utils.getAll()||[];
        if(flag=='active'){
          return todos.filter(todo=>!todo.complated);
        }
        if(flag=='complated'){
            return todos.filter(todo=>todo.complated);
        }
        return todos;
    }
    filter(flag=''){
        this.render(this._filter(flag));
    }
    render(todolist){
       let listhtml=this._renderList(todolist);
       let footerhtml=this._renderfooter();
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
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.completed?'checked':''}>
                    <label>${todo.text}</label>
                    <button class="destroy" data-id='${todo.id}'></button>
                </div>
                <input class="edit" value="${todo.text}"></input>
                    `
            }); 
        return html;
     }
     _renderfooter(){
        let remaining=this._filter('active').length;
        if(!remaining){
            return '';
        }
         let html= `
         <span class="todo-count"><strong>${remaining}${remaining === 1 ? 'item' : 'items'} left</span>
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
    
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
         `;
        if(this._hasCompeleted){
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
       return allData||[];
     },
     getOrder(){ 
         var ids=[];
        this.getAll().forEach(data=>{
            ids.push(data.id);
        });
         return Math.max(...ids)+1||1;
     },
   
}
