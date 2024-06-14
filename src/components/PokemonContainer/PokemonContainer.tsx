import React, { FC, useEffect, useState } from 'react';
import styles from './PokemonContainer.module.css';
import axios from 'axios'
import { SOURCE_URL } from '../../config/default';
import Pokemon from '../Pokemon/Pokemon';

interface IPokemonResponse {
  name: string,
  url: string
}

const PokemonContainer: FC = () => {

  const [pokemons, setPokemons] = useState<IPokemonResponse[]>([])
  const [isMore, setMore] = useState<boolean>(true)

  const handleMore = () => {
    const len = pokemons.length;
    axios.get(SOURCE_URL + '&offset=' + len).then(
      (res) => {
        setPokemons([...pokemons, ...res.data.results])
        setMore(pokemons.length < res.data.count)
      }
    )
  }

  useEffect(() => {
    axios.get(SOURCE_URL).then(
      (res) => {
        setPokemons(res.data.results)
      }
    )
  }, [])

  return (
    <>
      <div className={styles.pokemonContainer}>
        {pokemons.map((pm, i) => (
          <Pokemon key={i} pName={pm.name} order={i} url={pm.url}></Pokemon>
        ))}
      </div>
      {isMore && <div className={styles.showMore} onClick={handleMore}>Load more...</div>}
    </>
  )
};

export default PokemonContainer;
