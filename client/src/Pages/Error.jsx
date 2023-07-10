import { useRouteError } from "react-router-dom";
import { PageContent } from "../components";
import { MainNavigation } from "../components";

const Error = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "An unknown error occurred.";
  console.log(error);

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "404";
    message = "Page not found";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
