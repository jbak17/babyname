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
            let msg = JSON.parse(m.data);

            console.log(msg)

        };

        // When the WebSocket has connected, let's just send it a message.
        // Because of the way I've implemented the server, it will get sent
        // back to us, and received a moment later in webSocket.onmessage()
        webSocket.onopen = () => webSocket.send(JSON.stringify({
            text: "This came over the websocket"
        }));

        this.webSocket = webSocket
    }

    sendMessage(name) {
        this.webSocket.send(JSON.stringify(
            {
                kind: "user",
                user: name
            }
        ))
    }

    sendPartnerRegistration(email){
        this.webSocket.send(JSON.stringify(
            {
                kind: "partner",
                partner: email
            }
        ))
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

    handleChange(evt) {
        this.setState({ text: evt.target.value })
    }

    send(evt) {
        // Use our Comms object to send a chat message to the server
        comms.sendPartnerRegistration(this.state.text)
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
        this.state = {
            partner: 0
        };

        this.handlePartner = this.handlePartner.bind(this);
    }

    handlePartner(e) {
        this.props.p_select();
        this.setState({
            partner: 1
        });
        rerender()
    }

    render(){
        if (this.props.p === true){
            return (<div className="col-sm-4">
                <NameList names={this.props.names}/>
            </div>)
        } else if (this.state.partner === 1){
            return <RegisterBox/>
        }
        else { //if no partner is selected
            return (<div className="col-sm-4">
                <div className="jumbotron" id="partnerbox">
                    <h2>Choose a partner</h2>
                    <p>By choosing a partner you can find see what names you both like.</p>
                    <button type="button" className="btn btn-warning" onClick={this.handlePartner}>Choose</button>
                </div>

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
        this.handlePartnerSelect = this.handlePartnerSelect.bind(this);
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

    handlePartnerSelect(i) {
        comms.sendMessage("Paul");
        console.log("button clicked")
    }

    render(){
        return (
            <div className="row">
                <div ><OptionsColumn name={this.state.current} acceptName={this.handleNameAccept} rejectName={this.handleNameReject} /></div>
                <div ><NameColumn names={this.state.selected} p={true}/></div>
                <div ><NameColumn names={this.state.options} p={this.state.partner} p_select={this.handlePartnerSelect}/></div>
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
    ReactDOM.render(<Box nameOption={name} nameList={nameOpts} partner={false} input={data}/>, root);

}

// And, when all that's been parsed, let's do the first render
rerender();


