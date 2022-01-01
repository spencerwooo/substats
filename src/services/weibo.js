/**
 * Get Info about Weibo
 *
 * @param {string} userId Weibo user ID
 */
 const fetchWeiboStat = (userId,sub,subp) => {
  // Weibo API expects a user ID
  const url = `https://weibo.com/ajax/profile/info?uid=${userId}`

  const headers = { 
    'User-Agent': 'substat-bot',
    'cookie': `SUB=${sub}; SUBP=${subp}`
  }
  return fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
    },
  })
}

const getTid = () => {
  const url = 'https://passport.weibo.com/visitor/genvisitor'
  const headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded' }
  return fetch(url,{
    body: 'cb=gen_callback&fp={"os":"1","browser":"Chrome96,0,4664,110","fonts":"undefined","screenInfo":"1536*864*24","plugins":"Portable Document Format::internal-pdf-viewer::PDF Viewer|Portable Document Format::internal-pdf-viewer::Chrome PDF Viewer|Portable Document Format::internal-pdf-viewer::Chromium PDF Viewer|Portable Document Format::internal-pdf-viewer::Microsoft Edge PDF Viewer|Portable Document Format::internal-pdf-viewer::WebKit built-in PDF"}',
    method: 'POST',
    headers,
  })
}

const getVisitorCookies = tid => {
  const url = `https://passport.weibo.com/visitor/visitor?a=incarnate&t=${tid}&w=2&c=095&gc=&cb=cross_domain&from=weibo&_rand=${Math.random()}`
  const headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  }
  return fetch(url, {
    headers,
  })
}

/**
 * Weibo API response handler
 *
 * @param {string} userId Weibo user ID
 */
export const weiboHandler = async userId => {
  const genvisitorRes = await getTid()
  const genvisitorJson = JSON.parse(((await genvisitorRes.text()).replace('window.gen_callback && gen_callback(', '')).replace(');',''))

  const visitorCookiesRes = await getVisitorCookies(genvisitorJson.data.tid)
  const visitorCookiesJson = JSON.parse(((await visitorCookiesRes.text()).replace('window.cross_domain && cross_domain(','')).replace(');',''))
  
  const response = await fetchWeiboStat(userId,visitorCookiesJson.data.sub,visitorCookiesJson.data.subp)
  const stats = await response.json()

  const res = {
    source: 'weibo',
    subs: 0,
    failed: false,
    failedMsg: '',
  }

  
  if (!stats.ok) {
    // Weibo user not found or API failed
    res.failed = true
    res.subs = 0
    res.failedMsg = stats.msg
  } else {
    // Weibo user found
    res.subs = stats.data.user.followers_count//stats.data.userInfo.followers_count
  }

  return res
}
