import React, { useState, useEffect, useContext } from "react";
import "./MyAccount.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function MyAccount() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");

    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [ordersDetails, setOrdersDetails] = useState([]);

    useEffect(() => {
        if (!user) {
            fetch("http://localhost:4000/users/1")
                .then((res) => res.json())
                .then(setUser)
                .catch(console.error);
        }
    }, [user, setUser]);

    const fetchBookByISBN = async (isbn) => {
        const res = await fetch(`https://openlibrary.org/search.json?isbn=${isbn}`);
        const data = await res.json();
        const doc = data.docs[0] || {};
        return {
            key: doc.key || isbn,
            title: doc.title || "Unknown Title",
            coverId: doc.cover_i,
        };
    };

    useEffect(() => {
        if (!user?.wishlist?.length) return;
        Promise.all(user.wishlist.map((isbn) => fetchBookByISBN(isbn)))
            .then(setWishlistBooks)
            .catch(console.error);
    }, [user]);

    useEffect(() => {
        if (!user?.orders?.length) return;
        Promise.all(
            user.orders.map(async (order) => {
                const books = await Promise.all(
                    order.books.map((isbn) => fetchBookByISBN(isbn))
                );
                return { date: order.date, books };
            })
        )
            .then(setOrdersDetails)
            .catch(console.error);
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(URL.createObjectURL(file));
    };
    const handleResetAvatar = () => setAvatar(null);

    const openModal = () => {
        setCurrentPwd("");
        setNewPwd("");
        setConfirmPwd("");
        setPwdMessage("");
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPwd !== confirmPwd) {
            setPwdMessage("❌ New passwords do not match.");
            return;
        }
        if (currentPwd !== user?.password) {
            setPwdMessage("❌ Current password is incorrect.");
            return;
        }
        setUser({ ...user, password: newPwd });
        setPwdMessage("✅ Password changed successfully!");
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/signinsignup");
    };

    if (!user) return <p className="loading">Loading account...</p>;

    return (
        <div className="account-page">
            <h1 className="account-title">ACCOUNT</h1>
            <div className="account-content">
                <aside className="account-left">
                    <div className="avatar-section">
                        <img
                            src={avatar || "/default-avatar.png"}
                            alt="Profile"
                            className="profile-pic"
                        />
                        <div className="avatar-controls">
                            <label className="edit-pic-button">
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                            {avatar && (
                                <button
                                    className="reset-pic-button"
                                    onClick={handleResetAvatar}
                                >
                                    Reset to Default
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="account-info under-photo">
                        <p>
                            <span className="info-label">Account Holder Name:</span>
                            <span className="info-value">{user.name}</span>
                        </p>
                        <p>
                            <span className="info-label">Email Address:</span>
                            <span className="info-value">{user.email}</span>
                        </p>
                    </div>

                    <button className="change-password" onClick={openModal}>
                        Change Password
                    </button>
                </aside>

                <main className="account-center">
                    <section className="wishlist">
                        <h3>Wishlist</h3>
                        <div className="wishlist-items">
                            {wishlistBooks.length
                                ? wishlistBooks.map((book) => (
                                      <div key={book.key} className="book-item">
                                          {book.coverId ? (
                                              <img
                                                  src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                                  alt={book.title}
                                              />
                                          ) : (
                                              <div className="no-cover">No Cover</div>
                                          )}
                                          <p className="book-title">{book.title}</p>
                                      </div>
                                  ))
                                : user.wishlist.map((_, i) => (
                                      <div key={i} className="book-placeholder" />
                                  ))}
                        </div>
                    </section>

                    <section className="orders">
                        <h3>Past Orders</h3>
                        {ordersDetails.length
                            ? ordersDetails.map((order, idx) => (
                                  <div key={idx} className="order">
                                      <p className="order-date">{order.date}</p>
                                      <div className="order-books">
                                          {order.books.map((book) => (
                                              <div key={book.key} className="book-item-sm">
                                                  {book.coverId ? (
                                                      <img
                                                          src={`https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`}
                                                          alt={book.title}
                                                      />
                                                  ) : (
                                                      <div className="no-cover-sm" />
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))
                            : user.orders.map((order, i) => (
                                  <p key={i} className="order-placeholder">
                                      {order.date} – {order.books.length} Books
                                  </p>
                              ))}
                    </section>
                </main>
            </div>

            {/* Change Password Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Change Password</h3>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPwd}
                                onChange={(e) => setCurrentPwd(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPwd}
                                onChange={(e) => setNewPwd(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPwd}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                        {pwdMessage && <p className="modal-message">{pwdMessage}</p>}
                    </div>
                </div>
            )}

            {/* Logout Button */}
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
        </div>
    );
}
