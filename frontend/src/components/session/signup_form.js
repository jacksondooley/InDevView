import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/signup_form.scss'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };
    
    this.loginModal = this.loginModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  loginModal() {
    this.props.closeModal()
		this.props.showModal("login")
	}

  componentWillReceiveProps(nextProps) {
    // if (nextProps.signedIn === true) {
    //   this.props.history.push('/');
    // }

    this.setState({errors: nextProps.errors})
  }

  componentDidUpdate(prevProps) {
      // if (this.props.signedIn === true) {
      //     this.props.history.push('/')
      // }

      if (this.props.errors !== prevProps.errors) {
        this.setState({errors: this.props.errors})
      }

      if (this.props.loggedIn) {
        this.props.closeModal();
      }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    let user2 = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.signup(user).then(
      ()=>{

        if (this.props.isAuthenticated === true) {
            this.props.closeModal();                 
        }
      }
    )
  }

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
      <div className="signup-form-container">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
            <br/>
              <input type="text"
                value={this.state.handle}
                onChange={this.update('handle')}
                placeholder="Handle"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            <br/>
            <input type="submit" value="Sign Up" />
            <span className="form-errors">
              {this.renderErrors()}
            </span>
          </div>
        </form>
        <small className="form-small">Already have an account? <br/>
          <Link
            className="form-small-link"
            onClick={this.loginModal}
            to="/"
            >Login
          </Link>
        </small>
      </div>
    );
  }
}

export default withRouter(SignupForm);