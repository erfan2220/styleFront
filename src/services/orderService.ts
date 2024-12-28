import axios from "axios";



const API_URL=`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/orders`;

interface OrderData {
    billingInfo: {
        name: string;
        email: string;
        address: string;
    };
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
    totalPrice: number;
}

interface PaymentDetails {
    paymentMethod: string;
    paymentAmount: number;
}

export const createOrder = async (orderData:OrderData)=>{
    try {
        const response = await axios.post(API_URL, orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Rethrow the error to be caught in the component
    }
}

export const processPayment = async (orderId: string, paymentDetails: PaymentDetails) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}/payment`, paymentDetails);
        return response.data;
    } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
    }
};

