import React from 'react'

class AppFooter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filter:""
        }
        this.handleFilter=this.handleFilter.bind(this);
        this.clearCompleted=this.clearCompleted.bind(this);
    }
    handleFilter(e){
        e.preventDefault();
        let href=e.currentTarget.getAttribute('href');
        let i= href.lastIndexOf("#/");
        let flag=href.substring(i+2,href.length);
        this.setState({
            filter:flag
        });
        let {handleFilter}=this.props;
        handleFilter(flag);
    }
    clearCompleted(){
        let {clearCompleted}=this.props;
        clearCompleted();
    }
    render(){
        let {data}=this.props;
        let remaining=data.filter(item=>!item.completed).length;
        let completed=(data.filter(item=>item.completed).length)>0;
        let html;
        if(completed){
           html= <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
        }
                     
        return(
        <div className="footer">
            <span className="todo-count"><strong>{remaining}</strong>{remaining === 1 ? 'item' : 'items'} left</span>
			<ul className="filters">
				<li>
					<a className={this.state.filter===""?"selected":""} href="#/" onClick={this.handleFilter}>All</a>
				</li>
				<li>
					<a className={this.state.filter==="active"?"selected":""} href="#/active" onClick={this.handleFilter}>Active</a>
				</li>
				<li>
					<a className={this.state.filter==="completed"?"selected":""} href="#/completed"onClick={this.handleFilter}>Completed</a>
				</li>
			</ul>
			{html}
        </div>);
    }
}

export default AppFooter;