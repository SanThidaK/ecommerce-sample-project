"use client";

import type { ProductResponseData } from '@/graphql/queries';
import { fetchProductByID, getAllProducts } from '@/graphql/queries';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import Image from 'next/image';

type PageProps = {
  isLoggedIn?: boolean;
};

const Products: React.FC<PageProps> = ({ isLoggedIn }) => {

  const [products, setProducts] = React.useState<any[]>([]);
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { apolloClientData, user } = useAuth();

  const getProduct = async(id: number) => {
    const data: ProductResponseData = await fetchProductByID(apolloClientData, id);
    setProduct(data?.data);
  }

  const fetchProducts = async () => {
    try {
      const productList: ProductResponseData = await getAllProducts(apolloClientData);
      console.log('list', productList)
      setLoading(false);
      setProducts(productList);

      // const data = await getAllProducts(apolloClientData).then(products => {
      //   setProducts(products);
      // }).catch(err => console.error('Error fetching products:', err));

    } catch (error) {
      // Handle error state
      console.log('Products page:', error)
    }
  }
    
  useEffect(() => {    

    getProduct(1);
    
    fetchProducts();
  }, [apolloClientData]);

  return (
    <div className="bg-white text-gray-900">

      {/* Collection Section */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-serif text-center my-12">
          Exclusively on Dior.com
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          { loading ?
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-200 md:col-span-2">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
              <p className="mt-4 text-lg text-[#88838c]">Loading Products...</p>
            </div>
            :
            products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative w-full h-96 overflow-hidden rounded">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">$ {product.price}</p>
                <button className="mt-4 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Products