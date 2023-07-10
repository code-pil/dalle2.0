import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode != "login" && mode != "signup") {
    throw json({ error: "Invalid mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  //token set
  const { token, name } = await response.json();

  localStorage.setItem("token", token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  localStorage.setItem("name", name);

  return redirect("/");
};
