import { Link } from 'react-router'

function Navbar({ user, setUser }) {

  function logOut() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav>

      {/* routes everyone can see */}
      <Link className='nav-item' to='/'>
        Homepage
      </Link>

      {user ? (
        <>
          {/* protected routes */}
          <Link className='nav-item' to='/dashboard'>
            Dashboard
          </Link>

          <Link className='nav-item' to='/accounts'>
            Accounts
          </Link>

          <Link className='nav-item' to='/transactions'>
            Transactions
          </Link>

          {/* username */}
          <span className='nav-item'>
            {user.username}
          </span>

          {/* logout */}
          <button className='nav-item' onClick={logOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          {/* routes for guests */}
          <Link className='nav-item' to='/sign-up'>
            Sign Up
          </Link>

          <Link className='nav-item' to='/sign-in'>
            Sign In
          </Link>
        </>
      )}

    </nav>
  )
}

export default Navbar