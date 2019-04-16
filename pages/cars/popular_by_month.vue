<template>
    <article class="chart-page">
        <div class="chart-page__chart-container">
            <header class="chart-page__header">
                <h1>Popular cars by month</h1>
            </header>

            <div class="chart-page__chart">
                <no-ssr>
                    <apexchart type="line" :series="chart_data" :options="{
                        ...chartOptions,
                        noData: {
                            text: 'Select any car to show how often it was picked each month on the chart'
                        }
                    }"/>
                </no-ssr>
            </div>
        </div>

        <div class="chart-page__select-container">
            <header class="chart-page__select-header">
                <h1>
                    Select cars
                    <button v-on:click="car_selection = {}">Clear</button>
                </h1>
            </header>


            <div class="chart-page__select-items">
                <div class="chart-page__select-items-section">
                    <h1>NGP</h1>
                    <div v-for="car_name in cars_available_ngp" :key="car_name">
                        <input :id="car_name + '_checkbox'" type="checkbox" v-model="car_selection[car_name]"/>
                        <label :for="car_name + '_checkbox'">{{ car_name }}</label>
                    </div>
                </div>
                <div class="chart-page__select-items-section">
                    <h1>Non-NGP</h1>
                    <div v-for="car_name in cars_available_non_ngp" :key="car_name">
                        <input :id="car_name + '_checkbox'" type="checkbox" v-model="car_selection[car_name]"/>
                        <label :for="car_name + '_checkbox'">{{ car_name }}</label>
                    </div>
                </div>
            </div>
        </div>



    </article>
</template>

<script>
import cars_by_month from '@/assets/cars_popular_by_month.json'
import chartOptions from '@/components/chart-options'

let car_selection_backup = {}

export default {
    data() {
        return {
            chartOptions,
            car_selection: {}
        }
    },

    head() {
        return {
            title: 'Cars - Popular by month'
        }
    },

    computed: {
        cars_available_ngp: function() {
            return Object.keys( cars_by_month ).filter( key => cars_by_month[key].is_ngp ).sort()
        },

        cars_available_non_ngp: function() {
            return Object.keys( cars_by_month ).filter( key => !cars_by_month[key].is_ngp ).sort()
        },

        chart_data: function() {
            return Object.keys( this.car_selection )
                .filter( key => this.car_selection[key] === true )
                .map( car => ( {
                    name: car,
                    data: cars_by_month[car].data
                } ) )
        }
    },

    destroyed() {
        car_selection_backup = this.car_selection
    },

    mounted() {
        this.car_selection = car_selection_backup
    }
}
</script>