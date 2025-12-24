import { ShoppingBasket } from 'lucide-react';
import React from 'react';
import { typography } from '../style/typoghraphy';

const Products = () => {

    const products = [
        { productImg: "01", title: "Women Wear", price: "", },

    ]

    return (
        <div>
            <h1>Our Apparels</h1>

            <div className='grid grid-cols-4 gap-6'>

                {/* card */}
                <div className='w-72 h-103.75 bg-secondary'>
                    <img src="" alt="" />
                    <h3></h3>
                    <p></p>

                    {/* buttons */}
                    <div className='flex justify-between items-center gap-2'>
                        <button className={`${typography.button4} flex justify-between items-center gap-2`}>
                            <ShoppingBasket />
                            Add to Cart
                        </button>
                        <button className={`${typography.button5}`}>Buy Now</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Products;