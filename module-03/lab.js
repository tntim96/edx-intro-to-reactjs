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
      <tr>
        <th>Remove</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Activity</th>
        <th>Restrictions</th>
      </tr>
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
    </table>
  );
}




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", items: [] };
  }
  render() {
    return (
      <div>Hey
      </div>
    );
  }
}

ReactDOM.render(
  <Table tableList={[{firstName:"Captain",lastName:"America",activity:"Rescuing",restrictions:"Can't fly"}]} />,
  document.getElementById("root")
);
