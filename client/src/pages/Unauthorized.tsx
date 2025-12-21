/**
 * Page instructif indiquant une page interdit au role de l'utilisateur courrant
 * On se content d'afficher que la page demander n'est pas disponible
 */
const Unauthorized = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="alert alert-error max-w-md">
        <span>404 - Page non trouvée!</span>
      </div>
    </div>
  );
};
export default Unauthorized;
