import logo from "../assets/img/logo.jpg";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="" />

        <div>
          <input type="text" placeholder="recherche des articles" />
        </div>
        <div>
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <div>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
