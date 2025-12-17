import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      email: formData.get("email"),
      motDePasse: formData.get("password"),
    };

    try {
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          navigate("/user-dash");
        });
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe invalide");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-4 rounded-xl"
      >
        {error && <p className="text-red-500 text-sm"> {error} </p>}
        <h1 className="text-center text-2xl">Page de connexion</h1>
        <input
          type="email"
          name="email"
          id="email"
          className="border border-white rounded-xl p-2"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border border-white rounded-xl p-2"
        />
        <button className="btn btn-primary" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
