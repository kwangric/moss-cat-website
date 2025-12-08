module.exports = function (eleventyConfig) {
    eleventyConfig.addTransform("drafts", function (content) {
        if (this.page.data.draft && process.env.ELEVENTY_ENV === "production") {
            return false
        }
        return content
    })

    eleventyConfig.addPassthroughCopy("styles.css")
    eleventyConfig.addPassthroughCopy("script.js")
    
    eleventyConfig.addPassthroughCopy("CNAME")
    eleventyConfig.addPassthroughCopy("favicon.ico")
    eleventyConfig.addPassthroughCopy("og-image.png")
    eleventyConfig.addPassthroughCopy("robots.txt")

    return {
        dir: {
            input: ".",
            output: "_site"
        }
    }
}