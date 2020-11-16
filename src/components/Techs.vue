<template>
    <div v-if="techs.length" class="techs">
        <span v-for="tech in techs" :key="tech">
            {{ tech }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'techs',
        props: {
            techs: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.techs {
    margin: 20px 0;
}
span {
    padding: 10px;
    background-color: brown;
    color: #FFFFFF;
    font-weight: 600;
    margin: 0 10px;
    border-radius: 50%;
}
</style>