import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedAuth = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { user } = useSelector((state) => state.user);
    return user ? <Navigate to="/admin" replace /> : <Component {...props} />;
  };
};
export default ProtectedAuth;
