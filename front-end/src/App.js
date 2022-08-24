import Connexion from "./pages/Connexion";
import React from "react";
import { Routes, Route} from "react-router-dom";
import ConnexionLogin from "./pages/ConnexionLogin";
import Forum from "./pages/Forum";
import Organigramme from "./pages/Organigramme";
import Profil from "./pages/Profil"
// visiblement le Routes a remplacé le switch


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/profil/:id" element= {<Profil />}></Route>
        <Route exact path="/signup" element= {<Connexion />}></Route>
        <Route exact path="/login" element= {<ConnexionLogin />}></Route>
        <Route path="/publication" element= {<Forum />}></Route>
        <Route path="/organigramme" element= {<Organigramme />}></Route>
      </Routes>
    </div>
  );
}

export default App;