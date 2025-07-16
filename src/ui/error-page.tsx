import { useRouteError, isRouteErrorResponse} from "react-router";



const ErrorPage = () => {
    //fix any type later
    const error: unknown = useRouteError();
    console.error(error);

    let message = "Unknown error";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data.message || message;
  }

  return (
    <div id='error-page'>
         <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  )
}

export default ErrorPage