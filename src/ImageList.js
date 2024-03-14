import React, { useState, useEffect } from 'react';
import YNButton from './YNButton';

function ImageList({ onYes, yesCount, onNo }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [loading, setLoading] = useState(true);
  var message = '';

  useEffect(() => {
    const fetchImages = async () => {
      const imageArray = [];
      for (let i = 1; i <= 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const imageData = await response.json();
        imageArray.push(imageData.sprites.other['official-artwork'].front_default);
      }
      setImages(imageArray);
      setLoading(false);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const indexes = Array.from({ length: images.length }, (_, index) => index);
      const shuffledIndexes = shuffleArray(indexes);
      setShuffledIndexes(shuffledIndexes);
    }
  }, [images]);

  const handleYesClick = () => {
    onYes();
    const updatedImages = [...images];
    updatedImages.splice(shuffledIndexes[currentIndex], 1);
    setImages(updatedImages);

    if (currentIndex + 1 === images.length) {
      const shuffledIndexes = shuffleArray(Array.from({ length: updatedImages.length }, (_, index) => index));
      setShuffledIndexes(shuffledIndexes);
    }
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, updatedImages.length - 1));
  };

  const handleNoClick = () => {
    onNo();
    const updatedImages = [...images];
    updatedImages.splice(shuffledIndexes[currentIndex], 1);
    setImages(updatedImages);
    if (currentIndex + 1 === images.length) {
      const shuffledIndexes = shuffleArray(Array.from({ length: updatedImages.length }, (_, index) => index));
      setShuffledIndexes(shuffledIndexes);
    }
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, updatedImages.length - 1));
  };

  const currentImageUrl = images[shuffledIndexes[currentIndex]] || '';

  if(images.length===0) {
    const finalCount = Math.round((yesCount/151)*1000)/10
    if(finalCount === 0) {
      message = "Oh come on. You know there's at least one. The objectively normal answer, but also a very boring one."
    } else if(finalCount > 2 && finalCount < 10) {
      message = "You folded. There was one or two that you couldn't resist. Tsk, tsk, tsk..."
    } else if(finalCount > 10 && finalCount < 25) {
      message = "There were a couple that peaked your interest. It's only natural (no it's not)."
    } else if(finalCount > 25 && finalCount < 40) {
      message = "Wow! Above 25% is impressive. You're stepping into some dangerous territory."
    } else if(finalCount > 40 && finalCount < 50) {
      message = "You're either a bit of a freak or a massive jokester. You definitely swiped right on Ditto (who can blame you...)"
    } else if(finalCount > 50 && finalCount < 75) {
      message = "Above half of them, eh? I see you."
    } else if(finalCount > 75 && finalCount < 100) {
      message = "You really like Pokémon. Like a little too much. You probably need to clear your search history. I feel uncomfortable."
    } else if(finalCount === 100) {
      message = "All of them? You're joking, right? I sure hope so. You might need to be on a list. Please stay away from my Pikachu."
    }
  }

  return (
    <div class="flex flex-row min-h-screen justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : images.length > 0 ? (
        <div>
          <img class="scale-75 hover:scale-90 transition-all duration-300 ease-in-out" src={currentImageUrl} alt={'Loading...'} />
            <div >
              <YNButton onYesClick={handleYesClick} onNoClick={handleNoClick} />
            </div>
        </div>
      ) : (
        <h class="text-center text-2xl text-gray-900">You would smash {Math.round((yesCount/151)*1000)/10}% of the Gen 1 Pokedex.
          <p class="font-bold">{message}</p>
        </h>
          
      )}
    </div>
  );
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default ImageList;
