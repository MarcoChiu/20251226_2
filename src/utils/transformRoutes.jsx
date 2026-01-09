import Auth from '../components/Auth';

export const transformRoutes = (routes) => {
    return routes.map(route => {
        if (route.isAuth) {
            route.element = <Auth>{route.element}</Auth>;
        }
        if (route.children) {
            route.children = transformRoutes(route.children);
        }
        return route;
    });
};
