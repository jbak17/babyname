
/*
Props:
    name: String
    acceptName: () => when we want to keep name
    rejectName: () => when we want to reject name

 */
class OptionsColumn extends React.Component {

    constructor(props){
        super(props);
        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this);
    }

    handleChangeA(e) {
        this.props.acceptName(this.props.name)
    }

    handleChangeR(e) {
        this.props.rejectName()
    }

    render(){
        return (
            <div className="col-sm-4">
                <div className="jumbotron">
                    <h2>{this.props.name}</h2>
                </div>
                <ul>
                    <li><button type="button" className="btn btn-success" onClick={this.handleChangeA}>Yes</button></li>
                    <li><button type="button" className="btn btn-danger" onClick={this.handleChangeR}>No</button></li>
                </ul>
            </div>
            )
    }
}

/*
Props:
    value: String
 */
function NameCard(props) {
        console.log("namecard made");
    return (
        <li className="list-group-item"><button className="btn btn-info">
            {props.value}
        </button></li>
    );
}

/*
Props:
    names = List[String]
 */
function NameList(props) {
    const names = props.names;
    if (props.names){
        const listItems = names.map((n) =>
            <NameCard value={n}/>
        );
        return (
            <ul>{listItems}</ul>
        );
    } else {
        return (<ul></ul>);
    }
}

//takes a list of names
class NameColumn extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.p === true){
            return (<div className="col-sm-4">
                <NameList names={this.props.names}/>
            </div>)
        }
        else { //if no partner is selected
            return (<div className="col-sm-4">
                <div className="jumbotron">
                    <h2>Choose a partner</h2>
                    <p>By choosing a partner you can find see what names you both like.</p>
                </div>
                <button type="button" className="btn btn-warning">Choose</button>

            </div>)
        }

    }
}

/*
This is the source of truth for the name page: all handlers to change
what is displayed are routed through here.
 */
class Box extends React.Component {

    constructor(props) {
        super();
        const userData = JSON.parse(props.input);
        this.state = {
            current: "Jane",
            options: props.nameList,
            selected: userData.nameList,
            partner: userData.partner
        };
        this.handleNameAccept = this.handleNameAccept.bind(this);
        this.handleNameReject = this.handleNameReject.bind(this);
    };

    /*
    Called when a user selects a name. We need to add the name to
    the list of accepted names and give the user a new name
    to choose.
     */
    handleNameAccept(name) {
        //add name to selected list
        let names = this.state.selected;
        names.push(name);
        this.setState({
            selected: names,
            current: nameOpts[Math.floor(Math.random() * nameOpts.length)]});
    }

    handleNameReject(){
        this.setState({current: nameOpts[Math.floor(Math.random() * nameOpts.length)]})
    }

    render(){
        return (
            <div className="row">
                <div ><OptionsColumn name={this.state.current} acceptName={this.handleNameAccept} rejectName={this.handleNameReject} /></div>
                <div ><NameColumn names={this.state.selected} p={true}/></div>
                <div ><NameColumn names={this.state.options} p={this.state.partner}/></div>
            </div>




        )
    }
}

//==============================
let root = document.getElementById('container');
let nameOpts = ["Hayley", "Daphne", "Eva", "Nisma", "John", "Hassan", "Greg", "Craig"];
let name = nameOpts[Math.floor(Math.random() * nameOpts.length)];
let nameSuccess = [];
let data = root.getAttribute('data');


ReactDOM.render(<Box nameOption={name} nameList={nameOpts} partner={false} input={data}/>, root);