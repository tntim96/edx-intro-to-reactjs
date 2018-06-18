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

function InputAndLabel(props) {
  return (
      <label>
      {props.label}<br/>
      <input type="text" value={props.value} onChange={props.handleChange}/><br/>
      </label>
  );
}

function SelectAndLabel(props) {
  var options = props.activities.map((item,index) => <option key={index} value={item}>{item}</option>)
  return (
      <label>
      {props.label}<br/>
      <select value={props.value} onChange={props.handleChange}>
        {options}
      </select><br/>
      </label>
  );
}

function CheckBoxesAndLabel(props) {
  var checkboxes = props.restrictions.map((item,index) => (
    <div key={index}>
      <label>
        <input type="checkbox" name={props.name} value={item.value} onChange={props.handleChange}/> {item.description}
      </label>
    </div>
  ));
  return (
      <div>
      {props.label}<br/>
        {checkboxes}
      </div>
  );
}

class App extends React.Component {
  static activities = ['Science Lab','Swimming','Cooking','Painting'];
  static restrictions = [
    {value: 'a', description: 'Dietary Restrictions'},
    {value: 'b', description: 'Physical Disabilities'},
    {value: 'c', description: 'Medical Needs'}
  ];

  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
      , lastName: ""
      , activity: App.activities[0]
      , restrictions: []
      , items: []
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleActivityChange = this.handleActivityChange.bind(this)
    this.handleRestrictionsChange = this.handleRestrictionsChange.bind(this)
  }
  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  handleActivityChange(event) {
    this.setState({ activity: event.target.value });
  }
  handleRestrictionsChange(event) {
    debugger;
    var restrictionsCopy = this.state.restrictions.slice();
    if (event.target.checked) {
      restrictionsCopy.push(event.target.value)
    } else {
      var index = restrictionsCopy.indexOf(event.target.value);
      if (index > -1) {//It should be
      restrictionsCopy.splice(index, 1)
      }
    }
    restrictionsCopy.sort()
    //console.log('handleRestrictionsChange', event.target.checked, event.target.value);
    // console.log('restrictionsCopy', restrictionsCopy);
    this.setState({ restrictions: restrictionsCopy });
  }
  addItem() {
    var itemsCopy = this.state.items.slice();
    if (this.state.firstName === '' || this.state.lastName === '')
      return
    itemsCopy.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      activity: this.state.activity,
      restrictions: this.state.restrictions
    });
    this.setState({ items: itemsCopy, firstName: "", lastName: "" , activity: App.activities[0], restrictions: [] });
    console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <InputAndLabel label="First Name" value={this.state.firstName} handleChange={this.handleFirstNameChange}/>
        <InputAndLabel label="Last Name" value={this.state.lastName} handleChange={this.handleLastNameChange}/>
        <SelectAndLabel label="Select Activity" value={this.state.activity} handleChange={this.handleActivityChange} activities={App.activities}/>
        <CheckBoxesAndLabel label="Check all that apply:" name="restrictions" value={this.state.restrictions} handleChange={this.handleRestrictionsChange} restrictions={App.restrictions}/>
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
