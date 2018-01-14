'use strict'

module.exports = {
  faq: {
    getAll: 'select * from faq where inactive is null'
  },
  phone: {
    insert: 'update user_auth0 set phone = ? where id = ?'
  },
  place: {
    getAll: 'select a.*, GROUP_CONCAT(DISTINCT c.description separator \', \') types from place a left join place_place_type b on a.id = b.place_id left join place_type c on b.place_type_id = c.id group by a.id, a.name, a.address1, a.address2, a.lat, a.long, a.note'
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
        rsvpUserId: 'select b.*, c.description from rsvp a join rsvp_person b on a.id = b.rsvp_id left join rsvp_meal_type c on b.rsvp_meal_type_id = c.id where a.user_id = ? order by b.id asc'
      }
    },
    insert: 'insert into rsvp_person (rsvp_id, first_name, last_name, user_id, rsvp_meal_type_id, considerations, event_friday, event_saturday, event_sunday) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        id: 'select * from user_auth0 where id = ?',
        sub: 'select * from user_auth0 where sub = ?'
      }
    },
    insert: 'insert into user_auth0 (first_name, last_name, email, sub) values (?, ?, ?, ?)'
  }
}