'use srict'

module.exports = {
  user: {
    get: {
      by: {
        fbId: 'select * from user where fb_id = ?'
      }
    },
    insert: 'insert into user (first_name, last_name, email, fb_id) values (?, ?, ?, ?)'
  },
  rsvp: {
    get: {
      by: {
        userId: 'select * from rsvp where user_id = ?'
      }
    }
  }
}