<template>
  <div>
    <navbar :itens="menu" :sidebar="false">
      <router-view />
    </navbar>
  </div>
</template>

<script>
import Navbar from "@/shared/ui-components/navbar/Navbar";

export default {
  name: "content-layout",
  components: {
    Navbar,
  },
  data() {
    return {
      menu: [
        //{ label: "Inicio", link: "/inicio" },
        { label: "Despesas", link: "/inicio/despesa" },
        { label: "Parcelas", link: "/inicio/parcela" },
        {
          label: "Usuário",
          right: true,
          dropdown: [
            { label: "Alterar senha", link: "/inicio/altSenha" },
            { label: "Logout", link: "/inicio/logout" },
          ],
        },
      ],
      nome: "Joao",
      idade: 23,
      data1: new Date(),
      pessoas: ["Maria", "Jose", "Bento", "Tião", "Mario", "Ana"],
      pessoa: "Bento",
      ativo: true,
    };
  },
  methods: {
    labelPessoa(pessoa) {
      return pessoa;
    },
  },
};
</script>
