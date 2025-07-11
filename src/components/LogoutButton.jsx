import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Button
      size="small"
      style={{ position: "fixed", top: 16, right: 80 }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
