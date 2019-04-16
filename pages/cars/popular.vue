<template>
    <article style="display: flex; flex-wrap: wrap;">
        <section>
            <header>
                <h1>Popular NGP cars</h1>
            </header>

            <Table :columns="columns" :data="cars_ngp" sort_column_default="count" :sort_direction_default="false"/>
        </section>

        <section>
            <header>
                <h1>Popular non-NGP cars</h1>
            </header>

            <Table :columns="columns" :data="cars_classics" sort_column_default="count" :sort_direction_default="false"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import cars from '@/assets/cars_popular.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            cars_classics: cars.filter( car => !car.is_ngp ),
            cars_ngp:  cars.filter( car => car.is_ngp ),

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