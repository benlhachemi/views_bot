const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const ua = require('puppeteer-extra-plugin-anonymize-ua')
const useProxy = require('puppeteer-page-proxy')
const pluginProxy = require('puppeteer-extra-plugin-proxy')

puppeteer.use(StealthPlugin())


puppeteer.use(ua())
/*puppeteer.use(pluginProxy({
    address: 'geo.iproyal.com',
    port: 12323,
    credentials: {
        username: 'zalex',
        password: 'souhailosse',
    }
}))*/

//functions
const search_youtube = async(page,keyword, video_id) => {
    const yt_direct_links = ['https://m.youtube.com', 'https://youtube.com', 'http://youtube.com', 'http://www.youtube.com']
    const yt_keyword_links = [`https://www.youtube.com/results?search_query=${keyword}&page=&utm_source=opensearch`, `https://www.youtube.com/results?search_query=${keyword}`]
    //const n = Math.floor(Math.random()*2)
    const n = 2
    if(!n){
        //YOUTUBE DIRECT LINK
        await page.goto(yt_direct_links[Math.floor(Math.random()*yt_direct_links.length)])
        await page.waitForTimeout(3000)
        await page.waitForSelector('#search-form')
        .then(async() => {
            await page.click('#search-form')
            await page.keyboard.type(keyword)
            await page.keyboard.press('Enter')
            search_video(page, video_id)
        })
    }
    else if(n == 2){
        //YOUTUBE KEYWORD FROM LINK
        await page.goto(yt_keyword_links[Math.floor(Math.random()*yt_keyword_links.length)])
        await page.waitForSelector('ytd-video-renderer')
        search_video(page, video_id)
    }

    else{
        //YOUTUBE TROUGH GOOGLE
        await page.goto('https://google.com')
        await page.waitForSelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input')
        .then(async() => {
            await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input')
            await page.keyboard.type('Youtube')
            await page.keyboard.press('Enter')
            await page.waitForSelector('#top_nav')
            .then(async() => {
                for(let i=0; i<22; i++){
                    await page.keyboard.press('Tab')
                    await page.waitForTimeout(100)
                }
                await page.keyboard.press('Enter')
                await page.waitForTimeout(5000)
                await page.waitForSelector('#search')
                .then(async() => {
                    await page.click('#search-form')
                    await page.keyboard.type(keyword)
                    await page.keyboard.press('Enter')
                    search_video(page, video_id)
                })
            })
        })
    }
}

const search_video = async(page, video_id) => {
    await page.evaluate(async() => {
        window.scroll(0, 8000)
    })
    await page.waitForTimeout(2000)
    await page.evaluate(async() => {
        window.scroll(0, 16000)
    })
    await page.waitForTimeout(2000)
    await page.evaluate(async() => {
        window.scroll(0, 24000)
    })
    await page.waitForTimeout(2000)
    await page.evaluate(async() => {
        window.scroll(0, 32000)
    })
    await page.waitForTimeout(2000)
    await page.evaluate(async() => {
        window.scroll(0, 32000)
    })
    await page.waitForTimeout(2000)
    const videos = await page.$$('ytd-video-renderer')
    let ids = []
    for( let video of videos ) {
        let attr = await page.evaluate(el => el.querySelector('a').getAttribute("href"), video)
        ids.push(attr = attr.split('=')[1])
    }
    let found = false
    let position = 0
    ids.forEach((id, i) => {
        if(!found){
            if(id == video_id){
                found = true
                position = i
            }
        }
        if(found) return 0
    })
    if(!found){
        console.log('your video was not found on the first 100 video')
        return 0
    }
    console.log(`your video was found on position ${position}`)
    await page.click(`a[href='/watch?v=${video_id}']`)
}


const launch_browser = async() => {
    const settings = {
        headless: false,
        args: [
            '--disable-infobars',
            '--window-size=1400,900',
        ],
        ignoreHTTPSErrors: true,
        slowMo: 0,
        ignoreDefaultArgs: ["--enable-automation"]
    }
    const browser = await puppeteer.launch(settings)
    const page = await browser.newPage()
    search_youtube(page,'التجسس على السناب ', 'ZBlqXwChBbE')
}

launch_browser()