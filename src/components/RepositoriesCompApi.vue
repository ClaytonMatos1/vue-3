<template>
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
</template>

<script>
import { ref, watch, computed } from 'vue';

import RepositoryService from '@/services/RepositoryService.js';
import UserTechs from '@/models/UserTechs.js';

import TableRepos from '@/components/TableRepos.vue';
import User from '@/components/User.vue';
import Techs from '@/components/Techs.vue';
import InfoReposUser from '@/components/InfoReposUser';

export default {
    name: 'repositories-comp-api',
    components: {
        TableRepos,
        User,
        Techs,
        InfoReposUser
    },
    setup () {
        // TableRepos component
        const repositories = ref([]);
        const inputName = ref(null);
        function validInput () {
            repositories.value = [];
            const name = inputName.value.value;
            if (name.length < 2) {
                resetUser();
                resetTechs();
                return;
            }
            getRepositories(name);
        }
        // callService
        async function getRepositories (name) {
            repositories.value = await RepositoryService.getRepositories(name);
        }
        // watch
        watch(repositories, function (val) {
            if (val) {
                if (repositories.value.length == 0) {
                    resetUser();
                    resetTechs();
                    return;
                }
                fillUser();
                fillTechs();
            }
        });
        // mounted
        getRepositories('ClaytonMatos1');
        // User component
        const user = ref({
            name: '',
            img: '',
            url: ''
        });
        function fillUser () {
            const { owner } = repositories.value[0];
            user.value.name = owner.login;
            user.value.img = owner.avatar_url;
            user.value.url = owner.html_url;
        }
        function resetUser () {
            user.value.name = '';
            user.value.img = '';
            user.value.url = '';
        }
        // InfoReposUser component
        const languages = ref([]);
        const techs = ref([]);
        function fillTechs () {
            languages.value = repositories.value.map(repos => repos.language);
            techs.value = languages.value.filter((language, index) =>
                language && languages.value.indexOf(language) === index);
        }
        function resetTechs () {
            techs.value = [];
        }
        // computed
        const qtdRepositories = computed(() => repositories.value.length);
        const qtdUserTechs = computed(() => {
            let userTechs = {};
            languages.value.forEach(language => {
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
        });

        return {
            repositories,
            user,
            languages,
            techs,
            validInput,
            inputName,
            qtdRepositories,
            qtdUserTechs
        }
    }
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