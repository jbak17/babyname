class Box extends React.Component {

    constructor(props) {
        super();
    };

    render(){
        return (
            <div>Hello {this.props.name}</div>
        )
    }
}

let root = document.getElementById('container');

ReactDOM.render(<Box name="world"/>, root);