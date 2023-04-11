import { createStore } from 'vuex'


export default createStore({
    state: {
        pessoas: [
            { id: 1, nome: "Igor Souza", idade: 21, nascimento: "2023-04-05", email: "teste@gmail.com", texto: "Pessoa legal" },
            { id: 2, nome: "João Souza", idade: 22, nascimento: "2023-04-10", email: "teste2@gmail.com", texto: "Pessoa legal" },
            { id: 3, nome: "Maurício Souza", idade: 23, nascimento: "2020-03-05", email: "teste3@gmail.com", texto: "Pessoa legal" },
        ],
        generos: [
            { id: 1, name: "Masculino" },
            { id: 2, name: "Feminino" },
        ],
    },
    getters: {
        pessoas: (state) => {
            return state.pessoas;
          },
    },

    mutations: {
        excluir_pessoa(state, index) {
            state.pessoas.splice(index, 1);
          }
    },

    actions: {
        excluirPessoa(context, index) {
            context.commit('excluir_pessoa', index);
          }
    }
})
