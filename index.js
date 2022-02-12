//imports
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const ua = require('puppeteer-extra-plugin-anonymize-ua')
const useProxy = require('puppeteer-page-proxy')
const pluginProxy = require('puppeteer-extra-plugin-proxy')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const Axios = require('axios')
const user_agents = require('user-agent-array')

//variables
const keyword = 'التجسس على حساب أنستا'
const id = 'wTklWyeQBOs'

//defines
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())
puppeteer.use(pluginProxy({
    address: 'rotating.proxy-spider.com',
    port: 1400,
    credentials: {
        username: '',
        password: '',
    }
}))
var timezones = [
    'Europe/Andorra',
    'Asia/Dubai',
    'Asia/Kabul',
    'Europe/Tirane',
    'Asia/Yerevan',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba',
    'America/Argentina/Salta',
    'America/Argentina/Jujuy',
    'America/Argentina/Tucuman',
    'America/Argentina/Catamarca',
    'America/Argentina/La_Rioja',
    'America/Argentina/San_Juan',
    'America/Argentina/Mendoza',
    'America/Argentina/San_Luis',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Ushuaia',
    'Pacific/Pago_Pago',
    'Europe/Vienna',
    'Australia/Lord_Howe',
    'Antarctica/Macquarie',
    'Australia/Hobart',
    'Australia/Currie',
    'Australia/Melbourne',
    'Australia/Sydney',
    'Australia/Broken_Hill',
    'Australia/Brisbane',
    'Australia/Lindeman',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Perth',
    'Australia/Eucla',
    'Asia/Baku',
    'America/Barbados',
    'Asia/Dhaka',
    'Europe/Brussels',
    'Europe/Sofia',
    'Atlantic/Bermuda',
    'Asia/Brunei',
    'America/La_Paz',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Sao_Paulo',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Santarem',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
    'America/Nassau',
    'Asia/Thimphu',
    'Europe/Minsk',
    'America/Belize',
    'America/St_Johns',
    'America/Halifax',
    'America/Glace_Bay',
    'America/Moncton',
    'America/Goose_Bay',
    'America/Blanc-Sablon',
    'America/Toronto',
    'America/Nipigon',
    'America/Thunder_Bay',
    'America/Iqaluit',
    'America/Pangnirtung',
    'America/Atikokan',
    'America/Winnipeg',
    'America/Rainy_River',
    'America/Resolute',
    'America/Rankin_Inlet',
    'America/Regina',
    'America/Swift_Current',
    'America/Edmonton',
    'America/Cambridge_Bay',
    'America/Yellowknife',
    'America/Inuvik',
    'America/Creston',
    'America/Dawson_Creek',
    'America/Fort_Nelson',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Dawson',
    'Indian/Cocos',
    'Europe/Zurich',
    'Africa/Abidjan',
    'Pacific/Rarotonga',
    'America/Santiago',
    'America/Punta_Arenas',
    'Pacific/Easter',
    'Asia/Shanghai',
    'Asia/Urumqi',
    'America/Bogota',
    'America/Costa_Rica',
    'America/Havana',
    'Atlantic/Cape_Verde',
    'America/Curacao',
    'Indian/Christmas',
    'Asia/Nicosia',
    'Asia/Famagusta',
    'Europe/Prague',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'America/Santo_Domingo',
    'Africa/Algiers',
    'America/Guayaquil',
    'Pacific/Galapagos',
    'Europe/Tallinn',
    'Africa/Cairo',
    'Africa/El_Aaiun',
    'Europe/Madrid',
    'Africa/Ceuta',
    'Atlantic/Canary',
    'Europe/Helsinki',
    'Pacific/Fiji',
    'Atlantic/Stanley',
    'Pacific/Chuuk',
    'Pacific/Pohnpei',
    'Pacific/Kosrae',
    'Atlantic/Faroe',
    'Europe/Paris',
    'Europe/London',
    'Asia/Tbilisi',
    'America/Cayenne',
    'Africa/Accra',
    'Europe/Gibraltar',
    'America/Godthab',
    'America/Danmarkshavn',
    'America/Scoresbysund',
    'America/Thule',
    'Europe/Athens',
    'Atlantic/South_Georgia',
    'America/Guatemala',
    'Pacific/Guam',
    'Africa/Bissau',
    'America/Guyana',
    'Asia/Hong_Kong',
    'America/Tegucigalpa',
    'America/Port-au-Prince',
    'Europe/Budapest',
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Europe/Dublin',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Indian/Chagos',
    'Asia/Baghdad',
    'Asia/Tehran',
    'Atlantic/Reykjavik',
    'Europe/Rome',
    'America/Jamaica',
    'Asia/Amman',
    'Asia/Tokyo',
    'Africa/Nairobi',
    'Asia/Bishkek',
    'Pacific/Tarawa',
    'Pacific/Enderbury',
    'Pacific/Kiritimati',
    'Asia/Pyongyang',
    'Asia/Seoul',
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Atyrau',
    'Asia/Oral',
    'Asia/Beirut',
    'Asia/Colombo',
    'Africa/Monrovia',
    'Europe/Vilnius',
    'Europe/Luxembourg',
    'Europe/Riga',
    'Africa/Tripoli',
    'Africa/Casablanca',
    'Europe/Monaco',
    'Europe/Chisinau',
    'Pacific/Majuro',
    'Pacific/Kwajalein',
    'Asia/Yangon',
    'Asia/Ulaanbaatar',
    'Asia/Hovd',
    'Asia/Choibalsan',
    'Asia/Macau',
    'America/Martinique',
    'Europe/Malta',
    'Indian/Mauritius',
    'Indian/Maldives',
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Bahia_Banderas',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Africa/Maputo',
    'Africa/Windhoek',
    'Pacific/Noumea',
    'Pacific/Norfolk',
    'Africa/Lagos',
    'America/Managua',
    'Europe/Amsterdam',
    'Europe/Oslo',
    'Asia/Kathmandu',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'America/Panama',
    'America/Lima',
    'Pacific/Tahiti',
    'Pacific/Marquesas',
    'Pacific/Gambier',
    'Pacific/Port_Moresby',
    'Pacific/Bougainville',
    'Asia/Manila',
    'Asia/Karachi',
    'Europe/Warsaw',
    'America/Miquelon',
    'Pacific/Pitcairn',
    'America/Puerto_Rico',
    'Asia/Gaza',
    'Asia/Hebron',
    'Europe/Lisbon',
    'Atlantic/Madeira',
    'Atlantic/Azores',
    'Pacific/Palau',
    'America/Asuncion',
    'Asia/Qatar',
    'Indian/Reunion',
    'Europe/Bucharest',
    'Europe/Belgrade',
    'Europe/Kaliningrad',
    'Europe/Moscow',
    'Europe/Simferopol',
    'Europe/Kirov',
    'Europe/Astrakhan',
    'Europe/Volgograd',
    'Europe/Saratov',
    'Europe/Ulyanovsk',
    'Europe/Samara',
    'Asia/Yekaterinburg',
    'Asia/Omsk',
    'Asia/Novosibirsk',
    'Asia/Barnaul',
    'Asia/Tomsk',
    'Asia/Novokuznetsk',
    'Asia/Krasnoyarsk',
    'Asia/Irkutsk',
    'Asia/Chita',
    'Asia/Yakutsk',
    'Asia/Khandyga',
    'Asia/Vladivostok',
    'Asia/Ust-Nera',
    'Asia/Magadan',
    'Asia/Sakhalin',
    'Asia/Srednekolymsk',
    'Asia/Kamchatka',
    'Asia/Anadyr',
    'Asia/Riyadh',
    'Pacific/Guadalcanal',
    'Indian/Mahe',
    'Africa/Khartoum',
    'Europe/Stockholm',
    'Asia/Singapore',
    'America/Paramaribo',
    'Africa/Juba',
    'Africa/Sao_Tome',
    'America/El_Salvador',
    'Asia/Damascus',
    'America/Grand_Turk',
    'Africa/Ndjamena',
    'Indian/Kerguelen',
    'Asia/Bangkok',
    'Asia/Dushanbe',
    'Pacific/Fakaofo',
    'Asia/Dili',
    'Asia/Ashgabat',
    'Africa/Tunis',
    'Pacific/Tongatapu',
    'Europe/Istanbul',
    'America/Port_of_Spain',
    'Pacific/Funafuti',
    'Asia/Taipei',
    'Europe/Kiev',
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Pacific/Wake',
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu',
    'America/Montevideo',
    'Asia/Samarkand',
    'Asia/Tashkent',
    'America/Caracas',
    'Asia/Ho_Chi_Minh',
    'Pacific/Efate',
    'Pacific/Wallis',
    'Pacific/Apia',
    'Africa/Johannesburg'
]

