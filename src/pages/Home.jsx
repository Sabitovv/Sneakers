import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  
  const publicUrl = import.meta.env.BASE_URL || '';

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
        </h1>
        <div className="flex items-center border border-gray-100 rounded-xl px-4 py-2 relative">
          <img src={`${publicUrl}img/search.svg`} alt="Search" className="mr-2" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              src={`${publicUrl}img/btn-remove.svg`}
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
            className="border-0 px-3 py-2 text-base w-48 outline-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;