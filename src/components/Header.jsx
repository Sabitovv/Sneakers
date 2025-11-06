import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();
  
  const publicUrl = import.meta.env.BASE_URL || ''; 

  return (
    <header className="flex justify-between items-center p-10 border-b border-gray-200">
      <Link to="/">
        <div className="flex items-center">
          <img width={40} height={40} src={`${publicUrl}img/logo.png`} alt="Logotype" />
          <div className="ml-4">
            <h3 className="text-lg font-bold uppercase">Sneakers</h3>
            <p className="text-gray-500 text-sm">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="flex items-center space-x-8">
        <li onClick={props.onClickCart} className="flex items-center cursor-pointer">
          <img width={18} height={18} src={`${publicUrl}img/cart.svg`} alt="Корзина" />
          <span className="ml-2 font-medium">{totalPrice} руб.</span>
        </li>
        <li className="cursor-pointer">
          <Link to="/favorites">
            <img width={18} height={18} src={`${publicUrl}img/heart.svg`} alt="Закладки" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src={`${publicUrl}img/user.svg`} alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;