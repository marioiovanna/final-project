import React, {PropTypes} from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        // set the initial component state
        this.state = {
            errors: {},
            successMessage,
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success

                // change the component-container state
                this.setState({
                    errors: {}
                });

                // save the token
                Auth.authenticateUser(xhr.response.token);


                // change the current URL to /
                this.context.router.replace('/');
            } else {
                // failure

                // change the component state
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
            <div className="Main">
                <div className="container main">
                    <div className="col-md-6 text-center">
                        <div className="main-title text-center">Keep Your Memories Alive</div>
                        <br/>
                        <div className="main-text">Introducing a new way to save and to revive yours memories. Unique
                            experience to be there ...
                        </div>
                    </div>

                    <div className="col-md-1">
                    </div>

                    <div className="col-md-5">
                        <LoginForm
                            onSubmit={this.processForm}
                            onChange={this.changeUser}
                            errors={this.state.errors}
                            successMessage={this.state.successMessage}
                            user={this.state.user}
                        />

                        <p>OR</p>
                        <hr/>
                    </div>
                </div>

                <div className="jumbotron jumbo2">
                    <div className="container">
                        <div className="col-md-6">
                            <h2>Take your Memories anywhere</h2>
                            <br/>
                            <p>Save files on your computer, then access them on your phone from the road. Everything you
                                keep is synced automatically to all your devices</p>
                        </div>
                        <div className="col-md-6">
                            <img alt="road"
                                 src="https://cfl.dropboxstatic.com/static/images/index/animation-strips/static-images/docs-anywhere-vflA67DXc.png"/>
                        </div>

                        <div className="col-md-12">
                            <br/>
                            <br/>
                            <hr/>
                        </div>

                        <div className="col-md-6">
                            <img alt="keep"
                                 src="https://cfl.dropboxstatic.com/static/images/index/animation-strips/static-images/send-videos-quickly-vflhWvqHj.png"/>
                        </div>
                        <div className="col-md-6">
                            <h2>Acces videos quickly</h2>
                            <br/>
                            <p>Send your entire wedding video to family with a simple link. It’s easy to share large
                                files with anyone — even if they don’t have a an account.</p>
                        </div>

                        <div className="col-md-12 spaceBet">
                            <br/>
                            <br/>
                            <hr/>
                        </div>

                        <div className="col-md-6">
                            <h2>Never lose a file again</h2>
                            <br/>
                            <p>Save files on your computer, then access them on your phone from the road. Everything you
                                keep is synced automatically to all your devices</p>
                        </div>
                        <div className="col-md-6">
                            <img alt="road"
                                 src="https://cfl.dropboxstatic.com/static/images/index/animation-strips/static-images/never-lose-a-file-again-vfleR0in4.png"/>
                        </div>
                    </div>


                    <div className="container">
                        <div className="col-md-12">
                            <hr />
                            <br />
                            <h1>START TODAY</h1>
                            <LoginForm
                                onSubmit={this.processForm}
                                onChange={this.changeUser}
                                errors={this.state.errors}
                                successMessage={this.state.successMessage}
                                user={this.state.user}
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;