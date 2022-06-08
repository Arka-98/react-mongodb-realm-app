import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import AppContext from "../context/AppContext"

function Navbar() {
    const { user } = useContext(AppContext)
    const location = useLocation()
    const matchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
        return false
    }
    return (
        <nav className="bg-slate-700 text-white">
            <div className="flex justify-between py-2 px-5">
                {user ? 
                    <div className="flex gap-5">
                        <Link to='/' className={`py-1 px-2 hover:bg-violet-500 duration-100 rounded-sm ${matchRoute("/") && "bg-violet-600"}`}>
                            Products
                        </Link>
                        {user.providerType !== "anon-user" &&
                            <>
                                <Link to='/add' className={`py-1 px-2 hover:bg-violet-500 duration-100 rounded-sm ${matchRoute("/add") && "bg-violet-600"}`}>
                                    Add Product
                                </Link>
                            </>
                        }
                        <Link to='/profile' className={`py-1 px-2 hover:bg-slate-500 duration-100 rounded-sm ${matchRoute("/profile") && "bg-violet-600"}`}>
                            Profile
                        </Link>
                    </div> :
                    <div className="flex gap-5">
                        <Link to='/login' className={`py-1 px-2 hover:bg-slate-500 duration-100 rounded-sm ${matchRoute("/login") && "bg-violet-600"}`}>
                            Login
                        </Link>
                        <Link to='/register' className={`py-1 px-2 hover:bg-slate-500 duration-100 rounded-sm ${matchRoute("/register") && "bg-violet-600"}`}>
                            Register
                        </Link>
                    </div>
                }
                <Link to='/about' className={`py-1 px-2 float-right hover:bg-slate-500 duration-100 rounded-sm ${matchRoute("/about") && "bg-violet-600"}`}>
                    About
                </Link>
            </div>
        </nav>
    )
}

export default Navbar