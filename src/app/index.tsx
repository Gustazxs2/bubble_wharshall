import { useState } from "react";

import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [numeros, setNumeros] = useState<number[]>([]);
  const [numerosOrdenados, setNumerosOrdenados] = useState<number[]>([]);
  const [comparaçoesBubble, setComparacoesBubble] = useState(0);
  const [trocasBubble, setTrocasBubble] = useState(0);
  const [temposBubbles, setTempoBubble] = useState(0);

  function gerarNumeros() {
    const novoVetor = [];

    for (let i = 0; i < 10; i++) {
      const numeroAleatorio = Math.floor(Math.random() * 100);

      novoVetor.push(numeroAleatorio);
    }

    setNumeros(novoVetor);
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
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Trabalho de Algoritmos</Text>

      <Text style={styles.texto}>Bubble Sort</Text>

      <Button title="Gerar números" onPress={gerarNumeros} />
      <Text style={styles.resultado}>{numeros.join(", ")}</Text>

      <Button title="ordenar com bubblesort" onPress={bubbleSort} />

      <Text style={styles.resultado}>{numerosOrdenados.join(", ")}</Text>
      <Text style={styles.info}>
        comparacoes: {comparaçoesBubble}
      </Text>

      <Text style={styles.info}>
        trocas: {trocasBubble}
      </Text>

      <Text style={styles.info}>
        tempo: {temposBubbles.toFixed(4)} ms
      </Text>

      <Text style={styles.complexidade}>
        complexidade: 0(n²)
      </Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 22,
    marginTop: 13,
  },

  complexidade: {
    fontSize: 30

  }
});
