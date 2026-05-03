import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  StyleSheet, ActivityIndicator, Alert, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

interface PokemonData {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export default function SimpleScreen() {
  const [inputText, setInputText] = useState('');
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);

  // Chamada Dinâmica (Busca)
  const fetchDynamicPokemon = async () => {
    if (!inputText.trim()) {
      Alert.alert('Aviso', 'Digite o nome de um Pokémon!');
      return;
    }
    
    Keyboard.dismiss();
    setLoading(true);
    setPokemon(null);
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputText.toLowerCase()}`);
      setPokemon(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Pokémon não encontrado.');
    } finally {
      setLoading(false);
    }
  };

  // Chamada Fixa
  const fetchFixedPokemon = async () => {
    setLoading(true);
    setPokemon(null);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/charizard');
      setPokemon(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar o Pokémon fixo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pokédex Monolítica</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome (ex: pikachu)"
          value={inputText}
          onChangeText={setInputText}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={fetchDynamicPokemon}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, styles.fixedButton]} onPress={fetchFixedPokemon}>
        <Text style={styles.buttonText}>Buscar Fixo (Charizard)</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#e3350d" style={styles.loader} />}

      {pokemon && !loading && (
        <View style={styles.card}>
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
          <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.pokemonType}>
            Tipo: {pokemon.types.map(t => t.type.name).join(', ')}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  inputContainer: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginRight: 10 },
  button: { backgroundColor: '#e3350d', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  fixedButton: { backgroundColor: '#333', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loader: { marginTop: 40 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  image: { width: 150, height: 150 },
  pokemonName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  pokemonType: { fontSize: 16, color: '#666', marginTop: 5, textTransform: 'capitalize' }
});