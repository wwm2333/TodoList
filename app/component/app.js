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
      
     // this.handleChoseAll=this.handleChoseAll.bind(this);
      this.handleAddTodo=this.handleAddTodo.bind(this);
  }
/*handleChoseAll(){
    this.setState({
        choseAll:!this.state.choseAll
    });
}*/
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
            <AppList data={data}></AppList>
            <AppFooter></AppFooter>
        </div>
    )
  }
}

export default App;