import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import MyOrders from "./screens/MyOrders";
import Admin from "./screens/Admin";
import CartProvider from "./components/ContentReducer";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import TrackOrder from "./screens/TrackOrder";
import AdminMessages from "./screens/AdminMessages";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <RestrictedRoute role="admin">
                <Cart />
              </RestrictedRoute>
            }
          />
          <Route
            exact
            path="/myorders"
            element={
              <RestrictedRoute role="admin">
                <MyOrders />
              </RestrictedRoute>
            }
          />
          <Route
            path="/track/:id"
            element={
              <RestrictedRoute role="admin">
                <TrackOrder />
              </RestrictedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <PrivateRoute role="admin">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin/messages"
            element={
              <PrivateRoute role="admin">
                <AdminMessages/>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
