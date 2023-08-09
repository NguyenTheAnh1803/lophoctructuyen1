//Layout
import RequireAuth from '~/components/Auth/RequiedAuth';
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Source from '~/pages/Source';
import Calendar from '~/pages/Calendar';
import NewFeed from '~/pages/NewFeed';
import Profile from '~/pages/Profile';
import Settings from '~/pages/Settings';
import Room from '~/pages/Room';
import Class from '~/pages/Class';

//public route
const publicRoutes = [
    { path: '/', component: Home, auth: RequireAuth },
    { path: '/source', component: Source, auth: RequireAuth },
    { path: '/source/room/:roomName', component: Room, auth: RequireAuth },
    { path: '/calendar', component: Calendar, auth: RequireAuth },
    { path: '/profile', component: Profile, layout: HeaderOnly, auth: RequireAuth },
    { path: '/settings', component: Settings, layout: HeaderOnly, auth: RequireAuth },
    { path: '/source/room/class/:roomID', component: Class, layout: HeaderOnly, auth: RequireAuth },
    { path: '/newfeed', component: NewFeed, auth: RequireAuth },
    { path: '/login', component: Login, layout: null, auth: null },
    { path: '/register', component: Register, layout: null, auth: null },
];

// { path: '/calendar', component: Calendar, layout: HeaderOnly, auth: RequireAuth },

const privateRoutes = [];

export { publicRoutes, privateRoutes };
