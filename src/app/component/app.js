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
        data: this.props.data
        };
      
        this.handleAddTodo=this.handleAddTodo.bind(this);
        this.handleCheckedAll=this.handleCheckedAll.bind(this);
        this.handleCheckedSingle=this.handleCheckedSingle.bind(this);
        this.handledeleteTodo=this.handledeleteTodo.bind(this);
        this.handleEditTodo=this.handleEditTodo.bind(this);
        
    }
    handleCheckedAll(checked){
        let todos=this.state.data;
        todos.map((todo) => {
            todo.completed=checked;
            return todo;
        });
        this.setState({
            data:todos
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
           data:todos
        });
    }
    handleAddTodo(newTodo){
        this.setState({
            data:[...this.state.data,newTodo]
        })
    }
    handledeleteTodo(id){
        let arr=this.state.data;
        if(arr){
            arr.splice(arr.findIndex(item=>item.id.toString()===id),1);
        }
        this.setState({
            data:arr
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
            data:todos
        })
    }
    render () {
        const { data } = this.state; 
        return (
            <div>
                <AppForm handleAddTodo={this.handleAddTodo} ></AppForm>
                <AppList data={data}
                    handleCheckedAll={this.handleCheckedAll}
                    handleCheckedSingle={this.handleCheckedSingle} 
                    handledeleteTodo={this.handledeleteTodo} 
                    handleEditTodo={this.handleEditTodo}>
                    </AppList>
                <AppFooter></AppFooter>
            </div>
        )
    }
}

export default App;