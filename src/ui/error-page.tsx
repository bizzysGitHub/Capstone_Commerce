import { useRouteError, isRouteErrorResponse } from "react-router";

const ErrorPage = () => {
  const error: unknown = useRouteError();
  console.error(error);

  let message = "Unknown error";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data.message || message;
  }

  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', gap: '0.75rem', textAlign: 'center' }}>
      <h1 style={{ margin: 0 }}>Oops!</h1>
      <p style={{ margin: 0 }}>Sorry, an unexpected error has occurred.</p>
      <p style={{ margin: 0, fontStyle: 'italic' }}>{message}</p>
    </div>
  )
}

export default ErrorPage
