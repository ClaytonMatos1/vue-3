<template>
    <div class="info-repositories">
        <span class="total" v-if="qtdRepositories > 0">Total de repositórios: {{ qtdRepositories }}</span>
        <div class="content" v-if="qtdUserTechs.length">
            <p v-for="tech in qtdUserTechs" :key="tech.name">
                <span>Tecnologia: {{ tech.name }}</span> - <span>Quantidade de repositórios: {{ tech.quantity }}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'info-repos-user',
        props: {
            qtdRepositories: {
                type: Number,
                default: function () {
                    return 0;
                }
            },
            qtdUserTechs: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
    }
</script>

<style scoped>
.info-repositories {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    border: 1px solid #000000;
    background-color: #00ffff;
    border-radius: 5px;
}
.total {
    border-bottom: 1px solid #000000;
}
</style>