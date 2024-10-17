import React from 'react';
import './Gallery.css';
import interior from '../assets/interior.jpg';
import beer from '../assets/beer.jpg';
import food from '../assets/food.jpg';
import happyhours from '../assets/happyhours.jpg';
import live from '../assets/live.jpg';
import outdoor from '../assets/outdoor.jpg';
const Gallery = () => {
  const galleryItems = [
    {
      imgSrc: interior,
      title: 'Cozy Interior',
      description: 'Experience a warm and inviting atmosphere with our cozy seating.'
    },
    {
      imgSrc: food,
      title: 'Delicious Dishes',
      description: 'Savor our chef’s special dishes, made from fresh ingredients.'
    },
    {
      imgSrc: beer,
      title: 'Craft Beers',
      description: 'Enjoy a selection of local craft beers on tap.'
    },
    {
      imgSrc: live,
      title: 'Live Events',
      description: 'Join us for live music and entertainment every weekend.'
    },
    {
      imgSrc: outdoor,
      title: 'Outdoor Seating',
      description: 'Relax in our outdoor patio with great views.'
    },
    {
      imgSrc: happyhours,
      title: 'Happy Hour',
      description: 'Don’t miss our happy hour specials every weekday.'
    },
  ];

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="gallery-container">
        {galleryItems.map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={item.imgSrc} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
