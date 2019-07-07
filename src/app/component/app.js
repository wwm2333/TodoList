import React from 'react'
import AppList from './appList.js'
import AppForm from './appForm.js'
import AppFooter from './appFooter.js'
import "../../base.css"
import "../../index.css"

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
        data: this.props.data,
        tempData:this.props.data
        };
      
        this.handleAddTodo=this.handleAddTodo.bind(this);
        this.handleCheckedAll=this.handleCheckedAll.bind(this);
        this.handleCheckedSingle=this.handleCheckedSingle.bind(this);
        this.handledeleteTodo=this.handledeleteTodo.bind(this);
        this.handleEditTodo=this.handleEditTodo.bind(this);
        this.handleFilter=this.handleFilter.bind(this);       
        this.clearCompleted=this.clearCompleted.bind(this);       
        
    }
    handleCheckedAll(checked){
        let todos=this.state.data;
        todos.map((todo) => {
            todo.completed=checked;
            return todo;
        });
        this.setState({
            data:todos,
            tempData:todos
        });
    }
    handleCheckedSingle(id,checked){
        let todos=this.state.data;
        todos.map(todo=>{
            if(todo.id.toString()===id){
                todo.completed=checked;
            }
            return todo;
        })
       this.setState({
           data:todos,
           tempData:todos
        });
    }
    handleAddTodo(newTodo){
        this.setState({
            data:[...this.state.data,newTodo],
            tempData:[...this.state.data,newTodo]
        })
    }
    handledeleteTodo(id){
        let arr=this.state.data;
        if(arr){
            arr.splice(arr.findIndex(item=>item.id.toString()===id),1);
        }
        this.setState({
            data:arr, 
            tempData:arr
        })
    }
    handleEditTodo(id,text){
        let todos=this.state.data;
        todos.map((todo)=>{
            if(todo.id.toString()===id){
                todo.text=text;
            }
            return todo;
        })
        this.setState({
            data:todos, 
            tempData:todos
        })
    }
    handleFilter(flag){
        let todos=this.state.data;
        let f=flag.toUpperCase();
        switch(f){
            case "ACTIVE":
                this.setState({
                    tempData:todos.filter(item=>!item.completed)
                });
                break;
         case "COMPLETED":
                this.setState({
                    tempData:todos.filter(item=>item.completed)
                });
                break;     
            default:
                this.setState({
                    tempData:todos
                    }); 
               break;
        }
    }
    clearCompleted(){
        let todos=this.state.data;
        let arr=[];
        if(todos){
            todos.forEach(item => {
           
                if(!item.completed){
                    arr.push(item);
                }
            });
        }
        this.setState({
            data:arr,
            tempData:arr
        })
    }
    render () {
        return (
            <div>
                <AppForm handleAddTodo={this.handleAddTodo} ></AppForm>
                <AppList tempData={this.state.tempData}
                    handleCheckedAll={this.handleCheckedAll}
                    handleCheckedSingle={this.handleCheckedSingle} 
                    handledeleteTodo={this.handledeleteTodo} 
                    handleEditTodo={this.handleEditTodo}>
                    </AppList>
                <AppFooter data={this.state.data} handleFilter={this.handleFilter} clearCompleted={this.clearCompleted}></AppFooter>
            </div>
        )
    }
}

export default App;