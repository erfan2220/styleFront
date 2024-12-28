// components/CartIcon.tsx

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CartIcon = () => {
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    return (
        <div className="relative">
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 10H4L3 3z" />
            </svg>
        </div>
    );
};

export default CartIcon;
