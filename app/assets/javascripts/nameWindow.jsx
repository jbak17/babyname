/**
 * Our Comms object manages the websocket for us
 */
class Comms {
    constructor() {
        // open a websocket to our host, on the current path plus /socket
        let webSocket = new WebSocket("ws://" + location.host + "/websocket");

        // Handle incoming messages
        webSocket.onmessage = (m) => {
            // m is a MessageEvent. The string containing the data is in m.data
            // Let's parse it as JSON into a JSON object
            // We're receiving User's as json:
            let msg = JSON.parse(m.data);

            console.log(msg)

        };

        // When the WebSocket has connected, let's just send it a message.
        // Because of the way I've implemented the server, it will get sent
        // back to us, and received a moment later in webSocket.onmessage()
        // webSocket.onopen = () => webSocket.send(JSON.stringify({
        //     text: "This came over the websocket"
        // }));

        this.webSocket = webSocket
    }

    //Send message relies on being given an appropriate
    //JSON string to send to server.
    sendMessage(jsonMessage) {
        this.webSocket.send(jsonMessage)
    }

}

const comms = new Comms();



function partnerSelector(){
    return(
        <div><RegisterBox/></div>
    )
}

class RegisterBox extends React.Component {
    constructor() {
        super();
        this.state = { text: "" };

        // We need to do this, or we'll get exceptions in handleChange
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <textarea onChange={this.handleChange}>{ this.state.text }</textarea>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.send}>Link</button>
                </div>
            </div>
        );
    }
}


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
            return (<div className="col-sm-4">
                <NameList names={this.props.names}/>
            </div>)
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
            name: userData.name,
            email: userData.email,
            partner: userData.partner,
            selected: userData.nameList,
            shortlist: userData.shortList,
            current: "Jane",
            options: props.nameList
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
            current: nameOpts[Math.floor(Math.random() * nameOpts.length)]}
        );

        comms.sendMessage(this.createStateJSON())
    }

    handleNameReject(){
        this.setState({current: nameOpts[Math.floor(Math.random() * nameOpts.length)]})
    }

    createStateJSON(){
        return (
            JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "partner": this.state.partner,
                "nameList": this.state.selected,
                "shortList": this.state.shortlist
            })
        )
    }

    render(){
        return (
            <div className="row">
                <div ><OptionsColumn name={this.state.current} acceptName={this.handleNameAccept} rejectName={this.handleNameReject} /></div>
                <div ><NameColumn names={this.state.selected} /></div>
                <div ><NameColumn names={this.state.shortlist} /></div>
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

//=========================================

// rerender() is called by our code whenever we want to update the display.
function rerender() {

    // It just uses ReactDOM.render to regenerate our UI using the virtual DOM
    ReactDOM.render(<Box nameOption={name} nameList={nameOpts} input={data}/>, root);

}

// And, when all that's been parsed, let's do the first render
rerender();


