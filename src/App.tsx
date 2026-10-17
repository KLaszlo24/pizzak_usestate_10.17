import "bootstrap/dist/css/bootstrap.min.css";
import { Pizzak } from "./components/Pizzak";
function App() {
  

  return (
    <>
    <Fejlec></Fejlec>
    <Lablec></Lablec>
    <Pizzak></Pizzak>
    </>
  )
}

function Fejlec(){
  return(
    <header>
      <h1 className="text-center bg-warning">Pizzák</h1>
    </header>
  )
}

function Lablec(){
  return(
    <footer>
      <p>Készítette: Krajcz László</p>
    </footer>
  )
}

export default App
