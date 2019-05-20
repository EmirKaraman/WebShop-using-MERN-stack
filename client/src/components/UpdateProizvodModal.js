import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { updateProizvod } from '../actions/proizvodActions';
import { updateKorpaProizvod } from '../actions/korpaActions';
import PropTypes from 'prop-types';

class UpdateProizvodModal extends Component {
	state = {
		modal: false,
		ime: '',
		cijena: 0,
		kolicina: 0,
		msg: null
	};

	static propTypes = {
		proizvod: PropTypes.object.isRequired,
		updateProizvod: PropTypes.func.isRequired,
		updateKorpaProizvod: PropTypes.func.isRequired,
		korpa: PropTypes.object.isRequired
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	doUpdateKorpa = () => {
		const { korpaProizvods } = this.props.korpa;

		korpaProizvods.forEach((element) => {
			if (element.ime === this.props.updateIme) {
				const updatedKorpaProizvod = {
					ime: this.state.ime,
					cijena: this.state.cijena
				};
				this.props.updateKorpaProizvod(updatedKorpaProizvod, element._id);
			}
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		var reg = new RegExp('^[0-9]+$');

		if (
			this.state.ime !== '' &&
			this.state.cijena !== '' &&
			this.state.cijena !== 0 &&
			this.state.kolicina !== '' &&
			this.state.kolicina !== 0 &&
			reg.test(this.state.cijena) &&
			reg.test(this.state.kolicina)
		) {
			const updatedProizvod = {
				ime: this.state.ime,
				cijena: this.state.cijena,
				kolicina: this.state.kolicina
			};

			this.props.updateProizvod(updatedProizvod, this.props.updateId);

			this.doUpdateKorpa();

			//Reset all
			this.setState({
				ime: '',
				cijena: 0,
				kolicina: 0
			});

			this.toggle();
			window.location.reload();
		} else {
			this.setState({ msg: 'You have to write in all the fields' });
		}
	};

	render() {
		return (
			<div>
				<Button
					color="dark"
					size="sm"
					style={{ marginLeft: '0.5rem' }}
					onClick={this.toggle}
					className="updateProizvodModal"
				>
					Edit
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Popunite polja sa zeljenim promjenama</ModalHeader>
					<ModalBody>
						{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="ime">Ime:</Label>
								<Input
									type="text"
									name="ime"
									id="ime"
									placeholder="Naziv proizvoda"
									onChange={this.onChange}
								/>
								<Label for="cijena" style={{ marginTop: '0.7rem' }}>
									Cijena:
								</Label>
								<Input
									type="text"
									name="cijena"
									id="cijena"
									placeholder="Cijena proizvoda u KM"
									onChange={this.onChange}
								/>
								<Label for="kolicina" style={{ marginTop: '0.7rem' }}>
									Kolicina:
								</Label>
								<Input
									type="text"
									name="kolicina"
									id="kolicina"
									placeholder="Ostalo na stanju"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: '2rem' }} block>
									Izvrsi zeljenu promjenu
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
	proizvod: state.proizvod,
	korpa: state.korpa
});

export default connect(mapStateToProps, { updateProizvod, updateKorpaProizvod })(UpdateProizvodModal);
