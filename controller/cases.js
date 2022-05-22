
module.exports = {
    cases: (data, db) => {
        let text = data.request.get.text;
        if (text) {
            return {
                status: 200,
                page: 'cases.hbs',
                frontmatter: {
                    text: text
                }
            };
        } else {
            return {
                status: 400,
                text: "Expected parameter 'test'!"
            }
        }

    }
}