const Router = require('./router')

const links = [
    {
        name: "Cloudflare DDoS Protection", url: "https://www.cloudflare.com/ddos/"
    }, {
        name: "Cloudflare Web Application Firewall", url: "https://www.cloudflare.com/waf/"
    }, {
        name: "Cloudflare Bot Management", url: "https://www.cloudflare.com/products/bot-management/"
    }, {
        name: "Cloudflare Magic Transit", url: "https://www.cloudflare.com/magic-transit/"
    }, {
        name: "Cloudflare Rate Limiting", url: "https://www.cloudflare.com/rate-limiting/"
    }
]

const socialLinks = [
    {
        url: "https://www.linkedin.com/in/minhqpham/", svg: "https://unpkg.com/simple-icons@v3/icons/linkedin.svg"
    }, {
        url: "https://github.com/minhqpham", svg: "https://unpkg.com/simple-icons@v3/icons/github.svg"
    }, {
        url: "https://www.instagram.com/minhqpham_/", svg: "https://unpkg.com/simple-icons@v3/icons/instagram.svg"
    }
]

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handlerLinks(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(links)
    return new Response(body, init)
}

class LinksTransformer {
    constructor(links) {
        this.links = links
    }
    
    async element(element) {
        this.links.forEach((link) =>
          element.append(`<a href="${link.url}">${link.name}</a>`, { html: true })
        )
    }
}

class addSocialLinks {
    constructor(links) {
        this.links = links
    }

    async element(element) {
        element.removeAttribute("style")
        this.links.forEach((link) =>
            element.append(`<a href="${link.url}"><img height="32" width="32" src="${link.svg}"></a>`, {html: true})
        )
    }
}

class setTitle {
    constructor(title) {
        this.title = title
    }

    async element(element) {
        element.setInnerContent(this.title, {html: false})
    }
}

class setColor {
    constructor(color) {
        this.color = color
    }

    async element(element) {
        element.setAttribute("class", this.color, {html: false})
    }
}

async function handlerAll(request) {
    const response = await fetch("https://static-links-page.signalnerve.workers.dev")
    const transformer = new LinksTransformer(links)
    const social = new addSocialLinks(socialLinks)
    const title = new setTitle("Cloudflare solutions")
    const color = new setColor("bg-green-900")
    return new HTMLRewriter()
        .on("div#links", transformer)
        .on("div#social", social)
        .on("title", title)
        .on("body", color)
        .transform(response)
}


async function handleRequest(request) {
    const r = new Router()
    r.get('/links', request => handlerLinks(request))
    r.get('.*', request => handlerAll(request))

    const resp = await r.route(request)
    return resp
}
