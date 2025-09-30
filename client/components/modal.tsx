"use client";

import { getAllProducts } from "@/graphql/queries";
import { useEffect, useRef, useState } from "react";
import TextOverImage from "./text-over-image";
import { useAuth } from "@/context/auth-context";

interface dataProps {
  setIsOpen: (value: boolean) => void;
}

const ModalComponent: React.FC<dataProps> = ({ setIsOpen }) => {
  
  const { apolloClientData } = useAuth();

  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    // lock background scroll
    document.body.style.overflow = "hidden";
    return () => {
      // restore when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await getAllProducts(apolloClientData);
      setProducts(productList);
    } catch (error) {
      // Handle error state
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, [apolloClientData]);

  return (
    <div className="flex flex-col items-center bg-gray bg-opacity-90 h-[100vh]" onClick={() => setIsOpen(false)}>
      <div
        className="flex justify-between items-center bg-white backdrop-blur-md text-black border-b border-white border-opacity-10 w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content container */}
        <div
          className="p-8 m-4 w-full transform transition-all duration-300 scale-95 animate-scale-up">
          {/* Modal header with close button */}
          <span>Exclusive Content</span>
          
          {/* Modal body content */}
          <div className="flex lg:flex-row flex-col py-4 text-gray-700">
            { products &&
              products.map((product: any) =>
                <TextOverImage 
                  key={ product.id }
                  image={ product.image_url } 
                  alt={ product.name }  
                  title="" 
                  text="" 
                  urlText={product.name} 
                  className = "lg:w-1/3 h-[200px]"
                  bottomRem="bottom-[1.5rem]"
                />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalComponent;