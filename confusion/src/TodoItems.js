import React,{Component} from "react";
import PropTypes from 'prop-types';

class TodoItems extends Component {
  constructor(props){
    super(props);
    this.state={oldstate:{},
      editstate:{}
    };
    this.createTasks = this.createTasks.bind(this);
    this.UpdateCompleteStatus=this.UpdateCompleteStatus.bind(this);
    this.updateStatus=this.updateStatus.bind(this);
    this.handleEditSubmit=this.handleEditSubmit.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.editItems=this.editItems.bind(this);
    this._handleChangeEvent=this._handleChangeEvent.bind(this);
  }
  componentDidMount() {
   document.addEventListener('mousedown', this.handleClickOutside);
 }

 componentWillUnmount() {
   document.removeEventListener('mousedown', this.handleClickOutside);
 }
 setWrapperRef(node) {
   this.wrapperRef = node;
 }

 handleClickOutside(event) {
   if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     console.log(this.wrapperRef.id);
     // this.updateStatus(this.wrapperRef.id);
     this.props.updateStatus(this.wrapperRef.id);
 }
}
  UpdateCompleteStatus(e){
    this.props.updateComplete(e.target.value,e.target.checked);
  }
  updateStatus(e){
    this.props.updateStatus(e.target.id);
    var value =  e.target.value.split(",");

    var oldState={
      task_id:e.target.id,
      title : value[0],
      desciption : value[1],
      date : value[2]
    };
    // this.setState(editingState);
    // console.log(this.state);
    this.setState({oldstate:oldState,editstate:oldState}, function () {
    console.log(this.state.oldstate);});
  }
  handleEditSubmit(e){
    e.preventDefault();
  }
  editItems(){
    console.log("child");
    console.log(this.state.editstate)
    this.props.editParentItem(this.state.editstate);

  }
  _handleChangeEvent(e){
  console.log(this.state.editstate);
   let newState = this.state.editstate;
   newState[e.target.name]=e.target.value;
   newState["task_id"]=this.state.oldstate.task_id;
   this.setState({editstate:newState});
  }
  createTasks(item){
    if(item.status==="done"){
      return(<li>
                <input defaultChecked={item.complete} onChange={this.UpdateCompleteStatus} value={item.task_id} type="checkbox"></input>
                {item.title}
                <button onClick={this.updateStatus} id={item.task_id} value={new Array(item.title,item.desciption,item.date)}>edit</button>
                <button onClick={()=> this.delete(item.task_id)} value={item.task_id}>delete</button>
              </li>)
    }else{

      return (<form ref={this.setWrapperRef} id={item.task_id} key={item.status}onSubmit={this.handleEditSubmit} >
          <input name="title" placeholder="title"  type="text" defaultValue={this.state.oldstate.title} onChange={this._handleChangeEvent}></input>
          <input name="desciption" placeholder="desciption" defaultValue={this.state.oldstate.desciption}type="text"onChange={this._handleChangeEvent}></input>
          <input name="date" placeholder="date" type="text" defaultValue={this.state.oldstate.date}onChange={this._handleChangeEvent}></input>
          <button type="submit" onClick={this.editItems}>done</button>
          <button type="submit" onClick={this.updateStatus} id={item.task_id}value={new Array(item.title,item.desciption,item.date)}>cancel</button>
          </form>)
    }

  }
  delete(value){
    this.props.delete(value);
  }
  render(){
    var todoEntries = this.props.entries;
    var listItems =todoEntries.map(this.createTasks);
    return(
      <ul className="theList">
      {listItems}
      </ul>
    );
  }
}

TodoItems.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TodoItems;
