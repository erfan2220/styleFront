// pages/product/[id].tsx

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slices/cartSlice';
import { getProductById } from '@/services/productServices';


const ProductDetail = () =>
{

    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL

    const {data:product,isLoading,error}=useQuery(
        ['product',id],
        ()=>getProductById(id as string),
        {enabled: !!id}
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;

    const dispatch = useDispatch();

    // Find the product from the list
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;


    const handleAddToCart = () => {
       if(product){
           dispatch(addItem({...product,quantity:1}))
       }
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
