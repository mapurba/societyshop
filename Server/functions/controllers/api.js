const { promisify } = require('util');
const request = require('request');
const cheerio = require('cheerio');
const graph = require('fbgraph');
const userMedias = require('../controllers/userMedias')
const ig = require('instagram-node').instagram();
// const { Venues, Users } = require('node-foursquare')({
//   secrets: {
//     clientId: process.env.FOURSQUARE_ID,
//     clientSecret: process.env.FOURSQUARE_SECRET,
//     redirectUrl: process.env.FOURSQUARE_REDIRECT_URL
//   },
//   foursquare: {
//     mode: 'foursquare',
//     version: 20140806,
//   }
// });

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/foursquare
 * Foursquare API example.
 */
// exports.getFoursquare = async (req, res, next) => {
//   const token = req.user.tokens.find(token => token.kind === 'foursquare');
//   try {
//     const getTrendingAsync = promisify(Venues.getTrending);
//     const getVenueAsync = promisify(Venues.getVenue);
//     const getCheckinsAsync = promisify(Users.getCheckins);
//     const trendingVenues = await getTrendingAsync('40.7222756', '-74.0022724', { limit: 50 }, token.accessToken);
//     const venueDetail = await getVenueAsync('49da74aef964a5208b5e1fe3', token.accessToken);
//     const userCheckins = await getCheckinsAsync('self', null, token.accessToken);
//     return res.render('api/foursquare', {
//       title: 'Foursquare API',
//       trendingVenues,
//       venueDetail,
//       userCheckins
//     });
//   } catch (err) {
//     return next(err);
//   }
// };


/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, profile) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile
    });
  });
};

/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = (req, res, next) => {
  request.get('https://news.ycombinator.com/', (err, request, body) => {
    if (err) { return next(err); }
    const $ = cheerio.load(body);
    const links = [];
    $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
      links.push($(element));
    });
    res.render('api/scraping', {
      title: 'Web Scraping',
      links
    });
  });
};

/**
 * GET /api/aviary
 * Aviary image processing example.
 */
exports.getAviary = (req, res) => {
  res.render('api/aviary', {
    title: 'Aviary API'
  });
};

/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });
  ig.use({ access_token: token.accessToken });
  try {
    const userSearchAsync = promisify(ig.user_search);
    const userAsync = promisify(ig.user);
    const userSelfMediaRecentAsync = promisify(ig.user_self_media_recent);
    //  const searchByUsername = await userSearchAsync('mapurba');
    // const searchByUserId = await userAsync('1326522477');
    const myRecentMedia = await userSelfMediaRecentAsync();

    res.render('api/instagram', {
      title: 'Instagram API',
      usernames: [],
      userById: [],
      myRecentMedia
    });
  } catch (error) {
    next(error);
  }
};


/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.saveInstagramImage = async (user, next) => {
  const token = user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });
  ig.use({ access_token: token.accessToken });
  try {
    console.log('gettings new photos');
    const userSelfMediaRecentAsync = promisify(ig.user_self_media_recent);
    const myRecentMedia = await userSelfMediaRecentAsync();

    let allMedia = myRecentMedia;
    const saveResult = await userMedias.insertMedia(allMedia);

  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/api/upload');
};