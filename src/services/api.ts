import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const getPokemonByName = async (name: string) => {
  const { data } = await api.get(`pokemon/${name.toLowerCase()}`);
  return data;
};