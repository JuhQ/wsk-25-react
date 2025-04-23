import {Link, Outlet} from 'react-router';

const Layout = () => {
  return (
    <div>
      <header>
        <h1 className="text-4xl mb-4">My App</h1>
        <nav>
          <ul className="flex justify-end list-none p-2 mb-2 bg-[#333] **:p-4 **:hover:bg-[#111]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
