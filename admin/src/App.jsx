import './index.css'
import Sidebar from './components/sidebar/Sidebar'
import NavBar from './components/NavBar/NavBar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Order from './pages/orders/Order'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () =>{
  const url = "http://localhost:3000"
  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <NavBar></NavBar>
        <hr />
        <div className="App-Content">
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/add" element={<Add url={url} />}></Route>
            <Route path="/List" element={<List url={url} />}></Route>
            <Route path="/Order" element={<Order url={url} />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
