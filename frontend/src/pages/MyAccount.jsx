import React, { useState, useEffect, useContext } from "react";
import "./MyAccount.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import profile from "../assets/defaultprofile.webp";
import Book from "../components/Book";

export default function MyAccount() {
    const { user, setUser } = useContext(UserContext);
    console.log(user);

    const navigate = useNavigate();
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            fetch("http://localhost:8080/users/1")
                .then((res) => res.json())
                .then(setUser)
                .catch(console.error);
        }
    }, [user, setUser]);

    useEffect(() => {
        if (user?.token) {
            const fetchOrders = async () => {
                try {
                    const res = await fetch(
                        "http://localhost:8080/orders/true",
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        }
                    );

                    if (!res.ok) {
                        const err = await res.json();
                        console.error(
                            "Error fetching orders:",
                            err.error || res.statusText
                        );
                        setOrders([]);
                    } else {
                        const data = await res.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setOrdersLoading(false);
                }
            };
            fetchOrders();
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signinsignup");
    };

    if (!user) return <p className="loading">Loading account...</p>;

    return (
        <div className="account-page">
            <h1 className="account-title">ACCOUNT</h1>
            <div className="account-content">
                <div className="avatar-section">
                    <img
                        src={profile}
                        alt="Profile"
                        className="profile-pic"
                        style={{
                            opacity: avatarLoaded ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                        }}
                        onLoad={() => setAvatarLoaded(true)}
                    />
                </div>

                <div className="account-info under-photo">
                    <div className="name-info">
                        <div>
                            <span className="info-label">Name:</span>
                        </div>
                        <div>
                            <span className="info-value">
                                {user.firstName + " " + user.lastName}
                            </span>
                        </div>
                    </div>

                    <div className="name-info">
                        <div>
                            <span className="info-label">Email Address:</span>
                        </div>
                        <div>
                            <span className="info-value">{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="logout-section">
                <Button
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{
                        color: "rgb(234 88 12)",
                        border: "1px solid rgb(234 88 12)",
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 500,
                        height: "32px",
                        padding: "0 12px",
                        marginTop: "30px",
                    }}
                >
                    Log Out
                </Button>
            </div>
            <div className="order-history-section">
                <h2>Recent Purchases</h2>

                {ordersLoading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div className="order-history-row">
                        {orders.slice(-3).map((order) => (
                            <Book
                                key={order.id}
                                id={order.book.id}
                                title={order.book.title}
                                author={order.book.author}
                                cover={order.book.coverUrl}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
