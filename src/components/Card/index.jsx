import React from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };
  const publicUrl = import.meta.env.BASE_URL || '';
  
  const safeImageUrl = imageUrl || ''; 
  const pathWithoutLeadingSlash = safeImageUrl.startsWith('/') ? safeImageUrl.substring(1) : safeImageUrl;

  return (
    <div className="border border-gray-100 rounded-3xl p-6 w-56 mr-6 mb-6 transition-shadow duration-200 hover:shadow-lg hover:-translate-y-1">
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className="absolute cursor-pointer" onClick={onClickFavorite}>
              <img
                src={`${publicUrl}img/${isFavorite ? 'liked.svg' : 'unliked.svg'}`}
                alt="Unliked"
              />
            </div>
          )}
          <img 
            width="100%" 
            height={135} 
            src={`${publicUrl}${pathWithoutLeadingSlash}`} 
            alt="Sneakers" 
            className="mb-3" 
          />
          <h5 className="text-sm font-normal mb-2">{title}</h5>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase">Цена:</span>
              <b className="text-sm">{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className="cursor-pointer"
                onClick={onClickPlus}
                src={`${publicUrl}img/${isItemAdded(id) ? 'btn-checked.svg' : 'btn-plus.svg'}`}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;