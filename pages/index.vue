<template>
    <article>
        <header>
            <h1>RBR CZ Analysis</h1>
        </header>

        <p>Here you can check on some <a href='https://rbr.onlineracing.cz/'>Richard Burns Rally Czech</a> analysis.</p>
        <p>Since it's beginnings in 2005, over <strong>120 000</strong> tournaments have been hosted, with over <strong>34 000 000</strong> stage results
            made by over <strong>27 000</strong> drivers.</p>
        <p>This project was made out frustation: RBR CZ does not provide <a href="https://rbr.onlineracing.cz/index.php?act=tstats&type=1">records grouped by physics</a>. This gave an incentive to practice web scraping, parsing and data analysis to extract rather interesting info and share it with the community.</p>

        <h3>Feedback</h3>
        <p>If you think something else could be analysed about RBR CZ tournaments, feel free to contact me.</p>
        <p>
            <a href="https://twitter.com/suxinjke">Twitter</a> |
            <a href="https://github.com/suXinjke/RBRCZAnalysis/issues">GitHub issues</a> |
            <a href="https://discordapp.com/invite/ATk42e8">Discord RBR Zone</a>
        </p>
    </article>
</template>

<script>
export default {
    head() {
        return {
            title: 'About'
        }
    }
}
</script>