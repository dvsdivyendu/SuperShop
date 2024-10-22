import React from 'react';
import './Gallery.css';
import interior from '../assets/interior.jpg';
import beer from '../assets/beer.jpg';
import food from '../assets/food.jpg';
import happyhours from '../assets/happyhours.jpg';
import live from '../assets/live.jpg';
import outdoor from '../assets/outdoor.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const galleryItems = [
    {
      imgSrc: interior,
      title: 'Cozy Interior',
      description: 'Experience a warm and inviting atmosphere.'
    },
    {
      imgSrc: food,
      title: 'Delicious Dishes',
      description: 'Savor dishes made from fresh ingredients.'
    },
    {
      imgSrc: beer,
      title: 'Craft Beers',
      description: 'Enjoy a selection of local craft beers on tap.'
    },
    {
      imgSrc: live,
      title: 'Live Events',
      description: 'Join us for live music and entertainment.'
    },
    {
      imgSrc: outdoor,
      title: 'Outdoor Seating',
      description: 'Relax in our outdoor patio with great views.'
    },
    {
      imgSrc: happyhours,
      title: 'Happy Hour',
      description: 'Don’t miss our happy hour specials.'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay speed
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="gallery-slider">
        <Slider {...settings}>
          {galleryItems.map((item, index) => (
            <div className="gallery-item" key={index}>
              <img src={item.imgSrc} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
