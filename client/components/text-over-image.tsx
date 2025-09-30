import Image from "next/image"
import { UnderlineNavLink } from "./nav-link"
import { useEffect, useRef, useState } from "react";

interface dataProps {
  image: string;
  alt: string;
  title: string;
  text: string;
  urlText: string;
  className?: string;
  bottomRem?: string;
  setWide?: boolean;
}

const TextOverImage: React.FC<dataProps> = ({
  image, alt, title, text, urlText, className = "w-full h-[90vh]", bottomRem = 'bottom-[5rem]', setWide = false
}) => {

  const divRef = useRef<HTMLDivElement | null>(null);

  const [isWide, setIsWide] = useState(setWide);

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const containerRect = divRef.current.getBoundingClientRect();
        
        const isActive = containerRect.top >= 150 ? false : true;
        
        if (isActive !== isWide) {
          setIsWide(isActive);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isWide]);

  return (
    <section className={`relative ${ className } ${isWide ? 'w-full' : 'w-[85%]'}`} ref={ divRef }>
      <Image
        src={ image }
        alt={ alt }
        fill
        className="object-cover"
        priority
      />
      <div className="bg-black/20 flex flex-col items-center text-center text-white">
        <div className={`absolute ${bottomRem}`}>
          <h1 className="text-xs font-serif tracking-wide mb-4 font-medium leading-[1.2]">
            { title }
          </h1>
          <p 
            className="text-[2rem] mb-4 max-w-xl font-[352] leading-[1.3] tracking-[-.64px]"
            dangerouslySetInnerHTML={{ 
              __html: text.replace(/\n/g, '<br />') 
            }}
          />
          <UnderlineNavLink href="#" className='py-2 text-[0.875rem] text-white font-medium leading-[1.2] after:bg-white'> 
            { urlText } 
          </UnderlineNavLink>
        </div>
      </div>
    </section>
  )
}

export default TextOverImage;