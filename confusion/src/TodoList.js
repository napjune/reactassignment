import React,{Component} from "react";
import TodoItems from "./TodoItems"
import SimpleStorage from "react-simple-storage";
import ToggleDisplay from 'react-toggle-display';
import InputForm from "./InputForm"
class TodoList extends Component {
  constructor(props){
    super(props);
    this.state={
      items :[],
      show : false,
    };
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateComplete = this.updateComplete.bind(this)
    this.addItem = this.addItem.bind(this)
    this.updateStatus =this.updateStatus.bind(this)
    this.editParentItem=this.editParentItem.bind(this)
    this.handleClickhide=this.handleClickhide.bind(this)
  }
  handleClickhide() {
    this.setState({
      show: !this.state.show
    });
  }
  updateComplete(id,value){
    let newState = this.state.items.slice() //copy the array
    for (const s of newState) {
      if(Number(s["task_id"])===Number(id)){
        s["complete"]=value;
      }
    }
    this.setState({
      items : newState
    });
  }
  updateStatus(id){
    // console.log(id+status)
    let newState = this.state.items.slice() //copy the array
    for (const s of newState) {
      if(Number(s["task_id"])==Number(id)){
          if (s["status"]==="done"){
            var status = "editing";
          } else{status = "done";}


          s["status"]=status;
      }
    }
    console.log(newState);
    this.setState({
      items : newState
    });
  }
  deleteItem(task_id){
    var filteredItems = this.state.items.filter(function(item){
      return (item.task_id !==task_id)
    });
    this.setState({
      items:filteredItems
    });
  }
  editParentItem(childstate){
    let newState = this.state.items.slice() //copy the array
    for (const s of newState) {
      console.log(s);
      if(Number(s["task_id"])===Number(childstate.task_id)){
        s["title"]=childstate.title;
        s["desciption"]=childstate.desciption;
        s["date"]=childstate.date;
        s["status"]="done";
        console.log(s);
      }
    }
    this.setState({
      items : newState
    });
    // console.log("newState");
    // console.log(childstate);
  }
  addItem(item){
    // console.log(item)
    var time = Date.now();
    item["task_id"] = time;

    this.setState((prevState)=>{
      return{
        items:prevState.items.concat(item)
      };
    });


  }
  render() {
    return(
      <div className = "todoListMain">
        <SimpleStorage parent={this} />
        <div className = "Header">
          <ToggleDisplay show={this.state.show}>
            <InputForm addItem={this.addItem}/>
          </ToggleDisplay>
        </div>

        <TodoItems entries={this.state.items}
                   delete={this.deleteItem}
                   updateComplete={this.updateComplete}
                   updateStatus={this.updateStatus}
                   editParentItem={this.editParentItem}/>
        <button onClick={this.handleClickhide}></button>
        </div>

    );

  }
}

export default TodoList;
