import MyNav from "./components/MyNav/MyNav";
import MyFooter from "./components/MyFooter/MyFooter";
import Welcome from "./components/Welcome/Welcome";
import Main from "./components/Main/Main";
import InputSearch from "./components/InputSearch/InputSearch";

function App() {
  return (
    <>
      <MyNav />
      <Welcome />
      <InputSearch/>
      <Main />
      <MyFooter />
    </>
  );
}

export default App;
