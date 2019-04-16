<template>
    <article>
        <header>
            <h1>Top 300 longest tournaments</h1>
        </header>

        <section>
            <p>The tournaments for this top match next criteria</p>
            <ul>
                <li>The tournament must be finished in one sitting (no legs)</li>
            </ul>
        </section>

        <section>
            <Table
                :columns="columns" :data="tournaments_longest"
                sort_column_default="stage_amount" :sort_direction_default="false"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import tournaments_longest from '@/assets/tournaments_longest.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            tournaments_longest,
            columns: [
                { name: 'name', header: 'Tournament', sortable: true, template: ( row ) =>
                    `<a href="https://rbr.onlineracing.cz/index.php?act=tourmntsview&torid=${row.id}">${row.name}</a>`
                },
                { name: 'creator_name', header: 'Created by', sortable: true, template: ( row ) =>
                    `<a href="http://rbr.onlineracing.cz/index.php?act=ustats&u=${row.creator_id}">${row.creator_name}</a>`
                },
                { name: 'difficulty', header: 'Difficulty', sortable: true },
                { name: 'stage_amount', header: 'Stages', sortable: true },
                { name: 'started', header: 'Started', sortable: true },
                { name: 'finished', header: 'Finished', sortable: true },
                { name: 'survivability', header: '%', sortable: true }
            ]
        }
    },
    head() {
        return {
            title: 'Tournaments - Longest'
        }
    },
}
</script>