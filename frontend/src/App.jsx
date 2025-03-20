import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Overview from "./pages/Overview";
import CustomerInsights from "./pages/CustomerInsights";
import StorePerformance from "./pages/StorePerformance";
import ShoppingBehaviour from "./pages/ShoppingBehaviour";
import Marketing from "./pages/Marketing";
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage isSignup={false} />} />
        <Route path="/signup" element={<AuthPage isSignup={true} />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="analytics/overview" element={<Overview />} />
          <Route
            path="analytics/customer-insights"
            element={<CustomerInsights />}
          />
          <Route
            path="analytics/store-performance"
            element={<StorePerformance />}
          />
          <Route
            path="analytics/shopping-behaviour"
            element={<ShoppingBehaviour />}
          />
          <Route path="analytics/marketing" element={<Marketing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
