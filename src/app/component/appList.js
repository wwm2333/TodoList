import React from 'react'

class AppList extends React.Component{
    constructor(props){
        super(props);
     
        this.handleCheckedAll=this.handleCheckedAll.bind(this);
        this.handleCheckedSingle=this.handleCheckedSingle.bind(this);
    }
    handleCheckedAll(e){
        let {handleCheckedAll}=this.props;
        handleCheckedAll(e.currentTarget.checked);
    }
    handleCheckedSingle(e){
        let {handleCheckedSingle}=this.props;
        handleCheckedSingle(e.currentTarget.getAttribute("data-id"),e.currentTarget.checked);
    }
    render(){
        let {data}=this.props;
        let html=data.map((todo)=>{
            return( 
            <li className={todo.completed?'completed':''}  key={todo.id.toString()}>
                <div className="view">
                 <input className="toggle" type="checkbox" data-id={todo.id} checked={todo.completed} onClick={this.handleCheckedSingle}/>
                    <label>{todo.text}</label>
                    <button className="destroy"></button>
                </div>
            <input className="edit" defaultValue={todo.text}/>
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