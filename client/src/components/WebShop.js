import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Alert, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getProizvods, deleteProizvod, searchProizvods } from '../actions/proizvodActions';
import {
	getKorpaProizvods,
	deleteKorpaProizvod,
	deleteAll,
	addKorpaProizvod,
	izracunajUkupnuCijenu
} from '../actions/korpaActions';
import PropTypes from 'prop-types';
import UpdateProizvodModal from './UpdateProizvodModal';
import ProizvodModal from './ProizvodModal';

class WebShop extends Component {
	state = {
		search: ''
	};
	static propTypes = {
		getProizvods: PropTypes.func.isRequired,
		deleteProizvod: PropTypes.func.isRequired,
		proizvod: PropTypes.object.isRequired,
		korpa: PropTypes.object.isRequired,
		getKorpaProizvods: PropTypes.func.isRequired,
		deleteKorpaProizvod: PropTypes.func.isRequired,
		deleteAll: PropTypes.func.isRequired,
		addKorpaProizvod: PropTypes.func.isRequired,
		izracunajUkupnuCijenu: PropTypes.func.isRequired,
		searchProizvods: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired
	};

	//Samo pozivi da se odvoji sve posebno

	getProizvodsDo = () => {
		this.props.getProizvods();
	};

	getKorpaProizvodsDo = () => {
		this.props.getKorpaProizvods();
	};

	deleteAllDo = () => {
		this.props.deleteAll();
	};

	searchReset = () => {
		this.props.searchProizvods('');
	};

	deleteProizvodDo = (id) => {
		this.props.deleteProizvod(id);
	};

	deleteKorpaProizvodDo = (id) => {
		this.props.deleteKorpaProizvod(id);
	};

	izracunajUkupnuCijenuDo = () => {
		this.props.izracunajUkupnuCijenu();
	};

	addKorpaProizvodDo = (korpaProizvod) => {
		this.props.addKorpaProizvod(korpaProizvod);
	};

	//sve ostale metode koje pozivaju ove gore

	componentDidMount() {
		this.getProizvodsDo();
		const { isAuthenticated, token } = this.props.auth;
		if (isAuthenticated || token !== null) {
			this.getKorpaProizvodsDo();
			this.izracunajUkupnuCijenuDo();
		}
	}

	onProizvodDeleteClick = (id, ime) => {
		this.deleteProizvodDo(id);
		const { korpaProizvods } = this.props.korpa;
		korpaProizvods.forEach((element) => {
			if (element.ime === ime) {
				this.deleteKorpaProizvodDo(element._id);
			}
		});
		this.izracunajUkupnuCijenuDo();
		if (this.state.search.length > 0) this.searchReset();
		window.location.reload();
	};

	onKorpaProizvodDeleteClick = (id) => {
		this.deleteKorpaProizvodDo(id);
		this.izracunajUkupnuCijenuDo();
		window.location.reload();
	};

	onKorpaAddClick = (ime, cijena, kolicina, _id) => {
		const korpaProizvod = {
			ime: ime,
			cijena: cijena,
			kolicina: kolicina,
			_id: _id
		};

		if (kolicina > 1) {
			this.addKorpaProizvodDo(korpaProizvod);
			this.getKorpaProizvodsDo();
			this.getProizvodsDo();
			this.izracunajUkupnuCijenuDo();
			window.location.reload();
		} else {
			alert(`Nije moguce dodati proizvod ${ime}, mora biti minimalno jedan na stanju!`);
		}
	};

	onDeleteAllClick = () => {
		this.deleteAllDo();
		this.izracunajUkupnuCijenuDo();
		window.location.reload();
	};

	onChange = (e) => {
		this.setState({ search: e.target.value }, this.handleSubmit);
	};

	handleSubmit = () => {
		const searchText = {
			ime: this.state.search
		};
		this.props.searchProizvods(searchText);
	};

	//Posto je setState asinhrovani call, moras posebno napraviti callback sto je ovdje handleSubmit i to izvan ove onChange metode, da ti ne bi kasnio setState za jedno slovo.
	//Takodjer moras proslijediti metodu bez () a ako ti trebaju parametri pises ovako this.setState({ search: e.target.value },(nesto) => this.handleSubmit(nesto));
	//Ili ovako this.setState({ search: e.target.value },this.handleSubmit.bind(this,nesto));

