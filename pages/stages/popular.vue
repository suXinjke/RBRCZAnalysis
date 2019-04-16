<template>
    <article>
        <header>
            <h1>Popular tracks</h1>
        </header>

        <section>
            <Table :columns="columns" :data="tracks" sort_column_default="count" :sort_direction_default="false"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import tracks from '@/assets/tracks_popular.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            tracks,

            columns: [
                { name: 'stage_name_original', header: 'Name', sortable: true },
                { name: 'country', header: 'Country', sortable: true },
                { name: 'distance', header: 'Distance, km', template: ( row ) => row.distance.toFixed( 1 ), sortable: true },
                { name: 'surface', header: 'Surface', sortable: true },
                { name: 'count', header: 'Picks', sortable: true }
            ]
        }
    },
    head() {
        return {
            title: 'Stages - Popular of all time'
        }
    },
}
</script>