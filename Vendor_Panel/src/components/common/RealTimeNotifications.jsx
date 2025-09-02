import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify-icon/react';
import { AuthContext } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';

const RealTimeNotifications = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user && userProfile?.vendor_id) {
      setupRealTimeSubscriptions();
      fetchRecentNotifications();
    }

    return () => {
      // Cleanup subscriptions
      supabase.removeAllChannels();
    };
  }, [user, userProfile]);

  const setupRealTimeSubscriptions = () => {
    const vendorId = userProfile.vendor_id;

    // Subscribe to new orders
    const ordersChannel = supabase
      .channel('vendor-orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `vendor_id=eq.${vendorId}`
        },
        (payload) => {
          addNotification({
            type: 'new_order',
            title: 'New Order Received',
            message: `Order #${payload.new.order_number} has been placed`,
            timestamp: new Date().toISOString(),
            data: payload.new
          });
        }
      )
      .subscribe();

    // Subscribe to order status updates
    const orderUpdatesChannel = supabase
      .channel('vendor-order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `vendor_id=eq.${vendorId}`
        },
        (payload) => {
          if (payload.old.status !== payload.new.status) {
            addNotification({
              type: 'order_update',
              title: 'Order Status Updated',
              message: `Order #${payload.new.order_number} is now ${payload.new.status}`,
              timestamp: new Date().toISOString(),
              data: payload.new
            });
          }
        }
      )
      .subscribe();

    // Subscribe to new customers
    const customersChannel = supabase
      .channel('vendor-customers')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customers',
          filter: `vendor_id=eq.${vendorId}`
        },
        (payload) => {
          addNotification({
            type: 'new_customer',
            title: 'New Customer',
            message: `${payload.new.first_name} ${payload.new.last_name} joined your store`,
            timestamp: new Date().toISOString(),
            data: payload.new
          });
        }
      )
      .subscribe();
  };

  const fetchRecentNotifications = async () => {
    // In a real implementation, you'd fetch from a notifications table
    // For now, we'll just initialize with empty array
    setNotifications([]);
    setUnreadCount(0);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
    setUnreadCount(prev => prev + 1);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_order':
        return 'mdi:shopping';
      case 'order_update':
        return 'mdi:update';
      case 'new_customer':
        return 'mdi:account-plus';
      default:
        return 'mdi:bell';
    }
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <Icon icon="mdi:bell" className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#C53958] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Icon icon="mdi:bell-off" className="text-3xl mb-2" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <Icon
                      icon={getNotificationIcon(notification.type)}
                      className="text-[#C53958] text-xl mr-3 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default RealTimeNotifications;
