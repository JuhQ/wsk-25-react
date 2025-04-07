// TODO: älä nimeä komponentteja suomeksi
// muista komponenttien nimet aina alkamaan isolla, käytä PascalCase (https://en.wikipedia.org/wiki/Camel_case)

function MitenMenee() {
  return <p>Miten menee?</p>;
}

// tämän komponentin voi kirjoittaa monella tapaa:

// const MitenMenee = function() {
//   return <p>Miten menee?</p>;
// }

// const MitenMenee = () => {
//   return <p>Miten menee?</p>;
// }

// const MitenMenee = () =>
//   <p>Miten menee?</p>;

// const MitenMenee = () => <p>Miten menee?</p>;

// ja lopulta luokkakomponenttina. Luokkakomponentteja ei kannata enää käyttää
// class MitenMenee extends React.Component {
//   render() {
//     return <p>Miten menee?</p>
//   }
// }

export default MitenMenee;
