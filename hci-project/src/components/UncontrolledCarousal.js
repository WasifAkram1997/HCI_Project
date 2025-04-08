// import React, { useState } from "react";
// import { Container } from "reactstrap";
// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.css'; // Correct way to import Swiper styles

// const MyCarousel = () => {
//   const items = [
//     {
//       altText: 'Slide 1',
//       caption: 'Slide 1',
//       key: 1,
//       src: '/images/image1.jpg',  // Image 1 from public/images
//     },
//     {
//       altText: 'Slide 2',
//       caption: 'Slide 2',
//       key: 2,
//       src: '/images/image2.avif',  // Image 2 from public/images
//     },
//     {
//       altText: 'Slide 3',
//       caption: 'Slide 3',
//       key: 3,
//       src: '/images/image3.jpg',  // Image 3 from public/images
//     },
//     {
//       altText: 'Slide 4',
//       caption: 'Slide 4',
//       key: 4,
//       src: '/images/image3.jpg',  // Image 3 from public/images
//     },
//     {
//       altText: 'Slide 5',
//       caption: 'Slide 5',
//       key: 5,
//       src: '/images/image3.jpg',  // Image 3 from public/images
//     }
//   ];

//   return (
//     <Container>
//       <Swiper
//         spaceBetween={50}
//         slidesPerView={1}
//         loop
//         navigation={true} // Enables navigation controls for next and prev
//         // You can customize the prev/next button as needed
//       >
//         {items.map((item) => (
//           <SwiperSlide key={item.key}>
//             <img src={item.src} alt={item.altText} className="d-block w-100" />
//             <div className="carousel-caption d-none d-md-block">
//               <h5>{item.caption}</h5>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Container>
//   );
// };

// export default MyCarousel;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import { Container } from 'reactstrap';
import '../MyCarousel.css'; // Assuming you are adding custom styles

const Mycarousel = () => {
  const items = [
    {
      altText: 'Slide 1',
      caption: 'Work with an expert',
      key: 1,
      src: '/images/image1.jpg',  // Image 1 from public/images
    },
    {
      altText: 'Slide 2',
      caption: 'Join with friends',
      key: 2,
      src: '/images/image2.avif',  // Image 2 from public/images
    },
    {
      altText: 'Slide 3',
      caption: 'Keep moving',
      key: 3,
      src: '/images/image3.jpg',  // Image 3 from public/images
    },
    {
      altText: 'Slide 4',
      caption: 'Activate this summer',
      key: 4,
      src: '/images/image4.jpeg',  // Image 4 from public/images
    },
    {
      altText: 'Slide 5',
      caption: 'Variety of equipments',
      key: 5,
      src: '/images/image5.jpg',  // Image 5 from public/images
    }
  ];

  return (
    <Container className='my-4'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }} // Enable autoplay, 1000ms (1 second) per slide
        loop={true} // Enable looping
        modules={[Autoplay]}
      >
        {items.map((item) => (
          <SwiperSlide key={item.key}>
            <img src={item.src} alt={item.altText} className="uniform-height" />
            <div className="carousel-caption text-center">
              <h1 className='display-1 opacity-75'>{item.caption}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Mycarousel;
