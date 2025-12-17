export default function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="alert alert-error max-w-md">
        <span>⛔ Accès non autorisé</span>
      </div>
    </div>
  );
}
