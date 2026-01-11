import Auth from '../components/Auth';

export const transformRoutes = (routes) => {
    return routes.map(route => {
        const newRoute = { ...route };

        if (newRoute.children) {
            newRoute.children = transformRoutes(newRoute.children);
        }

        if (newRoute.isAuth) {
            newRoute.element = <Auth>{newRoute.element}</Auth>;
        }

        return newRoute;
    });
};
