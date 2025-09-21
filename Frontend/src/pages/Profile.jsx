const Profile = () => {
  const email = "usuario@demo.com";

  return (
    <div className="container py-4">
      <h2 className="mb-3">Perfil</h2>
      <p className="mb-4"><strong>Email:</strong> {email}</p>
      <button className="btn btn-outline-danger" type="button">Cerrar sesión</button>
    </div>
  );
};

export default Profile;
