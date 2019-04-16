<template>
    <article>
        <header>
            <h1>Tournaments</h1>
        </header>

        <section>
            <p>At the time of scrapping all data, there are</p>
            <ul>
                <li><strong>123 934</strong> tournaments</li>
                <li><strong>34 793 473</strong> stage results across these tournaments</li>
                <li>Submitted by <strong>27 258</strong> drivers</li>
            </ul>
        </section>

        <section style="display: flex; flex-wrap: wrap;">
            <section>
                <header>
                    <h1>Tournaments by physics</h1>
                </header>

                <Table :columns="[
                    { name: 'physics', header: 'Physics', sortable: true },
                    { name: 'latest_date', header: 'Latest tournament' },
                    { name: 'count', header: 'Tournaments', sortable: true }
                ]" :data="tournaments_physics" sort_column_default="count" :sort_direction_default="false"/>
            </section>

            <section>
                <header>
                    <h1>Condensed</h1>
                </header>

                <Table :columns="[
                    { name: 'physics', header: 'Physics' },
                    { name: 'count', header: 'Tournaments' }
                ]" :data="tournaments_physics_condensed" sort_column_default="count" :sort_direction_default="false"/>
            </section>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import tournaments_physics from '@/assets/tournaments_physics.json'
import tournaments_physics_condensed from '@/assets/tournaments_physics_condensed.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            tournaments_physics,
            tournaments_physics_condensed
        }
    },
    head() {
        return {
            title: 'Tournaments - By physics'
        }
    },
}
</script>