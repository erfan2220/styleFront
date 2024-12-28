import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeItem, clearCart } from '@/store/slices/cartSlice';
import MainLayout from '@/layouts/MainLayout';
import Link from 'next/link';

export default function CartPage() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Calculate the total price
    const totalPrice = cart.totalPrice;

    return (
        <MainLayout>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>

                {cart.items.length === 0 ? (
                    <div>
                        <p>Your cart is empty.</p>
                        <Link href="/products" className="text-blue-600 hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        {cart.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="mt-4">
                            <p className="text-lg font-semibold">Total: ${totalPrice}</p>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <button
                                onClick={handleClearCart}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Clear Cart
                            </button>
                            <Link href="/src/pages/checkout" className="bg-green-600 text-white px-6 py-2 rounded">
                                    Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
