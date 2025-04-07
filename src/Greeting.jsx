import MitenMenee from './MitenMenee';
import PropTypes from 'prop-types';

// react onClick kuuntelija käytännössä tekee alla olevan
// document.querySelector("button").addEventListener("click", handleButtonClick)

const Greeting = (props) => {
  function handleButtonClick() {
    alert('Klikki');
  }

  return (
    <>
      <h5>Moi, {props.name}</h5>
      <MitenMenee />
      <button onClick={handleButtonClick}>nappi</button>
    </>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