//functions
const search_youtube_month = async(page,keyword, video_id) => {
    //YOUTUBE KEYWORD FROM LINK
    console.log('opening YOUTUBE website')
    await page.goto(`https://www.youtube.com/results?search_query=${keyword}&sp=EgIIBA%253D%253D`).catch(err => {return false})
    await page.waitForSelector('ytd-video-renderer').catch(err => {return false})
    let pop_up = await page.$('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('pop_up : ' + pop_up)
    if(pop_up) await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('Searching for your video ...')
    const res = await search_video(page, video_id)
    if(res) return true
    return false
}

const search_youtube_week = async(page,keyword, video_id) => {
    //YOUTUBE KEYWORD FROM LINK
    console.log('opening YOUTUBE website')
    await page.goto(`https://www.youtube.com/results?search_query=${keyword}&sp=EgQIAxAB`).catch(err => {return false})
    await page.waitForSelector('ytd-video-renderer').catch(err => {return false})
    let pop_up = await page.$('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('pop_up : ' + pop_up)
    if(pop_up) await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('Searching for your video ...')
    const res = await search_video(page, video_id)
    if(res) return true
    return false
}

const search_youtube_day = async(page,keyword, video_id) => {
    //YOUTUBE KEYWORD FROM LINK
    console.log('opening YOUTUBE website')
    await page.goto(`https://www.youtube.com/results?search_query=${keyword}&sp=EgQIAhAB`).catch(err => {return false})
    await page.waitForSelector('ytd-video-renderer').catch(err => {return false})
    let pop_up = await page.$('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('pop_up : ' + pop_up)
    if(pop_up) await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
    console.log('Searching for your video ...')
    const res = await search_video(page, video_id)
    if(res) return true
    return false
}

const search_youtube = async(page,keyword, video_id) => {
    const yt_direct_links = ['https://m.youtube.com', 'https://youtube.com', 'http://youtube.com', 'http://www.youtube.com']
    const yt_keyword_links = [`https://www.youtube.com/results?search_query=${keyword}&page=&utm_source=opensearch`, `https://www.youtube.com/results?search_query=${keyword}`]
    const n = 1
    if(!n){
        //YOUTUBE DIRECT LINK
        await page.goto(yt_direct_links[Math.floor(Math.random()*yt_direct_links.length)]).catch(err => {return false})
        console.log('opening youtube home page')
        await page.waitForTimeout(3000)
        await page.waitForSelector('#search-form')
        let pop_up = await page.$('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
        console.log('pop_up : ' + pop_up)
        if(pop_up) await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
        
        await page.click('#search-form')
        await page.keyboard.type(keyword)
        await page.keyboard.press('Enter')
        console.log('Searching for your video ...')
        const res = await search_video(page, video_id)
        if(res) return true
        return false
        
    }
    else if(n == 1){
        //YOUTUBE KEYWORD FROM LINK
        console.log('opening YOUTUBE website')
        await page.goto(`https://www.youtube.com/results?search_query=${keyword}`).catch(err => {return false})
        await page.waitForSelector('ytd-video-renderer').catch(err => {return false})
        let pop_up = await page.$('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
        console.log('pop_up : ' + pop_up)
        if(pop_up) await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.footer.style-scope.ytd-consent-bump-v2-lightbox > div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:nth-child(2) > a')
        console.log('Searching for your video ...')
        const res = await search_video(page, video_id)
        if(res) return true
        return false
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
                    await search_video(page, video_id).then(res => {
                        if(res) return true
                        return false
                    })
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
    const videos = await page.$$('ytd-video-renderer').catch(err => {return false})
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
                position = i + 1
            }
        }
        if(found) return 0
    })
    if(!found){
        console.log('your video was not found on the first 100 video')
        return false
    }
    console.log(`your video was found on position ${position}`)
    await page.click(`a[href='/watch?v=${video_id}']`)
    return true
}

const watch_video = async(page) => {
    await page.waitForTimeout(10000)
    await page.waitForSelector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-duration')
    .catch(err => {return false})
    const video_duration_container = await page.$('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-duration').catch(err => {return false})
    let video_duration = ''
    if(video_duration_container != null) {video_duration = await page.evaluate(el => el.textContent, video_duration_container)}
    else return false
    let video_duration_array = video_duration.split(':')
    let video_duration_sec = parseInt(video_duration_array[0]) *60 + parseInt(video_duration_array[1])
    console.log(`your video duration is ${video_duration_sec} seconds (${video_duration})`)
    const watch_time = Math.floor(Math.random()* (video_duration_sec - (video_duration_sec - video_duration_sec/4)) + (video_duration_sec - video_duration_sec/4))
    const retention = Math.floor((watch_time/video_duration_sec)*100)
    console.log(`watching ${watch_time} seconds of your video (${retention}% Retention)`)
    await page.waitForTimeout(watch_time*1000)
    return true
}


const launch_browser = async() => {
    const settings = {
        headless: true,
        userDataDir: './myUserDataDir',
        args: [
            '--disable-infobars',
            '--window-size=1400,900',
            `--user-agent=${user_agents[Math.floor((Math.random()*user_agents.length)) - 1]}`,
        ],
        ignoreHTTPSErrors: true,
        slowMo: 0,
        ignoreDefaultArgs: ["--enable-automation"]
    }
    const browser = await puppeteer.launch(settings)
    console.log('launching new browser')
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(200000)
    await page.emulateTimezone(timezones[Math.floor((Math.random()*timezones.length)) - 1])
    await page.setViewport({
        width: Math.floor(Math.random() * 1920 + 500),
        height: Math.floor(Math.random() * 1080 + 500),
        deviceScaleFactor: 1,
        isMobile: Math.floor(Math.random() * 1) == 1 ? true : false,
        hasTouch: Math.floor(Math.random() * 1) == 1 ? true : false,
        isLandscape: Math.floor(Math.random() * 1) == 1 ? true : false,
    })
    await page.evaluateOnNewDocument(()=>{
        //browser values
        let platforms = ['MacIntel', 'Win32', 'FreeBSD i386', 'WebTV OS', 'iPhone', 'MacPPC', 'Mac68K', 'FreeBSD', 'FreeBSD amd64', 'Linux', 'Linux aarch64', 'Linux armv6l', 'Linux armv7l', 'Linux armv8l', 'Linux i686', 'Linux x86_64', 'PlayStation 4', 'Linux ppc64']
        let device_memory = ['1', '2', '4', '8', '12', '16', '32']
        let CPU = ['1', '2', '4', '8', '12', '16']
        let vendors = ['Google Inc.', 'Apple Computer, Inc.', '']
        let lang = ["af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM",
        "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg",
        "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en",
        "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM",
        "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU",
        "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu", 
        "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl",
        "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb",
        "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO", 
        "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI", 
        "es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh",
        "ji", "zu"]

        Object.defineProperty(navigator.__proto__, 'deviceMemory', {
            value: device_memory[Math.floor((Math.random()*device_memory.length)) - 1]
        })

        Object.defineProperty(navigator.__proto__, 'hardwareConcurrency', {
            value: CPU[Math.floor((Math.random()*CPU.length)) - 1]
        })

        Object.defineProperty(navigator.__proto__, 'platform', {
            value: platforms[Math.floor((Math.random()*platforms.length)) - 1]
        })

        Object.defineProperty(navigator.__proto__, 'vendor', {
            value: vendors[Math.floor((Math.random()*vendors.length)) - 1]
        })

        Object.defineProperty(navigator.__proto__, 'language', {
            value: lang[Math.floor((Math.random()*lang.length)) - 1]
        })

        Object.defineProperty(navigator.__proto__, 'languages', {
            value: lang[Math.floor((Math.random()*lang.length)) - 1]
        })

    })
    const result = await search_youtube(page, keyword, id)
    console.log('result : ' + result)
    if(result) await watch_video(page)
    else{
        console.log('switching to monthly videos')
        const month = await search_youtube_month(page, keyword, id)
        if(month) await watch_video(page)
        else {
            console.log('switching to weekly videos')
            const week = await search_youtube_week(page, keyword, id)
            if(week) await watch_video(page)
            else {
                console.log('switching to daily videos')
                const daily = await search_youtube_day(page, keyword, id)
                if(daily) await watch_video(page)
                else console.log('your video was not found on daily, weekly, monthly, general videos -- probablly SHADOW BAN :( ')
            }
        }
    }
    await browser.close()
    console.log('Closing browser')
    return true
}


const run_bot = async() => {
    while(true){
        await launch_browser()
    }
}


//main
run_bot()
run_bot()
run_bot()
run_bot()
run_bot()
