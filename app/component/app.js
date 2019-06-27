import React from 'react'
import AppList from './appList.js'
import AppForm from './appForm.js'
import AppFooter from './appFooter.js'

class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        //choseAll : false,
        data: this.props.data
      }
      
     this.handleCheckedAll=this.handleCheckedAll.bind(this);
      this.handleAddTodo=this.handleAddTodo.bind(this);
  }
    handleCheckedAll(checked){
        /*this.setState({
            choseAll:!this.state.choseAll
        });*/
        let todos=this.state.data;
        todos.array.forEach(todo => {
            todo.completed=checked;
        });
        this.setState({
            data:todos
        });
    }
    handleAddTodo(newTodo){
    this.setState({
        date:[...this.state.data,newTodo]
    })
    }

  render () {
    const { data } = this.state; 
    return (
        <div>
			<AppForm handleAddTodo={this.handleAddTodo} ></AppForm>
            <AppList data={data} checkedAll={this.handleCheckedAll}></AppList>
            <AppFooter></AppFooter>
        </div>
    )
  }
}

export default App;