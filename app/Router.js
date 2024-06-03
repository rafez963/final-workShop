import { NavbarLayout } from "../app/components/navbar-layout/navbar-layout.component";
import { routes } from "./routes"
// import { navigateTo } from "./router";

export function Router(){
    const path = window.location.pathname

    if(path === '/login'  || path === '/'){
        if (localStorage.getItem('token')) {
            navigateTo('/tasks')
            return;
        }
    }

    if(path === '/'){
        if(!localStorage.getItem('token')){
            navigateTo('/login');
            return;
        }
    }

    const publicRoutes = routes.public.find(route => route.path === path)
    const privateRoutes = routes.private.find(route => route.path === path)

    if (publicRoutes) {
        publicRoutes.scene()
        return
        
    } else if (privateRoutes) {
        if (localStorage.getItem('token')) {
            const {pageContent, logic} = privateRoutes.scene();
             NavbarLayout(pageContent, logic)
            return;
        }
        navigateTo('/login')
        return;
        
    }

    navigateTo('/not-found')
}

export function navigateTo(path){
    //history api que entrega document para ingresar al historial}
    // pushState es para cambiar el estado de la variable que se encuentra arriba llamada URL
    window.history.pushState({},'',window.location.origin + path)
    Router()
}