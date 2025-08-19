import React from 'react';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const newOrderId = Date.now();
      setOrderId(newOrderId);
      setIsOrderComplete(true);
      
      const existingOrders = JSON.parse(localStorage.getItem('react-sneakers-orders') || '[]');
      const newOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        items: cartItems,
        total: totalPrice
      };
      
      localStorage.setItem('react-sneakers-orders', JSON.stringify([...existingOrders, newOrder]));
      setCartItems([]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-100 ${
        opened ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}>
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 transition-transform duration-300 transform ${
          opened ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}>
        <h2 className="flex justify-between items-center text-2xl font-bold mb-8">
          Корзина
          <img
            onClick={onClose}
            className="cursor-pointer"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto mb-10">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="flex items-center border border-gray-100 rounded-2xl p-5 mb-5">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="w-16 h-16 bg-contain bg-center bg-no-repeat mr-5"></div>

                  <div className="flex-1 mr-5">
                    <p className="text-base mb-1">{obj.title}</p>
                    <b className="text-sm">{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="opacity-50 cursor-pointer hover:opacity-100 transition-opacity duration-150"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="mb-10">
              <ul className="space-y-5 mb-10">
                <li className="flex items-end">
                  <span className="flex-1">Итого:</span>
                  <div className="flex-1 border-b border-dashed border-gray-300 mb-1 mx-2"></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="flex items-end">
                  <span className="flex-1">Налог 5%:</span>
                  <div className="flex-1 border-b border-dashed border-gray-300 mb-1 mx-2"></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="w-full h-14 bg-green-500 rounded-xl text-white font-medium text-base cursor-pointer disabled:bg-gray-400 disabled:cursor-default hover:bg-green-600 transition-colors duration-100 relative">
                Оформить заказ
                <img
                  src="img/arrow.svg"
                  alt="Arrow"
                  className="absolute right-8 top-1/2 transform -translate-y-1/2"
                />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;