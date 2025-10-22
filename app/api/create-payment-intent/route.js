import Stripe from "stripe";

export async function POST(request) {
const { amount = 2500, currency = "usd" } = await request.json();

if (!process.env.STRIPE_SECRET_KEY) {
return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), { status: 500 });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: "2024-06-20",
});

try {
const paymentIntent = await stripe.paymentIntents.create({
amount, // amount in cents
currency,
automatic_payment_methods: { enabled: true },
metadata: { campaign: "beirut_relief" },
});

return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
headers: { "Content-Type": "application/json" },
status: 200,
});
} catch (err) {
return new Response(JSON.stringify({ error: err.message }), { status: 400 });
}
}