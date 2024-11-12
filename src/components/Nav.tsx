import { useEffect } from 'react';
import { useAppSelector, RootState } from '../redux/store'
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav() {
    const user = useAppSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    
   

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    };
    return (
       
        <div className="nav">
            {localStorage.getItem('token') ? (
                <>
                    <NavLink to={"/votes"}>Votes</NavLink>
                    {user.user?.isAdmin &&  user.user?.isAdmin && (
                        <NavLink to={"/statistics"}>Statistics</NavLink>
                    )}
                    <button onClick={() =>logout()}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/register"}>Register</NavLink>
                </>
            )}
        </div>
    );
}