import { useState } from "react";

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  // =========================
  // ENTRADA DO USUÁRIO
  // =========================

  const [tamanho, setTamanho] = useState("10");

  // =========================
  // BUBBLE SORT
  // =========================

  const [numeros, setNumeros] = useState<number[]>([]);
  const [numerosOrdenados, setNumerosOrdenados] = useState<number[]>([]);
  const [comparacoesBubble, setComparacoesBubble] = useState(0);
  const [trocasBubble, setTrocasBubble] = useState(0);
  const [tempoBubble, setTempoBubble] = useState(0);

  // =========================
  // FLOYD-WARSHALL
  // =========================

  const [operacoesFloyd, setOperacoesFloyd] = useState(0);
  const [tempoFloyd, setTempoFloyd] = useState(0);
  const [quantidadeVertices, setQuantidadeVertices] = useState(0);

  // =========================
  // GERAR VETOR
  // =========================

  function gerarVetor(quantidade: number) {
    const novoVetor: number[] = [];

    for (let i = 0; i < quantidade; i++) {
      const numeroAleatorio = Math.floor(Math.random() * 1000);

      novoVetor.push(numeroAleatorio);
    }

    return novoVetor;
  }

  // =========================
  // BUBBLE SORT
  // =========================

  function bubbleSort(vetorOriginal: number[]) {
    const vetor = [...vetorOriginal];

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

  // =========================
  // GERAR MATRIZ DO GRAFO
  // =========================

  function gerarMatriz(tamanhoMatriz: number) {
    const matriz: number[][] = [];

    for (let i = 0; i < tamanhoMatriz; i++) {
      const linha: number[] = [];

      for (let j = 0; j < tamanhoMatriz; j++) {
        if (i === j) {
          linha.push(0);
        } else {
          const existeCaminho = Math.random() > 0.3;

          if (existeCaminho) {
            const peso = Math.floor(Math.random() * 20) + 1;

            linha.push(peso);
          } else {
            linha.push(Infinity);
          }
        }
      }

      matriz.push(linha);
    }

    return matriz;
  }

  // =========================
  // FLOYD-WARSHALL
  // =========================

  function floydWarshall(matrizOriginal: number[][]) {
    const matriz = matrizOriginal.map((linha) => [...linha]);

    const vertices = matriz.length;

    let operacoes = 0;

    const inicio = performance.now();

    for (let k = 0; k < vertices; k++) {
      for (let i = 0; i < vertices; i++) {
        for (let j = 0; j < vertices; j++) {
          operacoes++;

          const novoCaminho =
            matriz[i][k] + matriz[k][j];

          if (novoCaminho < matriz[i][j]) {
            matriz[i][j] = novoCaminho;
          }
        }
      }
    }

    const fim = performance.now();

    setOperacoesFloyd(operacoes);
    setTempoFloyd(fim - inicio);
    setQuantidadeVertices(vertices);
  }

  // =========================
  // EXECUTAR OS DOIS
  // =========================

  function executarTeste() {
    const quantidade = Number(tamanho);

    if (
      !Number.isInteger(quantidade) ||
      quantidade < 2 ||
      quantidade > 150
    ) {
      alert("Digite um número inteiro entre 2 e 150.");

      return;
    }

    // BUBBLE SORT

    const vetor = gerarVetor(quantidade);

    setNumeros(vetor);
    setNumerosOrdenados([]);

    bubbleSort(vetor);

    // FLOYD-WARSHALL

    const matriz = gerarMatriz(quantidade);

    floydWarshall(matriz);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Trabalho de Algoritmos
      </Text>

      <Text style={styles.subtitulo}>
        Digite o tamanho do teste
      </Text>

      <TextInput
        style={styles.input}
        value={tamanho}
        onChangeText={setTamanho}
        keyboardType="numeric"
        placeholder="Ex: 50"
      />

      <Button
        title="Executar os algoritmos"
        onPress={executarTeste}
      />

      {/* BUBBLE SORT */}

      <View style={styles.secao}>
        <Text style={styles.texto}>
          Bubble Sort
        </Text>

        <Text style={styles.info}>
          Elementos: {numeros.length}
        </Text>

        <Text style={styles.info}>
          Comparações:{" "}
          {comparacoesBubble.toLocaleString("pt-BR")}
        </Text>

        <Text style={styles.info}>
          Trocas:{" "}
          {trocasBubble.toLocaleString("pt-BR")}
        </Text>

        <Text style={styles.info}>
          Tempo: {tempoBubble.toFixed(4)} ms
        </Text>

        <Text style={styles.complexidade}>
          Complexidade: O(n²)
        </Text>

        {numeros.length <= 20 && (
          <>
            <Text style={styles.resultado}>
              Original:
              {"\n"}
              {numeros.join(", ")}
            </Text>

            <Text style={styles.resultado}>
              Ordenado:
              {"\n"}
              {numerosOrdenados.join(", ")}
            </Text>
          </>
        )}
      </View>

      {/* FLOYD-WARSHALL */}

      <View style={styles.secao}>
        <Text style={styles.texto}>
          Floyd-Warshall
        </Text>

        <Text style={styles.info}>
          Vértices: {quantidadeVertices}
        </Text>

        <Text style={styles.info}>
          Operações:{" "}
          {operacoesFloyd.toLocaleString("pt-BR")}
        </Text>

        <Text style={styles.info}>
          Tempo: {tempoFloyd.toFixed(4)} ms
        </Text>

        <Text style={styles.complexidade}>
          Complexidade: O(V³)
        </Text>
      </View>

      {/* COMPARAÇÃO */}

      <View style={styles.secao}>
        <Text style={styles.texto}>
          Comparação de Performance
        </Text>

        <Text style={styles.comparacao}>
          Bubble Sort
        </Text>

        <Text style={styles.info}>
          O(n²)
        </Text>

        <Text style={styles.info}>
          {comparacoesBubble.toLocaleString("pt-BR")} comparações
        </Text>

        <Text style={styles.info}>
          {tempoBubble.toFixed(4)} ms
        </Text>

        <Text style={styles.comparacao}>
          Floyd-Warshall
        </Text>

        <Text style={styles.info}>
          O(V³)
        </Text>

        <Text style={styles.info}>
          {operacoesFloyd.toLocaleString("pt-BR")} operações
        </Text>

        <Text style={styles.info}>
          {tempoFloyd.toFixed(4)} ms
        </Text>

        <Text style={styles.explicacao}>
          O Bubble Sort possui crescimento quadrático,
          enquanto o Floyd-Warshall possui crescimento
          cúbico. Os tempos mostram o desempenho obtido
          para o tamanho informado, mas os algoritmos
          resolvem problemas diferentes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 20,
    marginBottom: 10,
  },

  input: {
    width: 200,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },

  secao: {
    width: "100%",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 35,
    paddingTop: 25,
  },

  texto: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  resultado: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },

  info: {
    fontSize: 20,
    marginTop: 10,
  },

  complexidade: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },

  comparacao: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },

  explicacao: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 30,
  },
});