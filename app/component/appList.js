import React from 'react'

class AppList extends React.Component{
    constructor(props){
        super(props);
       
        this.checkedAll=this.checkedAll.bind(this);
    }
    checkedAll(e){
        let {handleCheckedAll}=this.props;
        handleCheckedAll(thise.currentTarget.checked);
    }

    render(){
        let {data}=this.props;
        let html="";
        data.forEach(todo => {
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
        return(
            <div class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox" onClick={this.checkedAll}/>
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                {html}
            </ul>
        </div>
        )
    }
}

export default AppList;