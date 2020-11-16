<template>
    <div class="table-repos">
        <table id="repositories" v-if="repositories.length">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>

                    <th>
                        Name
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in repositories" :key="item.id">
                    <td>{{ item.id }}</td>

                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'table-repos',
        props: {
            repositories: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
    }
</script>

<style scoped>
.table-repos {
    display: flex;
    justify-content: center;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 2px 50px;
}

table th {
  color: white;
  background-color: #9d9e9e;
}
</style>