<template>
    <article style="display: flex; flex-wrap: wrap;">
        <section>
            <header>
                <h1>Popular NGP cars of 2018</h1>
            </header>

            <Table :columns="columns" :data="cars" sort_column_default="count" :sort_direction_default="false"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import cars from '@/assets/cars_popular_2018.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            cars,

            columns: [
                { name: 'name', header: 'Car', sortable: true },
                { name: 'class', header: 'Class', sortable: true },
                { name: 'count', header: 'Picks', sortable: true }
            ]
        }
    },

    head() {
        return {
            title: 'Cars - Popular of all time'
        }
    },
}
</script>