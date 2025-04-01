'use client';
import { ProductProvider } from './ProductContext';
import { CartProvider } from './CartContext';
import { OrderProvider } from './OrderContext';
import { createContext } from 'react';
const ProviderContext = createContext();

export const Provider = ({ children }) => {
    return(
        <OrderProvider>
       <ProductProvider>
        <CartProvider>
                <ProviderContext.Provider>
                    {children}
                </ProviderContext.Provider>
        </CartProvider>
       </ProductProvider>    
       </OrderProvider>
    )
};


