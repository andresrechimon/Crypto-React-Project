import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import Quoting from './components/Quoting';
import Spinner from './components/Spinner';
import axios from 'axios';
import styled from '@emotion/styled';
import image from './cryptomonedas.png'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const[currency, setCurrency] = useState('');
  const[cryptoCurrency, setCryptoCurrency] = useState('');
  const[result, setResult] = useState({});
  const[loading, setLoading] = useState(false);

  useEffect(() => {
    const quoteCryptoCurrency = async() => {
      if(currency === '') return;
      //Consult API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
  
      const result = await axios.get(url);

      //Show spinner
      setLoading(true);
      //Hide spinner and show result
      setTimeout(() => {
        //Change loading state
        setLoading(false);
        //Save quoting
        setResult(result.data.DISPLAY[cryptoCurrency][currency]);  
      }, 3000);
    }
    quoteCryptoCurrency();
  }, [currency, cryptoCurrency])

  //Show spinner or result
  const component = (loading) ? <Spinner/> : <Quoting result={result}/>;

  return (
    <Container>
      <div>
        <Image 
        src={image}
        alt='Crypto Image'
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form
        setCurrency={setCurrency}
        setCryptoCurrency={setCryptoCurrency}
        />
        {component}
      </div>
    </Container>
  );
}

export default App;
