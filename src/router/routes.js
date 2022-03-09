// 一级路由
const Home = () =>
    import ('@/pages/Home')
const Search = () =>
    import ('@/pages/Search')
const Login = () =>
    import ('@/pages/Login')
const Register = () =>
    import ('@/pages/Register')
const Detail = () =>
    import ('@/pages/Detail')
const AddCartSuccess = () =>
    import ('@/pages/AddCartSuccess')
const ShopCart = () =>
    import ('@/pages/ShopCart')
const Trade = () =>
    import ('@/pages/Trade')
const Pay = () =>
    import ('@/pages/Pay')
const PaySuccess = () =>
    import ('@/pages/PaySuccess')
const Center = () =>
    import ('@/pages/Center')

// 二级路由
const MyOrder = () =>
    import ('@/pages/Center/myOrder')
const GroupCenter = () =>
    import ('@/pages/Center/groupOrder')

export default [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home,
        meta: { show: true }
    }, {
        path: '/shopCart',
        name: 'shopCart',
        component: ShopCart,
        meta: { show: true }
    }, {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: '/paySuccess',
        name: 'paySuccess',
        component: PaySuccess,
        meta: { show: true }
    }, {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { show: true },
        children: [{
                path: 'myOrder',
                component: MyOrder
            },
            {
                path: 'groupCenter',
                component: GroupCenter
            }, {
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    }, {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: '/addCartSuccess',
        name: 'addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    }, {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        // 在占位符后面加一个？，则params可以传递或者不传递
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    }, {
        path: '/login',
        component: Login,
        meta: { show: false }
    }, {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
]