import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Subscription from "./components/Subscription";

function App() {
    return (
        <div className="w-screen h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/subscription" element={<Subscription />} />
            </Routes>
        </div>
    );
}

export default App;
