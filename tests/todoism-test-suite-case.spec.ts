import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { TodoAppPage } from '../pages/todo-app.page';


test.describe('Todoism test suit cases', () => {
    
    test.beforeEach(async ({ page }) => {
        const homePage: HomePage = new HomePage(page);
        const loginPage: LoginPage = new LoginPage(page);

        await homePage.openPage();
        await homePage.clickLoginButton();

        await loginPage.clickGetATestAccount();
        await loginPage.clickLoginButton();



    });

    test('Create a new task', async ({ page }) => {
        const toDoAppPage: TodoAppPage = new TodoAppPage(page);
        
        await toDoAppPage.addTaskToList();
        const taskText = await toDoAppPage.getGeneratedTaskText();        
        expect(taskText).toBe(toDoAppPage.getTaskText());
        
    });

});