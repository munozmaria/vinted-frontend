import { useParams } from "react-router-dom";

const Offer = () => {
  // useParams permet de récupérer les params présent dans l'url de la page
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Je suis sur la page Offer</h1>
      <p>L'id de cette offre est : {id}</p>
    </div>
  );
};

export default Offer;
