import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

const menus = [
  {
    path: '/ae',
    component: 'Layout',
    children: [
      {
        path: 'index',
        name: 'AE',
        component: 'AEPage',
        meta: { title: 'AE', icon: 'form' }
      }
    ] },
  {
    path: '/at',
    component: 'Layout',
    children: [
      {
        path: 'index',
        name: 'AT',
        component: 'ATPage',
        meta: { title: 'AT', icon: 'form' }
      }
    ]

  },
  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: 'Table',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: 'Tree',
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: 'Layout',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: 'Form',
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  }
]

export default [
  // mock get all routes form server
  {
    url: '/ddr/routers',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: menus
      }
    }
  },

  // mock get all roles form server
  {
    url: '/ddr/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/ddr/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/ddr/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/ddr/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
