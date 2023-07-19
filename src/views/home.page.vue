<template>
  <div class="allboard">
    <div class="banner">
      <h1>Seja bem-vindo ao Autómata Tester!</h1>
      <p>{{ word }}</p>

    </div>





  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "HomePage",
  setup() {
    const words: string[] = [
      "O Autómata Tester é uma plataforma de testes e validação para a versão final do Autómata, nossa solução de automação de WhatsApp com fluxos de conversas e disparos em massa.",
      "Com um sistema robusto integrado a inteligência artificial, o Autómata oferece recursos avançados para automatizar processos de comunicação no WhatsApp.",
      "Além disso, o Autómata permite a integração com diversas plataformas, facilitando a interação com seus clientes em diferentes canais.",
      "A plataforma é constantemente aprimorada para oferecer a melhor experiência possível, com atualizações regulares e novos recursos sendo adicionados.",
      "O Autómata simplifica a automação de fluxos de conversas, permitindo interações personalizadas e automatizadas com seus clientes.",
      "Com disparos em massa, você pode alcançar um grande número de contatos de uma só vez, economizando tempo e esforço.",
      "Nossa solução foi desenvolvida com foco na eficiência e no desempenho, garantindo um processo de automação de WhatsApp ágil e confiável.",
      "A integração do Autómata com inteligência artificial proporciona uma comunicação mais inteligente e personalizada com seus clientes.",
      "Estamos comprometidos com o aprimoramento contínuo da plataforma, ouvindo o feedback dos usuários e implementando melhorias constantes.",
      "O Autómata é a escolha perfeita para impulsionar a automação de comunicação no WhatsApp, aumentando a eficiência do seu negócio."
    ];
    const word = ref<string>(words[0])
    let i = 1
    setInterval(() => {


      word.value = words[i]

      i++
      if (i >= words.length) {
        i = 0
      }
    }, 5000)

    return {
      word
    }
  }
})

</script>
<style scoped>
.allboard {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  box-sizing: border-box;
  padding: 10px;
  flex-wrap: wrap;
  text-align: justify;
  position: relative;
}

.banner {
  width: 100%;
  background-image: url('../../public/wallpaper.jpg');
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-size: cover;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px #000;
  color:#fff;
}

.banner::after {
  position: absolute;
  content: " ";
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: var(--component-color);
  background-image: linear-gradient(to left, var(--component-color),var(--component-two-color));
  filter: opacity(0.7);

}

.banner h1,
.banner p {
  z-index: 999 !important;
  font-weight: bold;

}

.banner h1 {
  border-bottom: 2px solid #fff;
  margin-bottom: 24px;
  padding: 10px;
}

.banner p {
  font-size: 16px;

  animation: 5s infinite digit;
}

@keyframes digit {
  0% {
    filter: opacity(1);
  }
100%{
  filter:opacity(0)
}

}</style>