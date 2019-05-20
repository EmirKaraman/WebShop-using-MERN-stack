import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { deleteAll } from '../../actions/korpaActions';

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
		deleteAll: PropTypes.func.isRequired
	};

	//da bi prikazao error unutar modala, taj error moda da bude novi error koji se pojaivo, ne neki stariji da se prikaze, pa vrsis tu provjeru pomocu prevProps
	//posto ce se ova metoda pokrenuti svaki put kad se otvori register modal, ti zelis ukoliko je user logovan tj ako je kliknuo submit i backend vratio uspjeno token
	//zelis da zatvoris modal, posto nije tipicni toggle slucaj, jer zelis da prikazes errore unutar samo modala kad se pojave, a user ga moze rucno zatvoriti, ili
	//unijeti potrebne podatke uspjesno tako da je isAuthenticated true i nema potrebe a je modal vise otvoren.
	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			if (error.id === 'REGISTER_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggle();
			}
		}
	}

	componentWillUnmount() {
		this.props.deleteAll();
	}

	toggle = () => {
		this.props.clearErrors(); //ocistis errore svaki put kad se zatvori ili otvori modal, jer su errori vezani za uspjesan register.
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { name, email, password } = this.state;

		const newUser = {
			name,
			email,
			password
		};

		this.props.register(newUser);
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmit.bind(this)}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Name"
									className="mb-3"
									onChange={this.onChange}
								/>

								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.onChange}
								/>

								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: '2rem' }} block>
									Register
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { register, clearErrors, deleteAll })(RegisterModal);
