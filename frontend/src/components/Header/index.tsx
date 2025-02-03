'use client';
import { getCookie, logout } from '@/api/auth';
import { APP_NAME } from '@/config';
import { ROLE } from '@/constant';
import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();
  const { user, setUser } = useAuth();


  const handleLogout = () => {
    setUser(null);
    return logout(() => router.replace('/login'))
  }


  useEffect(() => {
    const cookie = getCookie('x_access_token');
    if(!cookie){
      setUser(null);
    }
  },[])

  return (
    <div>
      <Navbar color='light' light expand="lg">
        <Link href={'/'} className='navbar-brand' >{APP_NAME}</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
                <Link href="/blogs" className="nav-link">Blogs</Link>
            </NavItem>
            {user ?
                <>
                <NavItem>
                     <Link href={user.role === ROLE.Admin ? '/admin' : "/user"} className="nav-link">{`${user.name}'s Dashboard`}</Link>
                </NavItem>
                <NavItem onClick={handleLogout} style={{cursor: 'pointer'}} className="nav-link">Logout</NavItem>
                </>
                :
                <>
                  <NavItem>
                      <Link href="/login" className="nav-link">Login</Link>
                  </NavItem>
                  <NavItem>
                      <Link href="/register" className="nav-link">Signup</Link>
                  </NavItem>
                </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header

