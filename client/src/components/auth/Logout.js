import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { deleteAll } from '../../actions/korpaActions';

import PropTypes from 'prop-types';

export class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		deleteAll: PropTypes.func.isRequired
	};

	logoutCallback = () => {
		this.props.logout();
	};

	deleteAllCallback = () => {
		this.props.deleteAll();
	};

	DoLogout = () => {
		this.logoutCallback();
		this.deleteAllCallback();
		window.location.reload();
	};

	render() {
		return (
			<Fragment>
				<NavLink onClick={this.DoLogout} href="#">
					Logout
				</NavLink>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout, deleteAll })(Logout);

//ne treba ti mapstatetoprops kad imas samo jednu akciju
//sve sto ti treba za ovu komponentu je jedan link koji kad neko klikne treba da se
//aktivira akcija za logout i to je sve, ovo ces ubaciti u appnavbar poslije ali kad
//je user logovan da se samo tad vidi ovaj link.
