import * as axios from 'axios'

export default async function handler(req, res) { 
    const { method } = req

    switch(method) {
        case 'GET':
            const gallery = await axios.get(`http://localhost:1337/api/wedding-events/1?populate=*`)
            .then(res => {
                const attributes = res.data.attributes
                return({
                    'success': true,
                    'data': [{
                        'title': attributes.title,
                        'date': attributes.date,
                        'description': attributes.description,
                        'images': attributes.Images.data.map(img => {
                            let url = ""
                            const formats = img.attributes.formats

                            if (formats.large) {
                                url = formats.large.url
                            }
                            else if (formats.medium) {
                                url = formats.medium.url
                            }
                            else if (formats.small) {
                                url = formats.small.url
                            }
                            else {
                                url = formats.thumbnail.url
                            }

                            return({
                                'url': url,
                                'alt_text': img.attributes.alternativeText
                            })
                        }),
                    }],
                    'createdAt': attributes.createdAt,
                    'updatedAt': attributes.updatedAt,
                    'publishedAt': attributes.publishedAt
                })
            })

            res.send(gallery)
            break

        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`${method} is not allowed.`)
    }
    


}

