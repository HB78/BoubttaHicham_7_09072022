import "../../styles/formulaire.css"
import { TbWorld } from "react-icons/tb";
import axios from 'axios';
import { Link } from 'react-router-dom';
//on importe yup pour créer un schéma des données du formulaire
import * as yup from "yup";

//on importe react hook form pour valider les données du formulaire
import { useForm } from "react-hook-form";

//on import hooform resolver pour lier yup et react hook fomr
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import apiUrl from "./../../api_url"

export default function Formulaire() {

  //on créer le schéma de verification des input avec yup
  const schema = yup.object().shape({
    name: yup.string("entrez un nom valide").required("remplissez le champs"), 
    email: yup.string().email("entrez un email valide").required("remplissez le champs"), 
    password: yup.string("entrez un mot de passe entre 4 et 15 caratères").min(4).max(15).required("remplissez le champs")
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  //register : cela permet d'enregistrer les données entrer par le user par contre il faut mettre "ref" ds l'input
  //handleSubmit permet de gérer la soumission du formulaire si il est bien ou mal remplit
  //le register va en fait remplacer l'attribut name de l'input
  
  //mise en place de la fonction pour envoyer les données à la BDD avec Axios
  
  let navigate = useNavigate();

    async function onSubmit(data) {
      try {
        //e.preventDefault()
        const response = await axios.post(`${apiUrl}/users/signup`, data)
        alert(response.data)
        console.log('hook form fonctionne')
        console.log(data)
        navigate("/login");
      } catch (error) {
        console.log(error)
        alert(error.response.data)
      }
    }

  return (
    <>
      <div className='titre'>
        <h1>Bienvenue sur Groupomania</h1>
      </div>
      <h2 className="second_title">Le réseau social d'entreprise</h2>
      <main className="test">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TbWorld size={"35px"} color="#FD2D01" />
          <fieldset>
            <legend>SignUp</legend>
            <Link to ="/login"><p className='login'>Déja inscrit ?</p></Link>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              {...register("name")}
              />
            <small>{errors.name?.message}</small>

            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              {...register("email")}/>
            <small>{errors.email?.message}</small>

            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              {...register("password")}/>
              <small>{errors.password?.message}</small>

            <input type="submit" className="banner1" value="envoyer"/>
          </fieldset>
          {/* deuxieme formulaire */}
          <TbWorld size={"35px"} color="#FD2D01" />
        </form>
      </main>
    </>
  )
};