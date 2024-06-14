import React, { FC, useEffect, useState } from 'react';
import styles from './Pokemon.module.css';
import axios from 'axios';

interface IPokemon {
  pName: string,
  imgUrl: string,
  order: string,
  types: string[]
}

interface PokemonProps {
  pName: string,
  url: string,
  order: number
}

const Pokemon: FC<PokemonProps> = (props: PokemonProps) => {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(props.url).then(
      (res) => {
        const pokemon: IPokemon = {
          pName: props.pName,
          imgUrl: res.data.sprites.other["official-artwork"].front_default,
          order: '#' + props.order.toString().padStart(4, '0'),
          types: res.data.types.map((e: { type: { name: any; }; }) => e.type.name)
        }
        setPokemon(pokemon)
        setLoading(false)
      }
    ).catch(
      () => {
        setPokemon(undefined)
        setLoading(false)
      }
    )
  }, [])

  return (
    <>
      {loading ?
        <div className={styles.pokemon}>
          Loading...
        </div>
        :
        pokemon ?
          <div className={styles.pokemon}>
            <img className={styles.pImg} src={pokemon.imgUrl}></img>
            <div className={styles.descriptions}>
              <p className={styles.order}>{pokemon.order}</p>
              <h1 className={styles.pName}>{pokemon.pName[0].toUpperCase() + pokemon.pName.slice(1)}</h1>
              <div className={styles.pTypes}>
                {pokemon.types.map((type, i) => (
                  <div key={i} className={`${styles.pTypeItem} ${styles[type] ? styles[type] : styles['defaultType']}`}> {type[0].toUpperCase() + type.slice(1)} </div>
                ))}
              </div>
            </div>
          </div>
          :
          <div className={styles.pokemon}>
            Not available!
          </div>
      }
    </>
  )
};

export default Pokemon;
