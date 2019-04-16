<template>
    <article>
        <header>
            <h1>Driver reliability</h1>
        </header>

        <section>
            <p>The drivers for this top match next criteria</p>
            <ul>
                <li>Must have entered <strong>200 or more</strong> tournaments</li>
            </ul>
        </section>

        <section>
            <p>The tournament entry is considered a failure when one of criteria is met</p>
            <ul>
                <li>Driver has crashed</li>
                <li>Driver did not finish the tournament</li>
                <li>Total amount of <strong>penalties is 60 or more seconds</strong></li>
            </ul>
        </section>

        <section style="display: flex; flex-wrap: wrap;">
            <section>
                <header>
                    <h1>Top 300 reliable drivers in NGP</h1>
                </header>
                <Table :columns="columns" :data="drivers_reliable_ngp" sort_column_default="success_ratio" :sort_direction_default="false"/>
            </section>

            <section>
                <header>
                    <h1>Top 300 unreliable drivers in NGP</h1>
                </header>
                <Table :columns="columns" :data="drivers_unreliable_ngp" sort_column_default="success_ratio" :sort_direction_default="true"/>
            </section>
        </section>

        <section style="display: flex; flex-wrap: wrap;">
            <section>
                <header>
                    <h1>Top 300 reliable drivers of all time</h1>
                </header>
                <Table :columns="columns" :data="drivers_reliable" sort_column_default="success_ratio" :sort_direction_default="false"/>
            </section>

            <section>
                <header>
                    <h1>Top 300 unreliable drivers of all time</h1>
                </header>
                <Table :columns="columns" :data="drivers_unreliable" sort_column_default="success_ratio" :sort_direction_default="true"/>
            </section>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import drivers_reliable from '@/assets/drivers_reliable.json'
import drivers_reliable_ngp from '@/assets/drivers_reliable_ngp.json'
import drivers_unreliable from '@/assets/drivers_unreliable.json'
import drivers_unreliable_ngp from '@/assets/drivers_unreliable_ngp.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            drivers_reliable,
            drivers_reliable_ngp,
            drivers_unreliable,
            drivers_unreliable_ngp,
            columns: [
                { name: 'country', header: 'C', sortable: true, template: ( row ) => row.country_code ? `<img class="table-component__country" title="${row.country}" src="https://www.countryflags.io/${row.country_code}/shiny/16.png"/>` : '' },
                { name: 'name', header: 'Driver', sortable: true, template: ( row ) =>
                    `<a href="http://rbr.onlineracing.cz/index.php?act=ustats&u=${row.id}">${row.name}</a>`
                },
                { name: 'entries', header: 'Entries', sortable: true },
                { name: 'failures', header: 'Failures', sortable: true },
                { name: 'success_ratio', header: 'Success %', sortable: true, template: ( row ) => row.success_ratio.toFixed( 2 ) },
            ]
        }
    },
    head() {
        return {
            title: 'Drivers - Reliability'
        }
    },
}
</script>