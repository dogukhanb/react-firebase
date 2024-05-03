import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
    const handleVerification = async () => {
      await emailVerification();
    };
  };
  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoIRL && (
            <img src={user.photoURL} className="w-7 h-7 rounded-full"></img>
          )}
          Hoşgeldiniz Oturum Açık : {user.email}
          <button
            onClick={handleLogout}
            className="h-10 rounded whitespace-nowrap px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={emailVerification}
              className="h-10 rounded px-4 whitespace-nowrap text-sm text-white bg-indigo-700"
            >
              E-posta Onayla
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  }

  return (
    <div className="flex gap-3 m-3 p-2">
      <Link
        className="bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600"
        to="/register"
      >
        Kayıt Ol
      </Link>
      <Link
        className="bg-green-500 rounded-md px-2 py-1 hover:bg-green-600"
        to="/login"
      >
        Giriş Yap
      </Link>
    </div>
  );
};

export default Home;
