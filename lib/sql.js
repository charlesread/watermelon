'use srict'

module.exports = {
  faq: {
    getAll: 'select * from faq where inactive is null'
  },
  phone: {
    insert: 'update user set phone = ? where id = ?'
  },
  place: {
    getAll: 'select * from place'
  },
  rsvp: {
    get: {
      by: {
        userId: 'select * from rsvp where user_id = ?'
      }
    }
  },
  sms: {
    in: {
      admin: {
        stats: {
          count: 'select count(1) cnt from ??'
        }
      }
    }
  },
  user: {
    get: {
      by: {
        id: 'select * from user where id = ?',
        fbId: 'select * from user where fb_id = ?'
      }
    },
    insert: 'insert into user (first_name, last_name, email, fb_id) values (?, ?, ?, ?)'
  }
}