const { Post } = require('../models');

const postdata = [
  {
    title: 'Copper should have been a better friend',
    user_id: 10,
    post_body:'Tod had a heart of gold. Copper could have been a better friend' 
  },
  {
    title: 'Toby Flenderson is the Scranton Strangler..here me out',
    user_id: 5,
    post_body:'There are several theories out there supporing this statement. Creed would be too obvious which is why he is out of the picture. ALso, we know that Toby loved Pam. and he know the scranton stranger made it on the newspaper when Cece was born.' 
  },
  {
    title: 'Bird is the word',
    user_id: 2,
    post_body:'ba ba ba bird bird bird is the word, ba ba ba bird bird bird bird is the word. ba ba ba bird bird bird is the word, ba ba ba bird bird bird bird is the word. ba ba ba bird bird bird is the word, ba ba ba bird bird bird bird is the word' 
  },
 
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
