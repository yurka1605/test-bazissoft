import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { ProductsService } from "./services/products.service";
import { ProductTransferService } from "./services/product-transfer";

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        providers: [ProductsService, ProductTransferService],
    },
];