<template>
    <article class="chart-page">
        <div class="chart-page__chart-container">
            <header class="chart-page__header">
                <h1>Popular tracks by month</h1>
            </header>

            <div class="chart-page__chart">
                <no-ssr>
                    <apexchart type="line" :series="chart_data" :options="{
                        ...chartOptions,
                        noData: {
                            text: 'Select any track to show how often it was picked each month on the chart'
                        }
                    }"/>
                </no-ssr>
            </div>
        </div>

        <div class="chart-page__select-container">
            <header class="chart-page__select-header">
                <h1>
                    Select tracks
                    <button v-on:click="track_selection = {}">Clear</button>
                </h1>
            </header>


            <div class="chart-page__select-items">
                <div class="chart-page__select-items-section">
                    <h1>Gravel</h1>
                    <div v-for="track_name in tracks_available_gravel" :key="track_name">
                        <input :id="track_name + '_checkbox'" type="checkbox" v-model="track_selection[track_name]"/>
                        <label :for="track_name + '_checkbox'">{{ track_name }}</label>
                    </div>
                </div>

                <div class="chart-page__select-items-section">
                    <h1>Tarmac</h1>
                    <div v-for="track_name in tracks_available_tarmac" :key="track_name">
                        <input :id="track_name + '_checkbox'" type="checkbox" v-model="track_selection[track_name]"/>
                        <label :for="track_name + '_checkbox'">{{ track_name }}</label>
                    </div>
                </div>

                <div class="chart-page__select-items-section">
                    <h1>Snow</h1>
                    <div v-for="track_name in tracks_available_snow" :key="track_name">
                        <input :id="track_name + '_checkbox'" type="checkbox" v-model="track_selection[track_name]"/>
                        <label :for="track_name + '_checkbox'">{{ track_name }}</label>
                    </div>
                </div>
            </div>
        </div>



    </article>
</template>

<script>
import tracks_by_month from '@/assets/tracks_popular_by_month.json'
import chartOptions from '@/components/chart-options'

let track_selection_backup = {}

export default {
    data() {
        return {
            track_selection: {},
            chartOptions
        }
    },
    head() {
        return {
            title: 'Stages - Popular by month'
        }
    },

    computed: {
        tracks_available_gravel: function() {
            return Object.keys( tracks_by_month ).filter( key => tracks_by_month[key].surface === 'Gravel' ).sort( ( a, b ) => a.toLowerCase() >= b.toLowerCase() )
        },

        tracks_available_tarmac: function() {
            return Object.keys( tracks_by_month ).filter( key => tracks_by_month[key].surface === 'Tarmac' ).sort( ( a, b ) => a.toLowerCase() >= b.toLowerCase() )
        },

        tracks_available_snow: function() {
            return Object.keys( tracks_by_month ).filter( key => tracks_by_month[key].surface === 'Snow' ).sort( ( a, b ) => a.toLowerCase() >= b.toLowerCase() )
        },

        chart_data: function() {
            return Object.keys( this.track_selection )
                .filter( key => this.track_selection[key] === true )
                .map( car => ( {
                    name: car,
                    data: tracks_by_month[car].data
                } ) )
        }
    },

    destroyed() {
        track_selection_backup = this.track_selection
    },

    mounted() {
        this.track_selection = track_selection_backup
    }
}
</script>