	render() {
		const { proizvods, searchProizvods } = this.props.proizvod;
		const { ukupnaCijena, korpaProizvods } = this.props.korpa;
		const { isAuthenticated, token } = this.props.auth;
		return (
			<div>
				<div className="listaProizvoda">
					<h2>Lista dostupnih proizvoda:</h2>
					<Label style={{ marginTop: '2rem' }} className="label" for="search">
						Search for proizvod:
					</Label>
					<Input
						style={{ marginBottom: '2rem' }}
						type="text"
						name="search"
						id="search"
						placeholder="Search text?"
						onChange={this.onChange}
					/>
					<ListGroup style={{ marginBottom: '2rem' }}>
						<TransitionGroup className="web-shop">
							{//Prvi slucaj je kad search nije obavljen, duzina je manja od 1, treba se prikazati svi elementi
							searchProizvods.length < 1 && this.state.search === '' ? (
								proizvods.map(({ _id, ime, cijena, kolicina }) => (
									<CSSTransition key={_id} timeout={500} classNames="fade">
										<ListGroupItem>
											<h5 className="GlavniPodaciProizvod">
												<strong>
													{ime} - {cijena} KM
												</strong>, Na stanju: <strong>{kolicina}</strong>
											</h5>
											{isAuthenticated || token !== null ? (
												<div className="butoni">
													<Button
														color="danger"
														size="sm"
														style={{ marginLeft: '0.5rem' }}
														onClick={this.onProizvodDeleteClick.bind(this, _id, ime)}
													>
														Delete
													</Button>
													<UpdateProizvodModal
														updateId={_id}
														updateIme={ime}
														updateCijena={cijena}
													/>
													<Button
														color="info"
														style={{ marginLeft: '0.5rem' }}
														size="sm"
														onClick={this.onKorpaAddClick.bind(
															this,
															ime,
															cijena,
															kolicina,
															_id
														)}
													>
														Korpa
													</Button>
												</div>
											) : null}
										</ListGroupItem>
									</CSSTransition>
								))
							) : (
								searchProizvods.map(({ _id, ime, cijena, kolicina }) => (
									<CSSTransition key={_id} timeout={500} classNames="fade">
										<ListGroupItem>
											<h5 className="GlavniPodaciProizvod">
												<strong>
													{ime} - {cijena} KM
												</strong>, Na stanju: <strong>{kolicina}</strong>
											</h5>
											{isAuthenticated || token !== null ? (
												<div className="butoni">
													<Button
														color="danger"
														size="sm"
														style={{ marginLeft: '0.5rem' }}
														onClick={this.onProizvodDeleteClick.bind(this, _id, ime)}
													>
														Delete
													</Button>
													<UpdateProizvodModal
														updateId={_id}
														updateIme={ime}
														updateCijena={cijena}
														updateKolicina={kolicina}
													/>
													<Button
														color="info"
														style={{ marginLeft: '0.5rem' }}
														size="sm"
														onClick={this.onKorpaAddClick.bind(
															this,
															ime,
															cijena,
															kolicina,
															_id
														)}
													>
														Korpa
													</Button>
												</div>
											) : null}
										</ListGroupItem>
									</CSSTransition>
								))
							)}
						</TransitionGroup>
					</ListGroup>
					{isAuthenticated || token !== null ? (
						<ProizvodModal />
					) : (
						<h4 className="addProzvodModaltext">Please log in to manage proizvods</h4>
					)}
				</div>
				<div className="korpa">
					{isAuthenticated || token !== null ? (
						<h2>Proizvodi u korpi:</h2>
					) : (
						<h4 className="addtokorpatext">Log in to add proizvods to korpa</h4>
					)}

					<ListGroup style={{ marginTop: '5rem' }}>
						<TransitionGroup className="web-shop">
							{korpaProizvods.map(({ _id, ime, cijena }) => (
								<CSSTransition key={_id} timeout={500} classNames="fade">
									<ListGroupItem>
										<div className="korpaButoni">
											<h5>
												<strong>
													{ime} - {cijena} KM
												</strong>
											</h5>
											<Button
												color="danger"
												size="sm"
												style={{ marginLeft: '1rem' }}
												onClick={this.onKorpaProizvodDeleteClick.bind(this, _id)}
											>
												Delete
											</Button>
										</div>
									</ListGroupItem>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
					<div className="cijenaDisplay">
						{korpaProizvods.length > 0 ? (
							<Button
								color="danger"
								size="lg"
								className="deleteAllButton"
								onClick={this.onDeleteAllClick.bind(this)}
							>
								Ocisti korpu
							</Button>
						) : null}
						{ukupnaCijena > 0 ? <Alert color="info">Ukupna cijena: {ukupnaCijena} KM</Alert> : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	proizvod: state.proizvod,
	korpa: state.korpa,
	auth: state.auth
});

export default connect(mapStateToProps, {
	getProizvods,
	deleteProizvod,
	getKorpaProizvods,
	addKorpaProizvod,
	deleteAll,
	deleteKorpaProizvod,
	izracunajUkupnuCijenu,
	searchProizvods
})(WebShop);
