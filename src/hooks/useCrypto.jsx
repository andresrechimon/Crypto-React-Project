import React, {Fragment, useState} from 'react'
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Sel = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
    font-weight: bolder;
`;

const useCrypto = (label, initialState, COINS) => {
    //Custom Hook State
    const [state, setState] = useState(initialState);

    const SelectCrypto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Sel
            onChange={ e => setState(e.target.value)}
            value={state}
            >
                <option value="">--Seleccione--</option>
                {COINS.map(COIN => (
                  <option key={COIN.CoinInfo.Id} value={COIN.CoinInfo.Name}>{COIN.CoinInfo.FullName}</option>  
                ))}
            </Sel>
        </Fragment>
    );

    //Return state, interface and function which modifies the state.
    return [state, SelectCrypto, setState];
}

export default useCrypto;