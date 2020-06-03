import { asyncRoutes, constantRoutes, baseRoutes, asyncRouterMap, component404 } from '@/router'
import { getMenus } from '@/api/menu'
import { getToken } from '@/utils/auth'
import router from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  permission: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSION_ROUTES: (state, routes) => {
    state.permission.routes = baseRoutes.concat(routes)
    router.addRoutes(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  getRouters({ commit }) {
    return new Promise(resolve => {
      getMenus(getToken).then(response => {
        const dynamicRoute = menusToRouters(response.data)
        commit('SET_PERMISSION_ROUTES', dynamicRoute.concat(component404))
        resolve()
      })
    })
  }
}

function menusToRouters(menus) {
  const routers = []
  menus.forEach(element => {
    const newRouter = { ...element }
    // router.component = () => import(`@${name}`)
    // router.component = () => import('@' + element.component)
    newRouter.component = asyncRouterMap[element.component]
    // router.component = () => import('@' + element.component)

    if (element.children && element.children.length > 0) {
      newRouter.children = menusToRouters(element.children)
    }
    routers.push(newRouter)
  })

  return routers
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
