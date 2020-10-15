/**
 * 
 * User MEdia page controller .
 */

const userMedias = require('../models/UserMedias')

exports.insertMedia = (data) => {
  return new Promise((resolve, reject) => {
  //  console.log('aa');
  data.map((item)=>{
    item.instagramId=item.user.id;
  });
    userMedias.insertMany(data, {
      ordered: true,
      upsert: true
    }, (err, success) => {
      if (err) {
        // console.log(err.result);
       
        resolve (err.result);
      }
      resolve (success);
    })
  });
};
