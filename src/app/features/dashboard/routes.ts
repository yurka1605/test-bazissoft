import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { ProductsService } from "./products.service";

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        providers: [ProductsService],
    },
];