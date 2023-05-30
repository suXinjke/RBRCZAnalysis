export default {
    build: {
        publicPath: '/js/',
    },
    router: {
        base: '/rbrcz_analysis/',
        prefetchLinks: false,
        linkActiveClass: '',
        linkExactActiveClass: 'sidebar__link_active'
    },

    plugins: [ { src: '~/plugins/vue-plugin-apexcharts.js', ssr: false } ],

    head: {
        titleTemplate: 'RBR CZ Analysis - %s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: 'Track records grouped by physics, car/track usage data and more' },

            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: 'RBR CZ Analysis' },
            { name: 'twitter:description', content: 'Track records grouped by physics, car/track usage data and more' },
        ],
        link: [
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css' }
        ]
    },

    modern: false,
    target: 'static'
}