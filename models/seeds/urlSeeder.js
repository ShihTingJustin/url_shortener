const mongoose = require('mongoose')
const URL = require('../urls')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected! run seeder...')
  URL.create(
    {
      origin: 'https://www.mercedes-benz.com.tw/passengercars.html?group=all&subgroup=see-all&view=BODYTYPE',
      shorten: '23hwF',
      click: 6208,
      img: 'https://www.mercedes-benz.com.tw/passengercars/_jcr_content/image.MQ6.2.2x.20200529093409.png',
      title: 'Mercedes-Benz 轎車',
      description: '將豪華品質、運動風格與優異性能合為一體。無論是轎車、旅行車、轎跑車、Cabrio、敞篷跑車、運動休旅車（SUV）或更多。體驗 Mercedes-Benz 產品。',
      domain: 'mercedes-benz.com.tw'
    },
    {
      origin: 'https://www.ferrari.com/en-US',
      shorten: '87q1b',
      click: 4888,
      img: 'https://api.ferrarinetwork.ferrari.com/v2/network-content/medias/resize/5cb0894c9732770a7a80846b-ferrari-sharing_dtwouwjk?apikey=9QscUiwr5n0NhOuQb463QEKghPrVlpaF&width=1080',
      title: 'Official Ferrari website',
      description: 'All the official Ferrari brand content: dedicated websites for our cars, sporting activities and official products from the Store',
      domain: 'ferrari.com'
    },
    {
      origin: 'https://www.mclaren.com/',
      shorten: '0a5EA',
      click: 765,
      img: 'https://media-cdn.mclaren.com/media/images/misc/_1ST0169.jpg',
      title: 'The Official McLaren Website – McLaren.com',
      description: 'Latest news from McLaren Racing, McLaren Automotive, McLaren Applied, McLaren esports and McLaren Careers.',
      domain: 'mclaren.com'
    }
  )
  console.log('done!')
})