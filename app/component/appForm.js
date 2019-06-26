import React from 'react'

class AppForm extends React.Component{
    constructor(props){
        super(props);

        this.handleAddTodo=this.handleAddTodo.bind(this);
    }
    //回车修改input的值，父组件中新增todo
    handleAddTodo(e){
        const {handleAddTodo}=this.props;
        console.log(e);
        if(e.keyCode==13){
            handleAddTodo({
                id:this.generateId(),
                text:e.target.value,
                complated:false
            });
        }
    }
    generateId() {
        const s = [];
        const hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = '4';
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
      
        const uuid = s.join('');
        return uuid;
      }
    render(){
        return(
        <div className="header">
            <h1>todos</h1>
            <input className="new-todo" id="new-todo" placeholder="What needs to be done?" onKeyDown={this.handleAddTodo}  autofocus/>
        </div> 
        )   
    }
}

export default AppForm;