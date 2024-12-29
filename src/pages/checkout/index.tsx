//@ts-nocheck
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateQuantity, removeItem, clearCart } from '@/store/slices/cartSlice';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import {useMutation} from "@tanstack/react-query";
import {createOrder} from "@/services/orderService";
import {useRouter} from "next/router";

export default function CheckoutPage()
{
    const router = useRouter();

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();


    const [billingInfo,setBillinginfo]=useState({
        name:'',
        email:'',
        address:''
    })

    const [formError, setFormError] = useState<string | null>(null)

    const { mutate: createOrderMutation } = useMutation({
        mutationFn: createOrder, // The function that returns a promise
        onSuccess: (data) => {
            console.log("Order created:", data);
        },
        onError: (error) => {
            console.error("Error creating order:", error);
        },
    });




    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillinginfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!billingInfo.name || !billingInfo.email || !billingInfo.address) {
            setFormError('All fields are required.');
            return false;
        }
        setFormError(null);
        return true;
    };

    // const handleSubmitOrder = () => {
    //     if (!validateForm()) return;
    //
    //     const orderData = {
    //         billingInfo,
    //         items: cart.items,
    //         totalPrice: cart.totalPrice,
    //     };
    //     createOrderMutation(orderData);
    // };


    const handleRemove = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    // Calculate the total price
    const totalPrice = cart.totalPrice;

    return (
        <MainLayout>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                {cart.items.length === 0 ? (
                    <div >
                        <p>Your cart is empty. Please add some items to your cart.</p>
                        <button onClick={()=>router.push('/products')}
                         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                            Back to products
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Cart Summary</h2>
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity:
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                                className="w-16 ml-2"
                                            />
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Billing Information</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={billingInfo.name}
                                    onChange={handleBillingChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={billingInfo.email}
                                    onChange={handleBillingChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="address"
                                    placeholder="Address"
                                    value={billingInfo.address}
                                    onChange={handleBillingChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-lg font-semibold">Total: ${totalPrice}</p>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleClearCart}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Clear Cart
                            </button>
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded"
                                // Placeholder for payment integration
                                onClick={() => alert('Proceeding to Payment')}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
