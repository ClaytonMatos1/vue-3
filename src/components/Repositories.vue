<template>
  <div class="repos">
    <div class="search">
      <input type="text" ref="inputName" id="userName" placeholder="Digite o nome do Github" @keyup.enter="validInput">
      <button @click="validInput">Search</button>
    </div>
    <Techs :techs="techs" />
    <div class="content">
      <div class="profile">
        <User
          :img="user.img"
          :name="user.name"
          :url="user.url"
        />
        <InfoReposUser
          v-if="user.name"
          :qtdRepositories="qtdRepositories"
          :qtdUserTechs="qtdUserTechs"
        />
      </div>
      <TableRepos :repositories="repositories" />
    </div>
  </div>
</template>

<script>
import RepositoryService from '@/services/RepositoryService.js';
import UserTechs from '@/models/UserTechs.js';

import TableRepos from '@/components/TableRepos.vue';
import User from '@/components/User.vue';
import Techs from '@/components/Techs.vue';
import InfoReposUser from '@/components/InfoReposUser';

export default {
  name: 'repositories',
  components: {
    TableRepos,
    User,
    Techs,
    InfoReposUser
  },
  data() {
    return {
      repositories: [],
      user: {
        name: '',
        img: '',
        url: ''
      },
      languages: [],
      techs: []
    }
  },
  methods: {
    // TableRepos component
    validInput() {
      this.repositories = [];
      const name = this.$refs.inputName.value;
      if (name.length < 2) {
        this.resetUser();
        this.resetTechs();
        return;
      }
      this.getRepositories(name);
    },
    // callService
    async getRepositories (name) {
      this.repositories = await RepositoryService.getRepositories(name);
    },
    // trigger components
    checkEmptyRepository () {
      if (this.repositories.length == 0) {
        this.resetUser();
        this.resetTechs();
        return;
      }
      this.fillUser();
      this.fillTechs();
    },
    // User component
    fillUser () {
      const { owner } = this.repositories[0];
      this.user.name = owner.login;
      this.user.img = owner.avatar_url;
      this.user.url = owner.html_url;
    },
    resetUser () {
      this.user.name = '';
      this.user.img = '';
      this.user.url = '';
    },
    // InfoReposUser component
    fillTechs () {
      this.languages = this.repositories.map(repos => repos.language);
      this.techs = this.languages.filter((language, index) =>
        language && this.languages.indexOf(language) === index);
    },
    resetTechs () {
      this.techs = [];
    }
  },
  watch: {
    repositories() {
      this.checkEmptyRepository();
    }
  },
  computed: {
    qtdRepositories() {
      return this.repositories.length;
    },
    qtdUserTechs() {
      let userTechs = {};
      this.languages.forEach(language => {
        if (!language) return;
        if (userTechs[language]) {
          userTechs[language].quantity = userTechs[language].quantity + 1;
        }
        else {
          userTechs[language] = {};
          userTechs[language].quantity = 1;
        }
      });

      const techs = [];
      for (const userTech in userTechs) {
        const tech = new UserTechs(userTech, userTechs[userTech].quantity);
        techs.push(tech);
      }
      return techs.sort((a, b) => a.quantity > b.quantity ? -1 : 1 );
    }
  },
  mounted () {
    this.getRepositories('ClaytonMatos1');
  },
}
</script>

<style scoped>
input {
  padding: 2px;
  margin-right: 2px;
}

button {
  cursor: pointer;
  padding: 2px 8px;
  background-color: #0000ff;
  color: #FFFFFF;
}

.search {
  margin-bottom: 10px;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
