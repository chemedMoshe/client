import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { fetchLogin, fetchRegister } from "../../redux/Slices/userSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const[message,setMessage]= useState("please wait")
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    navigate('/votes')
  }, [user])

  
  return (
    <div className="register">
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <select onChange={(e)=>setIsAdmin(JSON.parse(e.target.value))}>
          <option value="false" >Select role</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </select>
      </label>
      <button onClick={() => {
        dispatch(fetchRegister({ username, password, isAdmin }))
        navigate('/votes')
      }
        }>Register</button>
       <p>{message}</p>
    </div>
  );
}
  