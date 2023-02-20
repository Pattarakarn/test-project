import logo from './logo.svg';
import './App.css';
import Tabsidebar from './component/sidebar';
import ConfirmPage from './pages/confirmItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  return (
    <div className="sidebar">
      <div className='d-lg-none'>
        <Tabsidebar collapse={true} />
      </div>
      <div className='d-lg-block d-none'>
        <Tabsidebar />
      </div>


      <div className='App'>
        <Header />

        <ConfirmPage />
      </div>
    </div >
  );
}

function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div className='hstack header bg-light '>
        <div className='btn-outline-success btn ms-0 d-md-none'
          onClick={() => setShowMenu(!showMenu)}>
          Menu
        </div>
        <div className='col' align="right">
          Username
        </div>
      </div>
      <div className="sidebar d-md-none mobile"
        hidden={!showMenu}
      >
        <Tabsidebar mode="mobile" />
      </div>
    </>
  )
}

export default App;
