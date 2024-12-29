// pages/product/[id].tsx

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import { getProductById } from '@/services/productServices';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const ProductDetail = () =>
{

    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query; // Get the product ID from the URL

    const {data:product,isLoading,error}=useQuery<Product>(
        ['product',id],
        ()=>getProductById(id as string),
        { enabled: !!id }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product details. Please try again.</div>;
    if (!product) return <div>Product not found.</div>;


    // Find the product from the list
    if (isLoading) return <div>Loading...</div>;
    if (error || !product) return <div>Error loading product</div>;


    const handleAddToCart = () =>
    {

        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1, // Default quantity
        };


        dispatch(addItem(cartItem));

        // dispatch(addItem({ ...product, quantity: 1 })); // Default quantity: 1
    };


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetail;
