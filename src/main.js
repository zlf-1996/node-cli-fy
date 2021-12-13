const http = require('http');
const md5 = require('md5');

const { appId, appSecret } = require('./private.js');

const translate = word => {
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  const params = {
    q: word,
    from: 'en',
    to: 'zh',
    appid: appId,
    salt: salt,
    sign
  };
  // 将 对象转为 url 的参数
    const query = new URLSearchParams(params)

    const options = {
      hostname:  'api.fanyi.baidu.com',
      path: '/api/trans/vip/translate?'+ query,
      method: 'GET',
    }
    const req = http.request(options, response => {
        response.on('socket')
        let chunks =[]
        response.on('data', chunk =>{
          chunks.push(chunk)
        })
        response.on('end', () => {
          const string = Buffer.concat(chunks).toString()
          let object = JSON.parse(string)
          console.log(word + ":", object.trans_result[0].dst)
        })

    });

    req.on('error', (error) => {
      console.log(error)
    })
    req.end()

};

module.exports = {
  translate
};
