import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FloydScreen() {
  const [matriz, setMatriz] = useState<number[][]>([]);
  const [matrizResultado, setMatrizResultado] = useState<number[][]>([]);
  const [operacoesFloyd, setOperacoesFloyd] = useState(0);
  const [tempoFloyd, setTempoFloyd] = useState(0);
  const [quantidadeVertices, setQuantidadeVertices] = useState("5");

  function gerarMatriz() {
    const tamanho = Number(quantidadeVertices);

    if (tamanho < 2 || tamanho > 100) {
      alert("Quantidade de vértices deve ser entre 2 e 100.");
      return;
    }

    const novaMatriz: number[][] = [];

    for (let i = 0; i < tamanho; i++) {
      const linha: number[] = [];

      for (let j = 0; j < tamanho; j++) {
        if (i === j) {
          linha.push(0);
        } else {
          const temConexao = Math.random() > 0.3;

          if (temConexao) {
            const peso = Math.floor(Math.random() * 20) + 1;
            linha.push(peso);
          } else {
            linha.push(Infinity);
          }
        }
      }

      novaMatriz.push(linha);
    }

    setMatriz(novaMatriz);
    setMatrizResultado([]);
    setOperacoesFloyd(0);
    setTempoFloyd(0);
  }
  function floydWarshall() {
    const dist = matriz.map((linha) => [...linha]);

    const n = dist.length;

    let operacoes = 0;

    const inicio = performance.now();

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          operacoes++;

          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    const fim = performance.now();

    setMatrizResultado(dist);
    setOperacoesFloyd(operacoes);
    setTempoFloyd(fim - inicio);
  }

  function limparTela() {
    setMatriz([]);
    setMatrizResultado([]);
    setOperacoesFloyd(0);
    setTempoFloyd(0);
    setQuantidadeVertices("5");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Floyd-Warshall</Text>

      <Button title="Limpar" onPress={limparTela} />

      <Text style={styles.label}>Quantidade de vértices:</Text>

      <TextInput
        style={styles.input}
        value={quantidadeVertices}
        onChangeText={setQuantidadeVertices}
        keyboardType="numeric"
      />

      <Button title="Gerar matriz" onPress={gerarMatriz} />

      <Button title="Executar Floyd-Warshall" onPress={floydWarshall} />

      {matriz.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((valor, j) => (
            <Text key={j} style={styles.celula}>
              {valor === Infinity ? "∞" : valor}
            </Text>
          ))}
        </View>
      ))}

      <Text style={styles.subtitulo}>Resultado do Floyd-Warshall</Text>

      {matrizResultado.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((valor, j) => (
            <Text key={j} style={styles.celula}>
              {valor === Infinity ? "∞" : valor}
            </Text>
          ))}
        </View>
      ))}
      <Text style={styles.info}>Vértices: {matriz.length}</Text>

      <Text style={styles.info}>Operações: {operacoesFloyd}</Text>

      <Text style={styles.info}>Tempo: {tempoFloyd.toFixed(4)} ms</Text>

      <Text style={styles.complexidade}>Complexidade: O(V³)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 50,
    height: 50,
    borderWidth: 1,
    textAlign: "center",
    paddingTop: 15,
    fontSize: 18,
  },

  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },

  info: {
    fontSize: 20,
    marginTop: 10,
  },

  complexidade: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
  },

  label: {
    fontSize: 18,
    marginTop: 15,
  },

  input: {
    width: 120,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
});
