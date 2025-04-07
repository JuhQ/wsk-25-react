import './App.css';

import Greeting from './Greeting';

// react komponentin voi luoda usealla tavalla
// const App = function() {
// const App = () => {
function App() {
  return (
    <>
      <Greeting name="Ilkka" />
      <Greeting name={123} />
      <Greeting name="Heikki" />
      <h1>My App</h1>
      <Greeting name="Tiina" />
      <Greeting name="Maija" />
    </>
  );
}

export default App;
