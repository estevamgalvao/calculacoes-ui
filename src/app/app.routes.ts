import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home/home.page';
import { TestPage } from './features/home/pages/test/test.page';

export const routes: Routes = [
  
    {path: '', component: HomePage},
    {path: 'test', component: TestPage}
    
];
