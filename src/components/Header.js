import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header">
                    <div className="header-left">
                        <div className="title">Messaging App</div>
                    </div>
                    <div className="header-right">
                    {this.props.user ?
                        <div className='user-profile'>
                            <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
                        </div>
                    :
                        null             
                    }

                    {this.props.user ?
                            <button onClick={this.props.logout}>Logout</button> 
                    :
                        <button onClick={() => this.props.authenticate('google')}>Log In</button>              
                    }
                    </div>
                </div>
            </header>
          )
    }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
};

export default Header;
