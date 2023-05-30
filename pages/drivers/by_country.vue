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
                { name: 'country_code', header: ' ', template: ( row ) => {
                    if (!row.country_code) {
                        return ''
                    }

                    const country_code = row.country_code.toLowerCase()
                    return `<span class="fi fi-${country_code}"><span class="fi fi-${country_code} fis"></span></span>`
                } },
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