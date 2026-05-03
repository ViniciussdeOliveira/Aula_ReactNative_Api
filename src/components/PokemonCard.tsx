import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PokemonData } from '../types/pokemon';

interface Props {
  pokemon: PokemonData;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Text style={styles.pokemonType}>
        Tipo: {pokemon.types.map(t => t.type.name).join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, marginTop: 20 },
  image: { width: 150, height: 150 },
  pokemonName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  pokemonType: { fontSize: 16, color: '#666', marginTop: 5, textTransform: 'capitalize' }
});