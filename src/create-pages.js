const { resolve } = require('path')
const findTemplate = require('./find-template')
const defaultOptions = require('./default-options')
const cwd = process.cwd()

module.exports = async ({ graphql, boundActionCreators }, userOptions) => {
	const options = {
		...defaultOptions,
		...userOptions,
	}
	const { createPage } = boundActionCreators
	const markdownPath = resolve(cwd, options.path)
	const glob = `${markdownPath}/**`

	const content = await graphql(`{
		entries: allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					glob: "${glob}"
				}
			}
		) {
			edges {
				node {
					fileAbsolutePath
					fields{
						template
						slug
					}
				}
			}
		}
	}`)
	if(content.errors){
		console.error(content.errors)
		process.exit(1)
	}
	const { edges } = content.data.entries

	for (let i = edges.length; i--;) {
		let { fileAbsolutePath, fields } = edges[i].node
		let { template, slug } = fields

		slug = `${options.slugPath || ''}${slug}`

		let component = await findTemplate(template, options)
		createPage({
			path: slug,
			component,
			context: {
				slug,
			},
		})
	}
}