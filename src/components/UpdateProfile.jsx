import { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault(password);
    await resetPassword();
    setPassword("");
  };
  return (
    <div className="grid gap-y-10">
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Ad-Soyad
          </label>
          <div>
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="John Wick"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div>
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="img"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            {avatar && (
              <img src={avatar} className="mt-2 rounded-md w-20 h-20" />
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Güncelle
          </button>
        </div>
      </form>

      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Parolayı Güncelle</h1>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div>
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Değiştirmek için lütfen yeni şifre oluşturunuz."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            disabled={!password}
            type="submit"
            className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
