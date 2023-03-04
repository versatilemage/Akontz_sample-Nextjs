import React from 'react'
import Link from '@/utils/ActiveLink'
import { handleLogout } from '@/utils/auth'
import SearchForm from './SearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersData } from 'store/actions'

const AdminNavbar = ({ user }) => {
    console.log("user credentials and details", user)
    const [menu, setMenu] = React.useState(true)
    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cart.cartItems);

    const toggleNavbar = () => {
        dispatch(getUsersData(user)) 
        setMenu(!menu)
    }

    React.useEffect(() => {
        console.log("user credentials and details")
    }, [menu, toggleNavbar])

    React.useEffect(() => {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0); 
    })

    const isAdmin = user && user.role === 'admin'
    const isTeacher = user && user.role === 'teacher'
 
    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <React.Fragment>
            <div id="navbar" className="navbar-area">
                <div className="edemy-nav admin-nav">
                    <div className="container-fluid">
                        <div className="navbar navbar-expand-lg navbar-light">
              
                            <Link href="/">
                                <a onClick={toggleNavbar} className="navbar-brand">
                                    <img src="/images/newlogo1.png" alt="logo" className="navbar-logos"/>
                                </a>
                            </Link>

                            <button 
                                onClick={toggleNavbar} 
                                className={classTwo}
                                type="button" 
                                data-toggle="collapse" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>

                            <div 
                            className={`${classOne} navbar_justification-between`} 
                            id="navbarSupportedContent">
                                {/* <SearchForm /> */}

                                <ul className="navbar-nav">

                                    <li className="nav-item">
										<Link href="/" activeClassName="active">
											<a onClick={toggleNavbar} className="nav-link">
												Home
											</a>
										</Link>
									</li>

                                    <li className="nav-item">
										<Link href="/about-1" activeClassName="active">
											<a onClick={toggleNavbar} className="nav-link">
												About Us
											</a>
										</Link>
									</li>

                                    <li className="nav-item">
                                        <Link href="/courses" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">CIMA Courses</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/blog-1" activeClassName="active">
                                            <a onClick={toggleNavbar} className="nav-link">Blogs</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
										<Link href="/contact">
											<a className="nav-link">
												Contact Us
											</a>
										</Link>
									</li>
 
                                    {(user && isTeacher) && (
                                        <li className="nav-item">
                                            <Link href="/teacher/dashboard">
                                                <a className="nav-link">
                                                    Instructor Dashboard
                                                </a>
                                            </Link>
                                        </li>
                                    )}
                                    {user && isAdmin && (
                                        <li className="nav-item">
                                            <Link href="/teacher/courses">
                                                <a className="nav-link">
                                                    Dashboard
                                                </a>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                                <div className="others-option d-flex align-items-center">
                                    <div className="option-item">
										<div className="cart-btn">
											<Link href="mailto:reachout@akontz.com">
												<a>
													<i class='bx bx-envelope bx-lg icon-size_increase-phone'></i>{" "}
												</a>
											</Link>
										</div>
									</div>

									<div className="option-item">
										<div className="cart-btn">
											<Link href="tel:+557854578964">
												<a>
												<i class='bx bx-phone bx-lg icon-size_increase-phone'></i>{" "}
													{/* <span> */}
														{/* <i className='bx bx-envelope'></i> */}
													{/* </span> */}
												</a>
											</Link>
										</div>
									</div>

									<div className="option-item">
										<div className="cart-btn">
											<Link href="/cart">
												<a>
												<i class='bx bxl-whatsapp-square bx-lg icon-size_increase-whatsapp'></i>{" "}
												</a>
											</Link>
										</div>
									</div>
                                    {!isAdmin ? <div className="option-item">
                                        <div className="cart-btn">
                                            <Link href="/cart">
                                                <a><i className='flaticon-shopping-cart'></i> <span>{cartItems?.length}</span></a>
                                            </Link>
                                        </div>
                                    </div>: null}

                                    <div className="option-item">
                                        {user ? (
                                            <div className="user-dropdown">
                                                <Link href="/">
                                                    <a onClick={e => e.preventDefault()} className="default-btn">
                                                        <i className="flaticon-user"></i> {user.name} <span></span>
                                                    </a>
                                                </Link>
 
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link href="/my-courses" activeClassName="active">
                                                            <a onClick={toggleNavbar} className="nav-link">My Courses</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item">
                                                        <Link href="/user/my-profile" activeClassName="active">
                                                            <a onClick={toggleNavbar} className="nav-link">My Profile</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item">
                                                        <Link href="/user/edit-profile" activeClassName="active">
                                                            <a onClick={toggleNavbar} className="nav-link">Edit Profile</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item">
                                                        <Link href="/user/edit-password" activeClassName="active">
                                                            <a onClick={toggleNavbar} className="nav-link">Edit Password</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item">
                                                        <Link href="/">
                                                            <a 
                                                                className="nav-link"
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    handleLogout()
                                                                }}
                                                            >
                                                                Logout
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link href="/authentication">
                                                <a className="default-btn">
                                                    <i className="flaticon-user"></i> Login/Register <span></span>
                                                </a>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminNavbar;
