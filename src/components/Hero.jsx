import { useNavigate } from "react-router-dom";


const Hero = () => {

const navigate = useNavigate()

return(
    <>
   <div className='hero'>
    <div>
    <div className="hero-ready">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button onClick={() => {
          navigate("/publish");
        }}>Commencer à vendre</button>
    </div>
    </div>
   </div>
    </>
)
}

export default Hero