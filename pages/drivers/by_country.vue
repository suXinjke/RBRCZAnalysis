<template>
    <article>
        <header>
            <h1>Drivers by country</h1>
        </header>

        <Table :columns="columns" :data="drivers" sort_column_default="count" :sort_direction_default="false"/>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import drivers from '@/assets/drivers.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            drivers,
            columns: [
                { name: 'country_code', header: ' ', template: ( row ) => row.country_code ? `<img src="https://www.countryflags.io/${row.country_code}/shiny/16.png"/>` : '' },
                { name: 'country', header: 'Country', sortable: true },
                { name: 'count', header: 'Drivers', sortable: true }
            ]
        }
    },
    head() {
        return {
            title: 'Drivers - By country'
        }
    },
}
</script>