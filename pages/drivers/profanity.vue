<template>
    <article>
        <header>
            <h1>Profanity</h1>
        </header>

        <section>
            <header>
                <h1>Popular swearings by country</h1>
            </header>

            <p>Mind you: <em>сука</em> RegExp for Czech entry mostly hit words derivative from <em>cuká</em>, which apparently is not a swearing and should be considered false positive.</p>

            <Table :columns="columns" :data="swears" :show_index="false"/>
        </section>
    </article>
</template>

<script>
import Table from '@/components/table.vue'
import swears from '@/assets/drivers_profanity.json'
export default {
    components: {
        Table
    },
    data() {
        return {
            swears,
            columns: [
                { name: 'swear', header: 'Swearing', },
                { name: 'reg_expression', header: 'RegExp', template: ( row ) => `<pre>${ row.reg_expression }</pre>` },
                { name: 'country', header: 'Country', template: ( row ) => row.country.length === 0 ? '?' : row.country },
                { name: 'count', header: 'Hits' }
            ]
        }
    },
    head() {
        return {
            title: 'Drivers - Profanity'
        }
    },
}
</script>