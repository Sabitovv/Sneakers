import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center text-center p-5 flex-1">
      <img className="mb-5 w-28" src={image} alt="Empty" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-5 max-w-xs">{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        className="w-56 h-14 bg-green-500 rounded-xl text-white font-medium text-base cursor-pointer hover:bg-green-600 transition-colors duration-100 flex items-center justify-center">
        <img src="img/arrow.svg" alt="Arrow" className="mr-3" />
        Вернуться назад
      </button>
    </div>
  );  
};

export default Info;