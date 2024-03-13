<template>
    <div class="app">
        <div class="app__sidebar">
            <nav class="sidebar">
                <div class="sidebar__section">
                    <div class="sidebar__element sidebar__element_first">
                        <nuxt-link class="sidebar__link" to="/">About</nuxt-link>
                    </div>
                </div>

                <div class="sidebar__section">
                    <div class="sidebar__element sidebar__element_header">Cars</div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/cars/popular/">Popular of all time</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/cars/popular_2018/">Popular NGP of 2018</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/cars/popular_by_month/">Popular by month</nuxt-link>
                    </div>
                </div>

                <div class="sidebar__section">
                    <div class="sidebar__element sidebar__element_header">Stages</div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/stages/records/">Records</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/stages/popular/">Popular of all time</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/stages/popular_by_month/">Popular by month</nuxt-link>
                    </div>
                </div>

                <div class="sidebar__section">
                    <div class="sidebar__element sidebar__element_header">Tournaments</div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/tournaments/by_physics/">By physics</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/tournaments/deadliest/">Top 300 deadliest</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/tournaments/longest/">Top 300 longest</nuxt-link>
                    </div>
                </div>


                <div class="sidebar__section">
                    <div class="sidebar__element sidebar__element_header">Drivers</div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/drivers/by_country/">By country</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/drivers/reliability/">Reliability</nuxt-link>
                    </div>
                    <div class="sidebar__element">
                        <nuxt-link class="sidebar__link sidebar__link_sub" to="/drivers/profanity/">Profanity</nuxt-link>
                    </div>
                </div>
            </nav>
        </div>
        <section class="app__content">
            <nuxt/>
        </section>
    </div>
</template>

<style lang="scss">
@import 'normalize.css';
@import '@/assets/fonts.css';
@import '@/assets/variables.scss';

body {
    font-family: 'Aileron', 'Helvetica', 'Arial', sans-serif;

    background-color: $color_background;
    color: $color_font_primary;
}

pre {
    margin: 0;
}

.app {
    padding-left: 16px;
    padding-right: 16px;

    display: flex;

    &__sidebar {
        background-color: $color_background;

        @media ( min-width: $mobile-width ) {
            position: sticky;
            top: 0;
            height: 100vh;
            flex-basis: 140px;
            margin-right: 16px;
            overflow: auto;
        }
    }

    @media ( max-width: $mobile-width ) {
        & {
            flex-direction: column;
        }
    }

    &__content {
        flex: 1;
    }
}

.sidebar {
    display: flex;
    flex-wrap: wrap;

    &__element {
        margin: 8px 0;
    }

    @media ( min-width: $mobile-width ) {
        & {
            flex-direction: column;
        }

        &__element_first {
            margin-top: 28px;
        }

        &__link_sub {
            margin-left: 8px;
        }
    }

    @media ( max-width: $mobile-width ) {
        &__section {
            margin-right: 16px;
        }
    }

    &__element_header {
        font-weight: bold;
    }

    &__link {
        color: $color_font_primary;
        text-decoration: none;
    }

    &__link_active {
        color: $color_font_link;
    }

    &__link_sub {
        font-size: small;
    }
}

.select-input {
    label {
        display: block;
    }

    select {
        width: 100%;
    }

    &_auto-width {
        select {
            width: auto;
        }
    }
}

.chart-page {
    display: flex;

    @media ( max-width: $tablet-width ) {
        flex-direction: column-reverse;
    }

    @media ( min-width: $tablet-width ) {
        max-height: 96vh;
    }

    &__chart-container {
        flex: 1;

        display: flex;
        flex-direction: column;
    }

    &__chart {
        flex: 2;
    }

    &__select-container {
        display: flex;
        flex-direction: column;
    }

    &__select-items {
        flex: 1;
        overflow-y: auto;

        @media ( max-width: $tablet-width ) {
            display: flex;
            flex-basis: 200px;
        }
    }

    &__select-items-section {
        @media ( max-width: $tablet-width ) {
            flex-basis: 300px;
        }
    }
}
</style>