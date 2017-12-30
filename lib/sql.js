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
    },
    insert: 'insert into rsvp (user_id, attend) values (?, ?)',
    update: 'update rsvp set attend = ? where user_id = ? and id = ?'
  },
  rsvpPerson: {
    delete: 'delete from rsvp_person where id = ?',
    get: {
      by: {
        id: 'select * from rsvp_person where id = ?',
        userId: 'select * from rsvp_person where user_id = ?',
        rsvpUserId: 'select b.*, c.description from rsvp a join rsvp_person b on a.id = b.rsvp_id left join rsvp_meal_type c on b.rsvp_meal_type_id = c.id where a.user_id = ?'
      }
    },
    insert: 'insert into rsvp_person (rsvp_id, first_name, last_name, user_id, rsvp_meal_type_id, kiddo, considerations) values (?, ?, ?, ?, ?, ?, ?)',
    update: 'update rsvp_person set rsvp_meal_type_id = ?, considerations = ? where user_id = ?'
  },
  rsvpMealType: {
    getAll: 'select * from rsvp_meal_type'
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