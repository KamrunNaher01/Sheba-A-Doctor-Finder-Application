import logo from './logo.svg';
import './App.css'
import Navbar from './Pages/Shared/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import Payment from './Pages/Dashboard/Payment';
import AllDoctors from './Pages/Doctors/AllDoctors';
import Reviews from './Pages/Review/Reviews';
import Contact from './Pages/Contact/Contact';


function App() {
  return (
    <div className="max-w-7xl mx-auto px-12s">
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allDoctors" element={<AllDoctors />} />
        <Route path="/appointment" element={<RequireAuth><Appointment /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<MyAppointments></MyAppointments>}/>
          <Route path="review" element={<MyReview></MyReview>}/>
          {/* <Route path="history" element={<MyHistory></MyHistory>}/> */}
          <Route path="payment/:id" element={<Payment></Payment>}/>
          <Route path="users" element={<RequireAdmin><Users></Users></RequireAdmin>}/>
          <Route path="addDoctor" element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}/>
          <Route path="manageDoctor" element={<RequireAdmin><ManageDoctors></ManageDoctors></RequireAdmin>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
