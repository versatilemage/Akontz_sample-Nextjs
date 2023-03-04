import React, { useState, useEffect } from "react";
// import CheckoutBtn from "@/components/CheckoutButton/CheckoutBtn";
import { useSelector, useDispatch } from "react-redux";
import PageBanner from "../components/Common/PageBanner";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
import PaymentButton from "@/components/CheckoutButton/RazorPay";
import PaymentPayPalButton from "@/components/CheckoutButton/PayPal";

const Checkout = ({ user }) => {
	console.log(user);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [cartAmout, setCartAmaount] = useState(0);
	const [modeofPayment, setModeofPayment] = useState("razorpay");
	const dispatch = useDispatch();

	useEffect(() => {
		const { cartTotal } = calculateCartTotal(cartItems);
		setCartAmaount(cartTotal);
	}, [cartItems]);

	const onClearCart = () => {
		dispatch({
			type: "RESET_CART",
		});
	};

	const addGST = (e) => {
		return e*1.18
	}

	const changePaymentType = (e) => {
		setModeofPayment(e.target.value)
	}

	return (
		<React.Fragment>
			<PageBanner
				pageTitle="Checkout"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Checkout"
			/>

			<div className="checkout-area ptb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="order-details">
								<h3 className="title">Your Order</h3>

								<div className="order-table table-responsive">
									<table className="table table-bordered">
										<thead>
											<tr>
												<th scope="col">
													Product Name
												</th>
												<th scope="col">Total</th>
											</tr>
										</thead>

										<tbody>
											{cartItems.map((cart) => (
												<tr key={cart.id}>
													<td className="product-name">
														<a href="#">
															{cart.title}
														</a>
													</td>

													<td className="product-total">
														<span className="subtotal-amount">
														₹{cart.price}
														</span>
													</td>
												</tr>
											))}

											<tr>
												<td className="total-price">
													<span>Order Total (+18% GST)</span>
												</td>

												<td className="product-subtotal">
													<span className="subtotal-amount">
													₹{addGST(cartAmout)}
													</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="payment-options_all-container">
									<div className="form-group">
										<label>Mode of payment</label><br/>
											<div className="payment_radio-container">
							
												<label for="Razorpay" className="mode_of-payment-options">
													<input type="radio" id="razorpay" name="payment" value="razorpay" onChange={changePaymentType}/>
													Razorpay
												</label>
												
												<label for="paypal" className="mode_of-payment-options">
													<input type="radio" id="paypal" name="payment" value="paypal" onChange={changePaymentType}/>
													Paypal
												</label>
											</div>
									</div>
								</div>

								{modeofPayment === "razorpay" && <PaymentButton
									price={addGST(cartAmout)}
									cartItems={cartItems}
									user={user}
									onClearCart={() => onClearCart()}
								/>}
								{modeofPayment === "paypal" &&<PaymentPayPalButton
									price={2000}
									cartItems={cartItems}
									user={user}
									onClearCart={() => onClearCart()}
								/>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Checkout;
