import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedOrders = localStorage.getItem('react-sneakers-orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      const allOrderItems = parsedOrders.reduce((acc, order) => {
        return [...acc, ...order.items.map(item => ({
          ...item,
          orderDate: order.date,
          orderId: order.id
        }))];
      }, []);
      setOrders(allOrderItems);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Мои заказы</h1>
      </div>

      <div className="flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card 
            key={index} 
            loading={isLoading} 
            {...item} 
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;