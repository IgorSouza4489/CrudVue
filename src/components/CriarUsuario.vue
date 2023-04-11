<template>
  <div id="container">
    <div class="form-container">
      <form @submit.prevent="editar ? editarPessoa() : adicionarPessoa()">
        <div class="form-group">
          <h1 style="color: #008d53">
            {{ editar ? "Editar" : "Registrar" }}
          </h1>
          <br />
        </div>
        <div class="form-group">
          <input-form
            label="Nome"
            type="text"
            v-model="nome"
            placeholder="Digite um nome"
          />
        </div>
        <div class="form-group">
          <input-form
            label="Email"
            type="email"
            v-model="email"
            placeholder="Digite o email pessoal"
          />
        </div>
        
        <div class="form-group">
          <input-form
            label="Idade"
            type="number"
            v-model="idade"
            placeholder="Digite sua idade"
          />
        </div>
        <div class="form-group">
          <label for="">Gênero</label>
          <select required v-model="selectedGenero">
            <option value="" disabled selected>
              Selecione o gênero da pessoa
            </option>
            <option v-for="genero in generos" :key="genero.id">
              {{ genero.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <input-form
            label="Data de Nascimento"
            type="date"
            v-model="nascimento"
            placeholder="Seleciona a data de nascimento"
          />
        </div>

        <div class="form-group">
          <textarea
            style="width: 100%; height: 100px; resize: none"
            v-model="texto"
            type="text"
            placeholder="Digite aqui a observação"
          ></textarea>
        </div>

        <div class="form-group">
          <input type="submit" id="btn" value="Registrar" />
        </div>

        <p v-if="error" style="color: red">
          Verifique se você digitou o email corretamente
        </p>
      </form>
    </div>

    <div id="pessoas">
      <div v-if="pessoas.length === 0" class="table-response">
        <h3>A lista está vazia</h3>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="col-sm-2">Nome</th>
              <th class="col-sm-2">Idade</th>

              <th class="d-none d-sm-table-cell col-sm-2">Data Nascimento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pessoa, id) in pessoas" :key="id">
              <td class="col-sm-2">{{ pessoa.nome }}</td>
              <td class="col-sm-2">{{ pessoa.idade }}</td>
              <td class="d-none d-sm-table-cell col-sm-2">
                {{ pessoa.nascimento }}
              </td>
              <td class="col-sm-2">
                <button id="btnExcluir" @click="excluirPessoa(id)">Excluir</button>
                <button id="btnEditar" @click="preencherFormulario(pessoa)">
                  Editar
                </button>
                <button id="btndetalhes" @click="verDetalhes(id)">
                  Ver Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="pessoaSelecionada !== null">
        <modal-observacao
          v-show="mostrarModal"
          :pessoaSelecionada="pessoaSelecionada"
          @close="mostrarModal = false"
        ></modal-observacao>
      </div>
    </div>
  </div>
</template>

<script>
import inputForm from "./form/inputForm.vue";
import ModalObservacao from "./modal/ModalObservacao.vue";
import { useToast } from "vue-toastification";
import moment from 'moment';

const toast = useToast();
export default {
  components: {
    inputForm,
    ModalObservacao,
  },
  name: "CriarUsuario",
  created() {
    this.getPessoas();
    this.verificarAniversarios()
  },
  data() {
    return {
      mostrarModal: false,
      error: false,
      nome: "",
      pessoaSelecionada: null,
      email: "",
      idade: "",
      selectedGenero: "",
      nascimento: "",
      editar: false,
      indexEd: "",
      texto: "",
      pessoas: [],
      generos: [],
    };
  },

  methods: {
    verificarAniversarios() {
    this.pessoas.forEach((pessoa) => {
    const hoje = moment();
    const dataNascimento = moment(pessoa.nascimento).set("year", hoje.year());
    const diferenca = Math.abs(dataNascimento.dayOfYear() - hoje.dayOfYear());
    if (diferenca === 0) {
      toast.success(`Hoje é o aniversário de ${pessoa.nome}!`);
    } 

    if (diferenca > 0 && diferenca <= 10){
      toast(`O aniversário de ${pessoa.nome} está chegando`)
    }
  });
},

    validarEmail(email) {
      const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(email);
    },
    verDetalhes(index) {
      this.mostrarModal = true;
      this.pessoaSelecionada = this.pessoas[index];
    },
    getPessoas() {
      this.pessoas = this.$store.state.pessoas;
      this.generos = this.$store.state.generos;
    },
    adicionarPessoa() {
      if (!this.nome){
        return alert('Erro')
      }

      if (!this.idade){
        return alert('Erro')
      }

      if (!this.nascimento){
        return alert('Erro')
      }
      if (this.validarEmail(this.email)){
        const novaPessoa = {
        nome: this.nome,
        email: this.email,
        idade: this.idade,
        genero: this.selectedGenero,
        nascimento: this.nascimento,
        texto: this.texto,
      };
      toast.success("Pessoa adicionada!");
      this.pessoas.push(novaPessoa);
      this.apagarDadosForm();
      }
      else{
        toast.error('Digite um email válido')
      }
    },
    excluirPessoa(index) {
      this.$store.dispatch('excluirPessoa', index);
            toast.success("Pessoa excluída");

    },
    apagarDadosForm() {
      this.nome = "";
      this.email = "";
      this.idade = "";
      this.selectedGenero = "";
      this.nascimento = "";
      this.texto = "";
    },

    preencherFormulario(pessoa) {
      this.nome = pessoa.nome;
      this.email = pessoa.email;
      this.idade = pessoa.idade;
      this.selectedGenero = pessoa.genero;
      this.nascimento = pessoa.nascimento;
      this.texto = pessoa.texto;
      this.index = this.pessoas.indexOf(pessoa);
      this.editar = true;
    },

    editarPessoa() {
      if (this.index === null) {
        return;
      }
      const pessoaEditada = {
        nome: this.nome,
        email: this.email,
        idade: this.idade,
        genero: this.selectedGenero,
        nascimento: this.nascimento,
        texto: this.texto,
      };
      //spread
      this.pessoas[this.index] = {
        ...this.pessoas[this.index],
        ...pessoaEditada,
      };
      toast.success("Pessoa editada com sucesso!");
      this.apagarDadosForm();
      this.editar = false;
      this.index = null;
    },
  },
};
</script>

<style scoped>

</style>
