import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { email: emailCtx, getProfile, logout } = useContext(UserContext);
  const [email, setEmail] = useState(emailCtx);

  useEffect(() => {
    (async () => {
      const data = await getProfile(); // { email }
      if (data?.email) setEmail(data.email);
    })();
  }, [getProfile]);

  return (
    <div className="container py-4">
      <h2>Perfil</h2>
      <p><b>Email:</b> {email || "—"}</p>
      <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
    </div>
  );
}
