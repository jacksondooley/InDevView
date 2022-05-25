import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/login_form.scss'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.signupModal = this.signupModal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  signupModal() {
    this.props.closeModal()
		this.props.showModal("signup");
	}

  // Once the user has been authenticated, redirect to the Tweets page
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.currentUser === true) {
//       this.props.history.push('/tweets');
//     }

//     // Set or clear errors
//     this.setState({errors: nextProps.errors})
//   }

  componentDidUpdate(prevProps){
      if (this.props.currentUser === true) {
          this.props.history.push('/')
      } 
      if (this.props.errors !== prevProps.errors) {
        this.setState({errors: this.props.errors})
      }

      if (this.props.loggedIn) {
        this.props.closeModal();
      }
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
    // this.props.closeModal();

    // componentDidUpdate()  {
    // }
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='login-form-container'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <input type="submit" value="Login" />
          </div>
        </form>
        <span className="form-errors">
          {this.renderErrors()}
        </span>
        <small className="form-small">Don't have an account? <br/>
          <Link className="form-small-link" onClick={this.signupModal}>Sign Up</Link>
        </small>
      </div>
    );
  }
}

export default withRouter(LoginForm);