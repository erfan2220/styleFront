import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key', {
    apiVersion: '2020-08-27',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 5000, // amount in cents
                currency: 'usd',
            });

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch  {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
