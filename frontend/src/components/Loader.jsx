export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="loader">
      <p>{message}</p>
    </div>
  );
}
