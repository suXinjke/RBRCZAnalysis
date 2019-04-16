<template>
    <article>
        <header>
            <h1>Stages</h1>
        </header>

        <section>
            <div class="select-input select-input_auto-width">
                <label>Track</label>
                <select v-model="selected_track_id">
                    <option v-for="id in track_ids" :key="id[0]" :value="id[0]">
                        {{ id[1] }}
                    </option>
                </select>
            </div>
            <RecordsTable :pbs="pbs"/>
        </section>
    </article>
</template>

<script>
import track_ids from '@/assets/tracks.json'
import RecordsTable from '@/components/records-table'
export default {
    components: {
        RecordsTable
    },
    data: function() {
        return {
            track_ids,
            selected_track_id: track_ids[0][0],

            pbs: []
        }
    },
    head() {
        return {
            title: 'Stages - Records'
        }
    },

    methods: {
        fetchPbs: async function( id ) {
            this.pbs = await fetch( `/rbrcz_analysis/stage_pbs/${id}.json` ).then( res => res.json() )
        }
    },

    watch: {
        selected_track_id: function( id ) {
            this.fetchPbs( id )
        }
    },

    mounted() {
        this.fetchPbs( this.selected_track_id )
    }
}
</script>