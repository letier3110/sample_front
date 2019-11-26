import {
  UPDATE_SCORES,
  VALIDATE_ADMIN,
  CREATE_USER,
  ADD_EVENTS,
  ADD_USERS,
  ADD_AGES,
  ADD_DISTRICTS,
  ADD_ORGS,
  ADD_ROUTES
} from './types'

export const initialState = {
  // isAdmin: false,
  isAdmin: false,
  events: [
    {
      name: 'Соревнования по скалолазанию 2019 ноябрь',
      dateStart: '2019-11-22T12:33:50.825Z',
      dateEnd: '2019-12-23T12:33:50.825Z',
      slug: '123457',
      routes: ['1', '2', '3'],
      participants: [
        {
          slug: '1',
          scores: [
            {
              routeSlug: '1',
              score: 5,
              attempt: 1
            },
            {
              routeSlug: '2',
              score: 7,
              attempt: 1
            },
            {
              routeSlug: '3',
              score: 4,
              attempt: 2
            }
          ]
        },
        {
          slug: '2',
          scores: [
            {
              routeSlug: '1',
              score: 3,
              attempt: 3
            },
            {
              routeSlug: '2',
              score: 1,
              attempt: 4
            }
          ]
        },
        {
          slug: '3',
          scores: [
            {
              routeSlug: '1',
              score: 4,
              attempt: 3
            },
            {
              routeSlug: '2',
              score: 1,
              attempt: 4
            }
          ]
        },
        {
          slug: '4',
          scores: [
            {
              routeSlug: '1',
              score: 7,
              attempt: 3
            },
            {
              routeSlug: '2',
              score: 2,
              attempt: 4
            }
          ]
        },
        {
          slug: '5',
          scores: [
            {
              routeSlug: '1',
              score: 5,
              attempt: 3
            },
            {
              routeSlug: '2',
              score: 0,
              attempt: 4
            }
          ]
        },
        {
          slug: '6',
          scores: [
            {
              routeSlug: '1',
              score: 10,
              attempt: 3
            },
            {
              routeSlug: '2',
              score: 10,
              attempt: 4
            }
          ]
        }
      ]
    },
    {
      name: 'Соревнования по скалолазанию 2019 октябрь',
      dateStart: '2019-10-22T12:33:50.825Z',
      dateEnd: '2019-11-10T12:33:50.825Z',
      slug: '123456',
      routes: ['4', '5', '6'],
      participants: []
    }
  ],
  users: [
    {
      slug: '1',
      name: 'Ivan Sidorov',
      groupAge: '2',
      district: '2',
      organization: '2',
      gender: 'male',
      scores: []
    },
    {
      slug: '2',
      name: 'Gleb Petrov',
      groupAge: '2',
      district: '2',
      organization: '2',
      gender: 'male',
      scores: []
    },
    {
      slug: '3',
      name: 'Yuri Gagarin',
      groupAge: '2',
      district: '2',
      organization: '2',
      gender: 'male',
      scores: []
    },
    {
      slug: '4',
      name: 'Konstantin Bykov',
      groupAge: '1',
      district: '2',
      organization: '2',
      gender: 'male',
      scores: []
    },
    {
      slug: '5',
      name: 'Evhenii Kovalenko',
      groupAge: '1',
      district: '1',
      organization: '3',
      gender: 'male',
      scores: []
    },
    {
      slug: '6',
      name: 'Genadii Panasenko',
      groupAge: '1',
      district: '1',
      organization: '1',
      gender: 'male',
      scores: []
    }
  ],
  ages: [
    {
      slug: '1',
      age: '2005-2006'
    },
    {
      slug: '2',
      age: '2007-2008'
    }
  ],
  districts: [
    {
      slug: '1',
      name: 'Suvorov'
    },
    {
      slug: '2',
      name: 'Korabel'
    }
  ],
  organizations: [
    {
      slug: '1',
      name: 'School №85'
    },
    {
      slug: '2',
      name: 'School №35'
    },
    {
      slug: '3',
      name: 'School №65'
    }
  ],
  routes: [
    {
      slug: '1',
      name: '1',
      sector: '123',
      maxScore: 10
    },
    {
      slug: '2',
      name: '2',
      sector: '123',
      maxScore: 10
    },
    {
      slug: '3',
      name: '3',
      sector: '123',
      maxScore: 10
    },
    {
      slug: '4',
      name: '4',
      sector: '124',
      maxScore: 10
    },
    {
      slug: '5',
      name: '5',
      sector: '124',
      maxScore: 10
    },
    {
      slug: '6',
      name: '6',
      sector: '125',
      maxScore: 10
    }
  ],
  sectors: [
    {
      slug: '123',
      name: 'Red'
    },
    {
      slug: '124',
      name: 'Green'
    },
    {
      slug: '125',
      name: 'Blue'
    },
    {
      slug: '126',
      name: 'Black'
    }
  ]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENTS: {
      const { events } = action.payload
      return {
        ...state,
        events
      }
    }

    case ADD_USERS: {
      const { users } = action.payload
      return {
        ...state,
        users
      }
    }

    case ADD_AGES: {
      const { ages } = action.payload
      return {
        ...state,
        ages
      }
    }

    case ADD_DISTRICTS: {
      const { districts } = action.payload
      return {
        ...state,
        districts
      }
    }

    case ADD_ORGS: {
      const { organizations } = action.payload
      return {
        ...state,
        organizations
      }
    }

    case ADD_ROUTES: {
      const { routes } = action.payload
      return {
        ...state,
        routes
      }
    }

    case VALIDATE_ADMIN: {
      const { loginData } = action.payload
      let isAdmin = false
      if (loginData.login === 'admin@skalodrom.io' && loginData.password === 'zelen') {
        isAdmin = true
      }
      return {
        ...state,
        isAdmin
      }
    }

    case CREATE_USER: {
      const { userData } = action.payload
      const userSlug = state.users.length + 1 + ''

      return {
        ...state,
        users: [...state.users, { ...userData, scores: [], slug: userSlug }],
        events: state.events.map(event =>
          event.slug === userData.event
            ? {
                ...event,
                participants: [
                  ...event.participants,
                  {
                    slug: userSlug,
                    scores: event.routes.map(r => {
                      return { routeSlug: r, score: 0, attempt: 0 }
                    })
                    // [
                    //   {
                    //     routeSlug: '1',
                    //     score: 5,
                    //     attempt: 1
                    //   },
                    // ]
                  }
                ]
              }
            : event
        )
      }
    }

    case UPDATE_SCORES: {
      const { userData } = action.payload
      const userSlug = userData.slug

      return {
        ...state,
        events: state.events.map(event =>
          event.slug === userData.event
            ? {
                ...event,
                participants: event.participants.map(part =>
                  part.slug === userSlug
                    ? {
                        slug: userSlug,
                        scores: part.scores.map(r => {
                          const filterRoute = userData.scores.filter(s => s.routeSlug === r.routeSlug)
                          if (filterRoute.length > 0) {
                            return filterRoute[0]
                          } else {
                            return r
                          }
                        })
                      }
                    : part
                )
              }
            : event
        )
      }
    }

    default:
      return state
  }
}
