"use client";

import React from 'react';
import ScrollVideo from './scroll-video';
import ImageCarousel from '@/components/image-carousel';
import data from '@/lib/data.json';
import TextOverImage from '@/components/text-over-image';

const Home = ({}) => {

	return (
		<div className="bg-white text-gray-900">
			<ScrollVideo />

			{
				data.homeProducts && data.homeProducts.map((product) => 
					<TextOverImage 
						key={ product.id }
						image={ product.image }
						alt={ product.alt }
						title={ product.title } 
						text={ product.text } 
						urlText={ product.urlText }
						className={ product.id === 4 ? "h-[90vh] transition-[width] duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)] bg-white overflow-hidden mx-auto my-[50px]" : "relative w-full h-[90vh]" }
						setWide={ product.id === 4 ? true : false }
					/>
			)}

			{/* Collection Section */}
			<section id="collection" className="max-w-7xl mx-auto px-6 py-20">
				<h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
					Exclusively on Dior.com
				</h2>
				
				<ImageCarousel data={data.carousel_data} />
			</section>
		</div>
	);
}

export default Home