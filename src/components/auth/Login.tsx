import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector} from "../../redux/store";
import { fetchLogin } from "../../redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    navigate('/votes')
  }, [user])

  
  return (
    <div className="login">
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
      <button onClick={() => dispatch(fetchLogin({ username, password }))}>Login</button>
    </div>
  );
}