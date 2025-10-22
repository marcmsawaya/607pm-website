"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

// Initialize Stripe outside React render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm({ clientSecret, amount }) {
const stripe = useStripe();
const elements = useElements();
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

async function handleSubmit(e) {
e.preventDefault();
if (!stripe || !elements) return;
setLoading(true);

const { error, paymentIntent } = await stripe.confirmPayment({
elements,
confirmParams: {
// Redirect on success (can be the same page)
return_url: typeof window !== "undefined" ? window.location.origin + "/donate" : undefined,
},
redirect: "if_required",
});

if (error) {
setMessage(error.message || "Payment failed");
} else if (paymentIntent && paymentIntent.status === "succeeded") {
setMessage("Thank you for your donation. 💙");
} else {
setMessage("Payment processing...");
}
setLoading(false);
}
return (
<form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto bg-black/50 backdrop-blur rounded-2xl p-6 shadow">
<h2 className="text-2xl font-bold mb-4">Donate</h2>
<p className="mb-4 opacity-90">Amount: ${(amount / 100).toFixed(2)} USD</p>
<PaymentElement options={{ layout: "tabs" }} />
<button
disabled={!stripe || loading}
className="mt-6 w-full rounded-xl bg-white text-black font-semibold py-3 disabled:opacity-60"
>
{loading ? "Processing..." : "Donate Now"}
</button>
{message && <p className="mt-4 text-sm">{message}</p>}
</form>
    );
}

export default function DonatePage() {
const [clientSecret, setClientSecret] = useState("");
const [amount, setAmount] = useState(2500); // default $25.00

// Create a PaymentIntent whenever amount changes
useEffect(() => {
async function createPI() {
const res = await fetch("/api/create-payment-intent", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ amount, currency: "usd" }),
});
const data = await res.json();
setClientSecret(data.clientSecret);
}
createPI();
}, [amount]);

return (
<section className="flex-1 w-full px-6 py-10">
<div className="max-w-3xl mx-auto mb-6 text-center">
<h1 className="text-3xl sm:text-4xl font-extrabold">Support Beirut Relief</h1>
<p className="mt-3 opacity-90">Your donation goes to the Beirut Red Cross and Beirut Elna NGO.</p>
<div className="mt-6 flex items-center justify-center gap-3">
<label className="opacity-90">Choose amount (USD):</label>
<input
type="number"
min={5}
step={5}
value={amount / 100}
onChange={(e) => setAmount(Math.max(5, Number(e.target.value)) * 100)}
className="w-28 rounded-lg px-3 py-2 text-black"
/>
</div>
</div>

{clientSecret && (
<Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" } }}>
<CheckoutForm clientSecret={clientSecret} amount={amount} />
</Elements>
)}
</section>
);
}