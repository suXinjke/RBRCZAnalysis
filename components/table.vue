<template>
    <table :class="'table-component ' + classes">
        <thead>
            <tr>
                <td v-if="show_index" class="table-component--align-right">#</td>
                <td v-for="column in columns" :key="column.name" :class="{ 'table-component--align-right': columnHasNumbers( column ) }">
                    <span :class="{ 'table-component--sortable': column.sortable }" v-on:click="
                        if ( !column.sortable ) {
                            return
                        }

                        if ( sort_column === column.name ) {
                            sort_direction = !sort_direction
                        } else {
                            sort_column = column.name
                            sort_direction = columnHasNumbers( column ) ? false : true
                        }
                    ">
                        {{ columnHeader( column ) }}
                    </span>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="( row, index ) in dataProcessed" :key="index">
                <td v-if="show_index" class="table-component--align-right"><strong>{{ index + 1 }}</strong></td>
                <td v-for="column in columns" :key="column.name"
                    :class="{ 'table-component--align-right': columnHasNumbers( column ) }"
                    v-html="column.template ? column.template( row ) : defaultCellView( row[column.name] )"
                />
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            sort_column: this.sort_column_default,
            sort_direction: this.sort_direction_default
        }
    },

    props: {
        classes: {
            type: String,
            default: ''
        },
        columns: Array,
        data: Array,

        sort_column_default: {
            type: String,
            default: function() {
                const column = this.columns.find( column => column.sortable )
                return column ? column.name : ''
            }
        },

        sort_direction_default: {
            type: Boolean,
            default: true
        },

        show_index: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        columnHasNumbers( column ) {
            return this.dataProcessed.length > 0 && typeof this.dataProcessed[0][column.name] === 'number'
        },

        columnHeader( column ) {
            let result = column.header || column.name
            if ( column.sortable && this.sort_column === column.name ) {
                result += this.sort_direction ? '▼' : '▲'
            }
            return result
        },

        defaultCellView( value ) {
            if ( typeof value !== 'number' ) {
                return value
            }

            if ( !Number.isInteger( value ) ) {
                return value
            }

            return value.toString().split( '' ).reverse().map( ( digit, index ) => ( index + 1 ) % 3 === 0 ? ` ${digit}` : digit ).reverse().join( '' )
        }
    },

    computed: {
        dataProcessed: function() {
            const { sort_column, sort_direction } = this
            if ( !sort_column ) {
                return this.data
            }

            return this.data.sort( ( a, b ) => {
                const a_data = a[sort_column]
                const b_data = b[sort_column]
                return (
                    sort_direction ? ( a_data > b_data ) : ( a_data < b_data )
                ) ? 1 : -1
            } )
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.table-component {
    &--sortable {
        cursor: pointer;
    }

    &--align-right {
        text-align: right;
    }

    a:link {
        color: $color_font_link;
    }

    thead {
        position: sticky;
        top: 0;
        background-color: $color_background;
        z-index: 10;

        font-weight: bold;
    }

    tbody {
        max-height: 300px;
    }

    td {
        vertical-align: top;
        line-height: 1.2;
    }
}
</style>