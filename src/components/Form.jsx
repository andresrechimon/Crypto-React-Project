import React, {useEffect, useState} from 'react'
import Error from './Error';
import useCoin from '../hooks/useCoin';
import useCrypto from '../hooks/useCrypto';
import styled from '@emotion/styled';
import axios from 'axios';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Form = ({setCurrency, setCryptoCurrency}) => {
    //useState cypto list
    const [crytoList, setList] = useState([]);
    const [error, setError] = useState(false);

    //Coins array
    const COINS = [
        { code: 'USD', name: 'Dólar Estadounidense' },
        { code: 'ARS', name: 'Peso Argentino' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Libra Esterlina' }
    ]

    //Using useCoin
    const [coin, Select] = useCoin('Elige tu Moneda', '', COINS);
    //Using useCrypto
    const [cryptocurrency, SelectCrypto] = useCrypto('Elige tu Criptomoneda', '', crytoList);

    //API Call
    useEffect(() =>{
        const consultAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);

            setList(result.data.Data);
        }
        consultAPI();
    }, [])

    //When users press submit
    const quoteCoin = e => {
        e.preventDefault();

        //Validate if fields are filled
        if(coin === '' || cryptocurrency === ''){
            setError(true);
            return;
        }
        //Pass data to main component
        setError(false);
        setCurrency(coin);
        setCryptoCurrency(cryptocurrency);
    }

    return (  
        <form
            onSubmit={quoteCoin}
        >

            {error ? <Error message="Todos los campos son obligatorios" /> : null}

            <Select/>
            <SelectCrypto/>
            <Button
            type="submit"
            value="Calcular"
            />
        </form>
    );
}
 
export default Form;