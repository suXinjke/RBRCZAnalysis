<template>
    <div class="records-table">
        <div class="records-table__controls">
            <div class="select-input">
                <label>Physics</label>
                <select v-model="selected_physics">
                    <option v-for="physics in available_physics" :key="physics">
                        {{ physics }}
                    </option>
                </select>
            </div>

            <div class="select-input">
                <label>Car class</label>
                <select v-model="selected_car_class">
                    <option v-for="car_class in available_car_classes" :key="car_class">
                        {{ car_class }}
                    </option>
                </select>
            </div>

            <div class="select-input">
                <label>Surface</label>
                <select v-model="selected_surface_type">
                    <option v-for="surface_type in available_surface_types" :key="surface_type" :value="surface_type">
                        {{ surfaceTypeToString( surface_type ) }}
                    </option>
                </select>
            </div>

            <div class="select-input">
                <label>Surface</label>
                <select v-model="selected_surface_age">
                    <option v-for="surface_age in available_surface_ages" :key="surface_age" :value="surface_age">
                        {{ surfaceAgeToString( surface_age ) }}
                    </option>
                </select>
            </div>
        </div>
        <table>
            <thead><tr>
                <td>#</td>
                <td>Driver</td>
                <td>Car</td>
                <td>Surface</td>
                <td>Tyres</td>
                <td>Time</td>
            </tr></thead>

            <tbody>
                <tr v-for="( pb, index ) in pbs_filtered" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div>
                        <a :href="`https://rbr.onlineracing.cz/index.php?act=ustats&u=${pb.driver_id}`">{{ pb.driver_name }}</a>
                        </div>
                        <abbr v-if="pb.comment" :title="pb.comment"><small>commentary</small></abbr>
                    </td>
                    <td>
                        <div>{{ pb.physics_name }} / {{ pb.car_class }}</div>
                        <div>{{ pb.car_name }}</div>
                    </td>
                    <td>
                        <div>{{ surfaceTypeToString( pb.surface_type_id ) }}</div>
                        <div>{{ surfaceAgeToString( pb.surface_age_id ) }}</div>
                    </td>
                    <td>{{ tyresIdToString( pb.tyres_id ) }}</td>
                    <td>
                        <a :href="`https://rbr.onlineracing.cz/index.php?act=tourmntres2&torid=${pb.tournament_id}&stage=${Number( pb.stage_index ) + 1}`">{{ pb.record }}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            selected_physics: '',
            selected_car_class: '',
            selected_surface_type: '',
            selected_surface_age: ''
        }
    },

    props: {
        pbs: Array
    },

    methods: {
        msecFromString: function( value ) {
            const [ minutes, seconds, msecs ] = value.split( /[:.]/ ).map( str => Number( str ) )

            return ( minutes * 60 * 1000 ) + ( seconds * 1000 ) + msecs
        },

        physicsMatches: function( pb ) {
            return (
                this.selected_physics === 'All base' ? !pb.physics_name.includes( 'NGP' ) :
                this.selected_physics === 'All NGP' ? pb.physics_name.includes( 'NGP' ) :
                this.selected_physics === 'All' || pb.physics_name === this.selected_physics
            )
        },

        tyresIdToString: function( id ) {
            return (
                id === '0' ? 'Dry tarmac' :
                id === '1' ? 'Damp tarmac' :
                id === '2' ? 'Wet tarmac' :
                id === '3' ? 'Dry gravel' :
                id === '4' ? 'Intermediate gravel' :
                id === '5' ? 'Wet gravel' :
                'Snow'
            )
        },

        surfaceTypeToString: function( id ) {
            if ( id === 'All' ) {
                return 'All'
            }

            return (
                id === '0' ? 'Dry' :
                id === '1' ? 'Damp' :
                'Wet'
            )
        },

        surfaceAgeToString: function( id ) {
            if ( id === 'All' ) {
                return 'All'
            }

            return (
                id === '0' ? 'New' :
                id === '1' ? 'Normal' :
                'Worn'
            )
        }

    },

    computed: {
        track_ids: function() {
            return track_ids
        },


        available_physics: function() {
            return [
                'All',
                'All base',
                'All NGP',
                ...new Set( this.pbs.map( pb => pb.physics_name ) )
            ]
        },

        available_car_classes: function() {
            return [ 'All', ...new Set( this.pbs
                .filter( pb => (
                    this.selected_physics === 'All' ? true :
                    this.selected_physics === 'All NGP' ? pb.physics_name.startsWith( 'NGP' ) :
                    this.selected_physics === 'All base' ? !pb.physics_name.startsWith( 'NGP' ) :
                    pb.physics_name === this.selected_physics
                ) )
                .map( pb => pb.car_class )
            ) ]
        },

        available_surface_types: function() {
            return [ 'All', ...new Set( this.pbs
                .filter( pb => this.physicsMatches( pb ) )
                .map( pb => pb.surface_type_id )
            ) ]
        },

        available_surface_ages: function() {
            return [ 'All', ...new Set( this.pbs
                .filter( pb => this.physicsMatches( pb ) )
                .map( pb => pb.surface_age_id )
            ) ]
        },

        pbs_filtered: function() {
            return this.pbs
                .filter( pb => {
                    return this.physicsMatches( pb ) &&
                    ( this.selected_car_class === 'All' || pb.car_class === this.selected_car_class ) &&
                    ( this.selected_surface_type === 'All' || pb.surface_type_id === this.selected_surface_type ) &&
                    ( this.selected_surface_age === 'All' || pb.surface_age_id === this.selected_surface_age )
                } )
                .sort( ( a, b ) => {
                    return this.msecFromString( a.record ) > this.msecFromString( b.record )
                } )
        }
    },

    watch: {
        pbs: {
            immediate: true,
            handler: function() {

                if ( this.pbs_filtered.length <= 0 ) {
                    if ( this.available_physics.includes( 'NGP Physics 5.0.1' ) ) {
                        this.selected_physics = 'NGP Physics 5.0.1'
                    } else if ( this.available_physics.includes( 'Base physic' ) ) {
                        this.selected_physics = 'Base physic'
                    } else {
                        this.selected_physics = this.available_physics[0]
                    }

                    this.selected_surface_type = this.available_surface_types[1]
                    this.selected_surface_age = this.available_surface_ages[1]
                }

            }
        },

        selected_physics: function() {
            if ( this.available_car_classes.includes( 'RC1' ) ) {
                this.selected_car_class = 'RC1'
            } else if ( this.available_car_classes.includes( 'WRC' ) ) {
                this.selected_car_class = 'WRC'
            } else {
                this.selected_car_class = this.available_car_classes[0]
            }
        }
    }
}
</script>

<style lang="scss">
.records-table {
    &__controls {
        display: flex;
    }

    .select-input {
        flex: 1;
    }

    table {
        width: 100%;

        thead {
            font-weight: bold;
        }
    }

    td {
        vertical-align: top;
    }

    td:nth-child(1) {
        text-align: right;
        font-weight: bold;
    }

    td:nth-child(2) {
        width: 30%;
    }

    td:nth-child(3) {
        width: 30%;
    }
}
</style>