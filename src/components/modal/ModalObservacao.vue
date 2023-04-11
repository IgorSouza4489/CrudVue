<template>
  <div class="modal-overlay">
    <div id="container">
      <div id="modal">
        <div class="modal-content">
          <h3>Detalhes</h3>
          <p>{{ pessoaSelecionada.texto }}</p>
          <p>{{ pessoaSelecionada.email }}</p>
        </div>
        <div id="botoes">
          <button id="filterButton" @click="$emit('close')">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pessoaSelecionada: Object,
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

#modal {
  background-color: white;
  padding: 25px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  color: black;
}

  #filterButton{
    background-color: #009054;
    border: 1px solid;
    border-radius: 15px;
    color: white;
    width: 100px;
    margin: 10px;
    padding: 10px;
  }

  #filterButton:hover{
    background-color: #008D53;
    color: #F9EC00;
  }
</style>