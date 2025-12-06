import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMyOrders } from '../../features/orders/orderSlice';
import { FiPackage, FiGift, FiUser, FiLogOut, FiCheckCircle, FiClock, FiTruck } from 'react-icons/fi';
import { logout, reset } from '../../features/auth/authSlice';
import { COUPONS } from '../../constants/coupons';
import './AccountPage.css';
import Loader from '../../components/animation/Loader';

export default function AccountPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { orders, isLoading, isError, message } = useSelector((state) => state.orders);

    // Initialize tab from navigation state if available, default to 'orders'
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'orders');

    // Update tab if location state changes (e.g. clicking link while already on page)
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(getMyOrders());
        }
    }, [user, navigate, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    if (isLoading) return <Loader />;

    return (
        <div className="account-page">
            <div className="account-container">

                {/* Header Section */}
                <div className="account-header">
                    <div className="account-info">
                        <h1 className="account-greeting">Hello, {user?.name?.split(' ')[0]}</h1>
                        <p className="account-email">{user?.email}</p>
                    </div>
                    <button className="account-logout-btn" onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="account-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <FiPackage /> Orders
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'coupons' ? 'active' : ''}`}
                        onClick={() => setActiveTab('coupons')}
                    >
                        <FiGift /> Coupons
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FiUser /> Profile
                    </button>
                </div>

                {/* Content Area */}
                <div className="account-content">

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="orders-section">
                            {orders.length > 0 ? (
                                <div className="orders-grid">
                                    {orders.map((order) => {
                                        const isDelivered = order.isDelivered;
                                        return (
                                            <div key={order._id} className="order-card">
                                                <div className="order-header">
                                                    <span className="order-id">Order #{order._id.substring(0, 8)}</span>
                                                    <div className="order-price-badge">${order.totalPrice.toFixed(2)}</div>
                                                </div>

                                                {/* Timeline */}
                                                <div className="order-timeline">
                                                    <div className={`timeline-step active`}>
                                                        <div className="step-point"><FiClock /></div>
                                                        <span className="step-label">Placed</span>
                                                        <span className="step-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className={`timeline-line active`}></div>

                                                    <div className={`timeline-step active`}>
                                                        <div className="step-point"><FiPackage /></div>
                                                        <span className="step-label">Processing</span>
                                                    </div>
                                                    <div className={`timeline-line ${isDelivered ? 'active' : ''}`}></div>

                                                    <div className={`timeline-step ${isDelivered ? 'active' : ''}`}>
                                                        <div className="step-point"><FiTruck /></div>
                                                        <span className="step-label">Shipped</span>
                                                    </div>
                                                    <div className={`timeline-line ${isDelivered ? 'active' : ''}`}></div>

                                                    <div className={`timeline-step ${isDelivered ? 'active' : ''}`}>
                                                        <div className="step-point"><FiCheckCircle /></div>
                                                        <span className="step-label">Delivered</span>
                                                    </div>
                                                </div>

                                                <div className="order-body">
                                                    <div className="order-items-preview">
                                                        <strong>Items:</strong> {order.orderItems.map((item, idx) => (
                                                            <span key={idx}>{item.name} (x{item.quantity}){idx < order.orderItems.length - 1 ? ', ' : ''}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <FiPackage size={48} />
                                    <h3>No orders yet</h3>
                                    <p>Start shopping to see your orders here.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* COUPONS TAB */}
                    {activeTab === 'coupons' && (
                        <div className="coupons-section">
                            {COUPONS.map((coupon, index) => (
                                <div key={index} className={`coupon-card ${coupon.expiry === "Expired" ? "expired" : ""}`}>
                                    <div className="coupon-left">
                                        <span className="coupon-amount">
                                            {coupon.discountType === 'percent' ? `${(coupon.value * 100)}%` : 'FREE'}
                                        </span>
                                        <span className="coupon-desc">{coupon.label}</span>
                                    </div>
                                    <div className="coupon-right">
                                        <span className="coupon-code">{coupon.code}</span>
                                        <p className="coupon-description">{coupon.description}</p>
                                        {coupon.expiry !== "Expired" && coupon.expiry !== "Coming Soon" ? (
                                            <button className="copy-btn" onClick={() => navigator.clipboard.writeText(coupon.code)}>Copy Code</button>
                                        ) : (
                                            <span className="expired-label">{coupon.expiry}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="profile-section">
                            {/* Premium Subscription Card */}
                            <div className="subscription-card gold-member">
                                <div className="sub-header">
                                    <h3>Sparks Member</h3>
                                    <span className="status-badge">ACTIVE</span>
                                </div>
                                <div className="sub-body">
                                    <p>Member since 2024</p>
                                    <p>You have access to exclusive drops and free shipping on select items.</p>
                                </div>
                                <div className="sub-footer">
                                    <button className="secondary-btn manage-btn">Manage Subscription</button>
                                </div>
                            </div>

                            {/* Shipping Address (Placeholder) */}
                            <div className="profile-detail-card">
                                <h3>Default Address</h3>
                                <p>{user?.email}</p>
                                <p>123 Sneaker Street, Fashion City, NY 10001</p>
                                <button className="text-btn">Edit Details</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
