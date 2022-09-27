import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductsScreen from "./screens/ProductsScreen";
import Footer from "./components/Footer";
import shippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Switch>
						<Route path='/' component={HomeScreen} exact />
						<Route path='/product/:id' component={ProductsScreen} />
						<Route path='/register' component={RegisterScreen} exact />
						<Route path='/login' component={LoginScreen} exact />
						<Route path='/shipping' component={shippingScreen} />
						<Route path='/profile' component={ProfileScreen} exact />
						<Route path='/payment' component={PaymentScreen} exact />
						<Route path='/placeorder' component={PlaceOrderScreen} />
						<Route path='/order/:id' component={OrderScreen} />
						<Route path='/cart/:id?' component={CartScreen} />
						<Route path='/admin/userList' component={UserListScreen} />
						<Route
							path='/admin/productList'
							exact
							component={ProductListScreen}
						/>
						<Route
							path='/admin/productList/:pageNumber'
							exact
							component={ProductListScreen}
						/>
						<Route path='/admin/user/:id/edit' component={UserEditScreen} />
						<Route
							path='/admi

						n/
						orderList'
							component={OrderListScreen}
						/>
						<Route
							path='/admin/product/:id/edit'
							component={ProductEditScreen}
						/>
						<Route path='/search/:keyword' component={HomeScreen} />
						<Route path='/page/:pageNumber' exact component={HomeScreen} />
						<Route
							path='/search/:keyword/page/:pageNumber'
							component={HomeScreen}
						/>
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
