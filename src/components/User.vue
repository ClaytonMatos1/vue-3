<template>
    <div v-if="name.length" class="user">
        <img :src="img" alt="Avatar" v-if="img.length">
        <p>{{ name }}</p>
        <a :href="url" target="_blank">{{ url }}</a>
    </div>
</template>

<script>
    export default {
        name: 'user',
        props: {
            img: {
                type: String,
                default: function () {
                    return '';
                }
            },
            name: {
                type: String,
                default: function () {
                    return '';
                }
            },
            url: {
                type: String,
                default: function () {
                    return '';
                }
            },
        },
    }
</script>

<style scoped>
.user {
    margin-right: 20px;
}
img {
    width: 200px;
}
</style>