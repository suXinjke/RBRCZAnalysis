<template>
    <article>
        <header>
            <h1>Top 300 deadliest tournaments</h1>
        </header>

        <section>
            <p>The tournaments for this top match next criteria</p>
            <ul>
                <li>The amount of <strong>stages</strong> must be <strong>8 or higher</strong></li>
                <li>The amount of <strong>drivers who entered</strong> the tournament must be <strong>100 or higher</strong></li>
                <li>There must be atleast <strong>one finishing driver</strong> to rule out tournaments that crashed everyone's game session</li>
            </ul>
        </section>

        <section>
            <Table :columns="columns" :data="tournaments_deadliest" sort_column_default="survivability"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import tournaments_deadliest from '@/assets/tournaments_deadliest.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            tournaments_deadliest,
            columns: [
                { name: 'name', header: 'Tournament', sortable: true, template: ( row ) =>
                    `<a href="https://rbr.onlineracing.cz/index.php?act=tourmntsview&torid=${row.id}">${row.name}</a>`
                },
                { name: 'creator_name', header: 'Created by', sortable: true, template: ( row ) =>
                    `<a href="http://rbr.onlineracing.cz/index.php?act=ustats&u=${row.creator_id}">${row.creator_name}</a>`
                },
                { name: 'difficulty', header: 'Difficulty', sortable: true },
                { name: 'stage_amount', header: 'Stages', sortable: true },
                { name: 'drivers_started', header: 'Started', sortable: true },
                { name: 'drivers_finished', header: 'Finished', sortable: true },
                { name: 'survivability', header: '%', sortable: true }
            ]
        }
    },
    head() {
        return {
            title: 'Tournaments - Deadliest'
        }
    },
}
</script>