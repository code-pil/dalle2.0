import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { MainNavigation } from "../components";
import { useEffect } from "react";
import { getTokenDuration } from "../utils";

const Root = () => {
  const submit = useSubmit();
  const token = useLoaderData();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main className="sm:p-8 -z-10 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
