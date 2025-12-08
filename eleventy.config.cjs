module.exports = function (eleventyConfig) {
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