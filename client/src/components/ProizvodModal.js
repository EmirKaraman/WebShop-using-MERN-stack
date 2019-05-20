import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addProizvod } from '../actions/proizvodActions';
import PropTypes from 'prop-types';

class ProizvodModal extends Component {
	state = {
		modal: false,
		ime: '',
		cijena: 0,
		kolicina: 0
	};

	static propTypes = {
		proizvod: PropTypes.object.isRequired
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

	onSubmit = (e) => {
		e.preventDefault();

		var reg = new RegExp('^[0-9]+$');

		if (
			this.state.ime !== '' &&
			this.state.cijena !== 0 &&
			this.state.kolicina !== 0 &&
			reg.test(this.state.cijena) &&
			reg.test(this.state.kolicina)
		) {
			const newProizvod = {
				ime: this.state.ime,
				cijena: this.state.cijena,
				kolicina: this.state.kolicina
			};

			this.props.addProizvod(newProizvod);
		}

		this.setState({
			ime: '',
			cijena: 0,
			kolicina: 0
		});

		this.toggle();
		window.location.reload();
	};

	render() {
		return (
			<div>
				<Button color="dark" onClick={this.toggle} className="ProizvodModal">
					Dodaj proizvod
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Dodaj u listu proizvoda</ModalHeader>
					<ModalBody>
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
									Dodaj proizvod
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
	proizvod: state.proizvod
});

export default connect(mapStateToProps, { addProizvod })(ProizvodModal);
