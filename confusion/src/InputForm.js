import React,{Component} from "react";


class InputForm extends Component {
  constructor(props){
    super(props);
    this.state={
      title:"",
      desciption:"",
      date: "",
      complete: "False",
      status: "done"
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInputValue() {
    let newState = {};
    newState["title"] = this.inputTitle.value ;
    newState["desciption"] = this.desciption.value ;
    newState["date"] = this.date.value ;
    // newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.title !== ""){
      this.props.addItem(this.state);
      this.inputTitle.value = "";
      this.desciption.value = "";
      this.date.value = "";
      // let newState = {title:""};
      this.updateInputValue();
      // this.setState(newState);
    }


  }
  render() {
    return (
      <form id ="mainInput" onSubmit={this.handleSubmit} >
          <input name="title" placeholder="title"  type="text" ref={el => this.inputTitle = el} onChange={this.updateInputValue}></input>
          <input name="desciption" placeholder="desciption" type="text" ref={el => this.desciption = el}onChange={this.updateInputValue}></input>
          <input name="date" placeholder="date" type="text"ref={el => this.date = el} onChange={this.updateInputValue}></input>
          <button type="submit">add</button>
      </form>




    );
  }
}


export default InputForm;
