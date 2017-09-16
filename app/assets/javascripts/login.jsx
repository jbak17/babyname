
function Splash(){
    return(
        <div className="jumbotron">
            <h1 className="display-3">The name game!</h1>
            <p>This is a simple tool to help people choose a name for their baby!</p>
        </div>
        )

}

class LoginBox extends React.Component {

    render(){
        return (
            <div>
                <form action="login" method="post">
                    <label>Email address</label>
                    <input type="text" name="email"></input>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class RegisterBox extends React.Component {
    render(){
        return (
            <div>
                <form action="newUser" method="post">
                    <label>Name</label>
                    <input type="text" name="name"></input>
                    <label >Email</label>
                    <input type="text" name="email"></input>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}

class Box extends React.Component {
    constructor(props){
        super();
        this.state = {
            initial: true,
            login: false,
            register: false
        }
    //bind handlers so we don't lose 'this' reference
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        this.setState({initial: false, login: true})
    }

    handleRegister(){
        this.setState({initial: false, register: true})
    }

    render(){
        //if login show login
        if(this.state.login){
            return(
                <div className="row">
                    <div><Splash/></div>
                    <div><LoginBox/></div>
                </div>
            )
        }
        //if register show register
        else if(this.state.register){
            return(
                <div className="row">
                    <div><Splash/></div>
                    <div><RegisterBox/></div>
                </div>
            )
        }
        else {
            //if initial show buttons
            if (this.state.initial){
                return(
                    <div className="row">
                        <div><Splash/></div>
                        <div className="col-lg-12">
                            <a type="button" className="btn btn-primary" onClick={this.handleLogin}>Login</a>
                            <a type="button" className="btn btn-primary" onClick={this.handleRegister}>Register</a>
                        </div>
                    </div>

                )
            }
        }
    }
}

//========================
let root = document.getElementById('container');

let names = document.getElementByID('names');


ReactDOM.render(<Box startList={names}/>, root);