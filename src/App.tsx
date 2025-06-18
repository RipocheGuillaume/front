import { useState } from "react";
import "./App.css";
import Events from "./components/Events/Events";
import Menu from "./components/Menu/Menu";
import Notifications from "./components/Notifications/Notifications";
import Ressources from "./components/Ressources/Ressources";

function App() {
  const [activePage, setActivePage] = useState("Manage Ressources");
  const displayPage = () => {
    switch (activePage) {
      case "Manage Ressources":
        return <Ressources />;
      case "Manage Events":
        return <Events />;
      case "Notifications":
        return <Notifications />;
    }
  };

  return (
    <>
      <Menu onSelect={setActivePage} />
      <div className="">{displayPage()}</div>
    </>
  );
}

export default App;
