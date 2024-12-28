//@ts-nocheck
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "@/services/productServices";



// ProductList.tsx (updated to show images)
export default function ProductList()
{

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'], // Unique query key for caching
        queryFn: getProducts, // Fetching function
    });
    const dispatch = useDispatch();

    const handleAddToCart = (product: typeof products[0]) => {
        dispatch(addItem({ ...product, quantity: 1 }));
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <MainLayout>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border rounded p-4 shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                            <p className="mt-2 text-lg font-semibold">${product.price}</p>
                            <button
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline ml-4">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
