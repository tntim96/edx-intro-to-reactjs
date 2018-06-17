function RowButton(props) {
  var style = {
    width: 24,
    height: 24
  };
  return (
    <button style={style} onClick={() => props.handleClick()}>
      {props.label}
    </button>
  );
}

function Row(props) {
  console.log("props", props)
  var style = {
    display: "flex"
  };
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.activity}</td>
      <td>{props.restrictions}</td>
    </tr>
  );
}


function Table(props) {
  var style = {
    with: "100px"
  };
  return (
    <table style={style}>
      <thead>
        <tr>
          <th>Remove</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Activity</th>
          <th>Restrictions</th>
        </tr>
      </thead>
      <tbody>
      {props.tableList.map((item, index) => (
        <Row
          key={index}
          index={index}
          firstName={item.firstName}
          lastName={item.lastName}
          activity={item.activity}
          restrictions={item.restrictions}
        />
      ))}
      </tbody>
    </table>
  );
}

class InputAndLabelClass extends React.Component{

    constructor(props){
        super(props)
        this.state = {value: ''}
    }
    render(){
        return (
            <label>
            {this.props.label}(Class)<br/>
            <input type="text" onChange={this.props.handleChange}/><br/>
            </label>
        )
    }
}

function InputAndLabel(props) {
  return (
      <label>
      {props.label}<br/>
      <input type="text" value={props.value} onChange={props.handleChange}/><br/>
      </label>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
      , lastName: ""
      , items: []
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
  }
  handleFirstNameChange(event) {
    //console.log('handleChange1', event.target.value)
    this.setState({ firstName: event.target.value });
    //console.log('handleChange2', this.state.firstName)
  }
  handleLastNameChange(event) {
    //console.log('handleChange', event.target.value)
    this.setState({ lastName: event.target.value });
  }
  addItem() {
    var itemsCopy = this.state.items.slice();
    itemsCopy.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    this.setState({ items: itemsCopy, firstName: "", lastName: "" });
    console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <InputAndLabel label="First Name" value={this.state.firstName} handleChange={this.handleFirstNameChange}/>
        <InputAndLabel label="Last Name" value={this.state.lastName} handleChange={this.handleLastNameChange}/>
        <button onClick={() => this.addItem()}>Submit</button><br/>
        <Table tableList={this.state.items}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
