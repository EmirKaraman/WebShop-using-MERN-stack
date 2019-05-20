import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import WebShop from './components/WebShop';
import Footer from './components/Footer';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<AppNavbar />
					<Container>
						<div>
							<WebShop />
						</div>
					</Container>
					<Footer />
				</div>
			</Provider>
		);
	}
}

export default App;
