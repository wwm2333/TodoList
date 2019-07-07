import React from 'react'

class AppList extends React.Component{
    constructor(props){
        super(props);
     
        this.handleCheckedAll=this.handleCheckedAll.bind(this);
        this.handleCheckedSingle=this.handleCheckedSingle.bind(this);
        this.handledeleteTodo=this.handledeleteTodo.bind(this);
        this.handleEditTodo=this.handleEditTodo.bind(this);
    }
    handleCheckedAll(e){
        let {handleCheckedAll}=this.props;
        handleCheckedAll(e.currentTarget.checked);
    }
    handleCheckedSingle(e){
        let {handleCheckedSingle}=this.props;
        handleCheckedSingle(e.currentTarget.getAttribute("data-id"),e.currentTarget.checked);
    }
    handledeleteTodo(e){
        let {handledeleteTodo}=this.props;
        handledeleteTodo(e.currentTarget.getAttribute("data-id"));
    }
    handleDblClick(e){
        e.currentTarget.parentNode.parentNode.setAttribute('class','editing');
    }
    handleEditTodo(e){
        if(e.keyCode===13){
            let {handleEditTodo}=this.props;
            handleEditTodo(e.currentTarget.getAttribute("data-id"),e.currentTarget.value);
            e.currentTarget.parentNode.setAttribute('class','');
        }
    }
    render(){
        let {tempData}=this.props;
        let html=tempData.map((todo)=>{
            return( 
            <li className={todo.completed?'completed':''}  key={todo.id.toString()}>
                <div className="view">
                 <input className="toggle" type="checkbox" data-id={todo.id} checked={todo.completed} onClick={this.handleCheckedSingle}/>
                    <label onDoubleClick={this.handleDblClick}>{todo.text}</label>
                    <button className="destroy" data-id={todo.id} onClick={this.handledeleteTodo}></button>
                </div>
            <input className="edit" data-id={todo.id} onKeyDown={this.handleEditTodo} defaultValue={todo.text}/>
            </li> 
        )
        });
        return(
            <div className="main">
            <input className="toggle-all" id="toggle-all" type="checkbox" onClick={this.handleCheckedAll}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {html}
            </ul>
        </div>
        )
    }
}

export default AppList;