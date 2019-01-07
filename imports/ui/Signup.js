import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';
import propTypes from 'prop-types';


export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    if (password.length < 9) {
      return this.setState({error: 'Password more than 8 charcters long. '});
    }


    this.props.createUser({email , password} , (err) => {
      if (err) {
        this.setState({error:err.reason});
      } else {
        this.setState({error:''});
      }
    });
  }
  
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Generic Signup</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email"  placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>
            <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: propTypes.func.isRequired

}


export default withTracker(() => {
  return {
    createUser: Accounts.createUser
  };
})(Signup);