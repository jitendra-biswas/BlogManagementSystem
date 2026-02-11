import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import JoinUs from "./components/JoinUs";
import BlogEditor from "./pages/BlogEditor";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardBlogs from "./pages/DashboardBlogs";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import BlogPage from "./pages/BlogPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from './components/Navbar'


const App = () => {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/blogs/:id" element={<BlogPage />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="blogEditor" element={<BlogEditor />} />
          <Route path="dashboardblogs" element={<DashboardBlogs />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
