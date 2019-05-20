import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { loadUser } from '../actions/authActions';

class AppNavbar extends Component {
	state = {
		isOpen: false
	};

	static propTypes = {
		auth: PropTypes.object.isRequired,
		loadUser: PropTypes.func.isRequired
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	//mijenja isopen is state u suprotno, to je sve sto radi iz true u false i obrnuto.

	componentDidMount() {
		const { token } = this.props.auth;
		if (token !== null) this.props.loadUser();
	}

	render() {
		const { isAuthenticated, user, token } = this.props.auth;
		//destructor, da preuzmes isAuthenticated i user is this.props.auth.user i -||-.isAuthenticated

		const authLinks = (
			<Fragment>
				<NavItem>
					<span className="navbar-text mr-3">
						<strong>{user ? `Welcome ${user.name}` : ''}</strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);
		//imas iznad to za welcome message, ako postoji user - ako je logovan prikazat ces welcome ime usera u suprotnom neces nista prikazati.

		const guestLinks = (
			<Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</Fragment>
		);

		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">ShoppingList</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{isAuthenticated || token !== null ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});
//treba ti auth state da bi mogao da provjeravas je li user logovan i td.

export default connect(mapStateToProps, { loadUser })(AppNavbar);
