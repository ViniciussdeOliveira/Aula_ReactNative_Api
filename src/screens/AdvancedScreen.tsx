import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePokemonSearch, useFixedPokemon } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';

export default function AdvancedScreen() {
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: searchData, 
    isFetching: isSearchFetching, 
    isError: isSearchError 
  } = usePokemonSearch(searchQuery);

  const { 
    data: fixedData, 
    isFetching: isFixedFetching 
  } = useFixedPokemon();

  const handleSearch = () => {
    Keyboard.dismiss();
    setSearchQuery(inputText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pokédex Estruturada (React Query)</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome (ex: gengar)"
          value={inputText}
          onChangeText={setInputText}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {isSearchFetching && <ActivityIndicator size="large" color="#3b4cca" style={styles.loader} />}
      {isSearchError && <Text style={styles.errorText}>Pokémon não encontrado.</Text>}
      {searchData && !isSearchFetching && <PokemonCard pokemon={searchData} />}

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Sempre Carregado (Fixo):</Text>
      {isFixedFetching ? (
        <ActivityIndicator size="large" color="#ffcb05" />
      ) : (
        fixedData && <PokemonCard pokemon={fixedData} />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, color: '#555' },
  inputContainer: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginRight: 10 },
  button: { backgroundColor: '#3b4cca', padding: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loader: { marginTop: 20 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 }
});