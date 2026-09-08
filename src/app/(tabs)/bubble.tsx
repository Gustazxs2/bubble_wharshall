import { useState } from "react";

import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function HomeScreen() {
  const [numeros, setNumeros] = useState<number[]>([]);
  const [numerosOrdenados, setNumerosOrdenados] = useState<number[]>([]);
  const [comparaçoesBubble, setComparacoesBubble] = useState(0);
  const [trocasBubble, setTrocasBubble] = useState(0);
  const [temposBubbles, setTempoBubble] = useState(0);
  const [quantidadeNumeros, setQuantidadeNumeros] = useState("10");

  function gerarNumeros() {
    const quantidade = Number(quantidadeNumeros);

    if (quantidade < 2 || quantidade > 10000) {
      return;
    }

    const novoVetor = [];

    for (let i = 0; i < quantidade; i++) {
      const numeroAleatorio = Math.floor(Math.random() * 100);
      novoVetor.push(numeroAleatorio);
    }

    setNumeros(novoVetor);
    setNumerosOrdenados([]);
    setComparacoesBubble(0);
    setTrocasBubble(0);
    setTempoBubble(0);
  }

  function bubbleSort() {
    const vetor = [...numeros];

    let comparacoes = 0;
    let trocas = 0;

    const inicio = performance.now();
    for (let i = 0; i < vetor.length - 1; i++) {
      for (let j = 0; j < vetor.length - 1 - i; j++) {
        comparacoes++;

        if (vetor[j] > vetor[j + 1]) {
          const temp = vetor[j];

          vetor[j] = vetor[j + 1];

          vetor[j + 1] = temp;

          trocas++;
        }
      }
    }
    const fim = performance.now();

    setNumerosOrdenados(vetor);

    setComparacoesBubble(comparacoes);
    setTrocasBubble(trocas);
    setTempoBubble(fim - inicio);
  }

  function limparTela() {
    setNumeros([]);
    setNumerosOrdenados([]);
    setComparacoesBubble(0);
    setTrocasBubble(0);
    setTempoBubble(0);
    setQuantidadeNumeros("10");
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Trabalho de Algoritmos</Text>
      <Button title="Limpar" onPress={limparTela} />
      <Text style={styles.texto}>Bubble Sort</Text>

      <Text style={styles.label}>Quantidade de números:</Text>

      <TextInput
        style={styles.input}
        value={quantidadeNumeros}
        onChangeText={setQuantidadeNumeros}
        keyboardType="numeric"
      />

      <Button title="Gerar números" onPress={gerarNumeros} />
      <Text style={styles.resultado}>{numeros.join(", ")}</Text>

      <Button title="ordenar com bubblesort" onPress={bubbleSort} />

      <Text style={styles.resultado}>{numerosOrdenados.join(", ")}</Text>

      <Text style={styles.info}>comparacoes: {comparaçoesBubble}</Text>

      <Text style={styles.complexidade}>complexidade: 0(n²)</Text>

      <Text style={styles.info}>trocas: {trocasBubble}</Text>

      <Text style={styles.info}>tempo: {temposBubbles.toFixed(4)} ms</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  texto: {
    fontSize: 22,
    marginTop: 15,
  },

  resultado: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },

  info: {
    fontSize: 20,
    marginTop: 13,
  },

  complexidade: {
    fontSize: 25,
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
