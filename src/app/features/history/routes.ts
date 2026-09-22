import { Routes } from "@angular/router";
import { History } from "./pages/history/history";
import { PurchaseHistoryService } from "./pruchace.service";

export const routes: Routes = [
    {
        path: '',
        component: History,
        providers: [PurchaseHistoryService],
    },
];