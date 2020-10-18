import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '@/core/service/firebase';

import LoginPage from '@/pages/login/LoginPage';
import CadastroPage from '@/pages/login/CadastroPage';
import ContentLayout from '@/layout/ContentLayout';
import AlteraSenhaPage from '@/pages/alteraSenha/AlteraSenhaPage';

//Lazy Loading
const ParcelaPage = () => import('@/pages/parcela/ParcelaPage');
const DespesaPage = () => import('@/pages/despesa/DespesaPage');
const DespesaFormPage = () => import('@/pages/despesa/DespesaFormPage');
const DespesaValorTotalPage = () =>
  import('@/pages/despesa/DespesaValorTotalPage');
const LogoutPage = () => import('@/pages/login/LogoutPage');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroPage
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: ContentLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'despesa',
          name: 'despesa',
          component: DespesaPage
        },
        {
          path: 'despesaForm',
          name: 'despesa-form',
          component: DespesaFormPage
        },
        {
          path: 'despesa/:key',
          name: 'despesa-valor-total',
          component: DespesaValorTotalPage
        },
        {
          path: 'parcela',
          name: 'parcela',
          component: ParcelaPage
        },
        {
          path: 'altSenha',
          name: 'altera-senha',
          component: AlteraSenhaPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'logout',
          name: 'logout',
          component: LogoutPage
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('/login');
  else if (!requiresAuth && currentUser) next('/despesas');
  else next();
});

export default router;
