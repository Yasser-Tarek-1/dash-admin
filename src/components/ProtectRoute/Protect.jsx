import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { user } = useSelector((state) => state.user);
    return user ? <Component {...props} /> : <Navigate to="/" replace />;
  };
};
export default Protected;
