import Connexion from "./pages/Connexion";
import { Routes, Route} from "react-router-dom";
import ConnexionLogin from "./pages/ConnexionLogin";
import Publications from "./pages/Publications";
import Organigramme from "./pages/Organigramme";
import Profil from "./pages/Profil"
import Accueil from "./pages/Accueil";
import Error from "./components/error 404/Error";
// visiblement le Routes a remplacé le switch


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Accueil />}></Route>
        <Route exact path="/signup" element={<Connexion />}></Route>
        <Route exact path="/login" element={<ConnexionLogin />}></Route>
        <Route path="/publication" element={<Publications />}></Route>
        <Route path="/organigramme" element={<Organigramme />}></Route>
        <Route path="/profil/:id" element={<Profil />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;