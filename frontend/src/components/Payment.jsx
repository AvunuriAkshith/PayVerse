import { useState } from "react";
import axios from "axios";

import {
    CreditCard,
    ShieldCheck,
    Wallet,
    TrendingUp,
    CheckCircle2,
    Sparkles,
    IndianRupee
} from "lucide-react";

const plans = [
    {
        id: 1,
        name: "Starter",
        price: 499,
        users: "1 User",
        popular: false,
        features: [
            "Basic Payment Analytics",
            "Secure Checkout",
            "Email Support"
        ]
    },
    {
        id: 2,
        name: "Professional",
        price: 1499,
        users: "5 Users",
        popular: true,
        features: [
            "Advanced Analytics",
            "Priority Support",
            "Transaction Reports"
        ]
    },
    {
        id: 3,
        name: "Enterprise",
        price: 3999,
        users: "Unlimited Users",
        popular: false,
        features: [
            "Custom Dashboard",
            "Dedicated Manager",
            "API Access"
        ]
    }
];

const Payment = () => {

    const [selectedPlan, setSelectedPlan] = useState(plans[1]);

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/create-order",
                {
                    amount: selectedPlan.price,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`
                }
            );

            const order = response.data;

            const options = {

                key: "rzp_test_SnC95LVCz8ytCf",

                amount: order.amount,

                currency: order.currency,

                name: "Akshith Payments",

                description: `${selectedPlan.name} Subscription`,

                image: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",

                order_id: order.order_id,

                handler: async function (response) {

                    const verifyResponse = await axios.post(
                        "http://127.0.0.1:8000/verify-payment",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }
                    );

                    if (verifyResponse.data.status === "success") {
                        alert("Payment Successful ✅");
                    } else {
                        alert("Payment Verification Failed ❌");
                    }
                },

                prefill: {
                    name: "Akshith",
                    email: "akshith@example.com",
                    contact: "9999999999"
                },

                notes: {
                    selected_plan: selectedPlan.name
                },

                theme: {
                    color: "#4f46e5"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error(error);

            alert("Payment Failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="dashboard-wrapper">

            <aside className="sidebar">

                <div className="logo-section">
                    <div className="logo-circle">A</div>

                    <div>
                        <h2>Akshith Pay</h2>
                        <p>Premium Dashboard</p>
                    </div>
                </div>

                <div className="analytics-grid">

                    <div className="analytics-card">
                        <Wallet size={28} />
                        <h3>₹1,24,500</h3>
                        <p>Total Revenue</p>
                    </div>

                    <div className="analytics-card">
                        <TrendingUp size={28} />
                        <h3>+28%</h3>
                        <p>Monthly Growth</p>
                    </div>

                    <div className="analytics-card">
                        <ShieldCheck size={28} />
                        <h3>100%</h3>
                        <p>Secure Payments</p>
                    </div>

                </div>

                <div className="secure-box">
                    <ShieldCheck size={20} />
                    <span>256-bit SSL Secure Payment Gateway</span>
                </div>

            </aside>

            <main className="main-content">

                <div className="top-banner">

                    <div>
                        <h1>Payment Dashboard</h1>

                        <p>
                            Choose a subscription plan and continue with secure checkout.
                        </p>
                    </div>

                    <div className="live-status">
                        <span></span>
                        Live Payments
                    </div>

                </div>

                <section className="plans-section">

                    {plans.map((plan) => (

                        <div
                            key={plan.id}
                            className={`plan-card ${selectedPlan.id === plan.id ? "active" : ""}`}
                            onClick={() => setSelectedPlan(plan)}
                        >

                            {plan.popular && (

                                <div className="popular-tag">
                                    <Sparkles size={14} />
                                    Most Popular
                                </div>

                            )}

                            <h2>{plan.name}</h2>

                            <div className="price-box">
                                <IndianRupee size={26} />
                                <h1>{plan.price}</h1>
                            </div>

                            <p className="users-text">
                                {plan.users}
                            </p>

                            <div className="features-list">

                                {plan.features.map((feature, index) => (

                                    <div
                                        key={index}
                                        className="feature-item"
                                    >
                                        <CheckCircle2 size={18} />
                                        <span>{feature}</span>
                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

                </section>

                <section className="checkout-section">

                    <div className="summary-card">

                        <div className="summary-header">

                            <div>
                                <h2>Checkout Summary</h2>
                                <p>Review your selected plan</p>
                            </div>

                            <CreditCard size={32} />

                        </div>

                        <div className="summary-item">
                            <span>Plan</span>
                            <strong>{selectedPlan.name}</strong>
                        </div>

                        <div className="summary-item">
                            <span>Users</span>
                            <strong>{selectedPlan.users}</strong>
                        </div>

                        <div className="summary-item">
                            <span>GST</span>
                            <strong>Included</strong>
                        </div>

                        <div className="summary-total">
                            <span>Total Amount</span>
                            <h1>₹{selectedPlan.price}</h1>
                        </div>

                        <button
                            className="pay-btn"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Processing Payment..."
                                    : `Pay ₹${selectedPlan.price}`
                            }
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Payment;