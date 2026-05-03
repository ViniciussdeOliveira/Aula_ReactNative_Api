import { useQuery } from '@tanstack/react-query';
import { getPokemonByName } from '../services/api';
import { PokemonData } from '../types/pokemon';

export const usePokemonSearch = (pokemonName: string) => {
  return useQuery<PokemonData, Error>({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => getPokemonByName(pokemonName),
    // A query só é disparada se houver um nome válido preenchido
    enabled: !!pokemonName,
    retry: false, // Não tenta novamente se falhar (ex: digitou nome errado)
  });
};

export const useFixedPokemon = () => {
  return useQuery<PokemonData, Error>({
    queryKey: ['pokemon', 'blastoise'],
    queryFn: () => getPokemonByName('blastoise'),
  });
};