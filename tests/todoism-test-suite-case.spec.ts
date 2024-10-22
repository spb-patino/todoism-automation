import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { TodoAppPage } from '../pages/todo-app.page';


test.describe('Todoism test suit cases', () => {
    
    test.beforeEach(async ({ page }) => {
        test.slow();
        const homePage: HomePage = new HomePage(page);
        const loginPage: LoginPage = new LoginPage(page);

        await homePage.openPage();
        await homePage.clickLoginButton();

        await loginPage.clickGetATestAccount();
        await loginPage.clickLoginButton();



    });

    test('Create a new task', async ({ page }) => {
        test.slow();
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList();
        const taskText = await toDoAppPage.getGeneratedTaskText();        
        expect(taskText).toBe(toDoAppPage.getTaskText());
    });
    
    test('Create a task and mark as completed', async ({ page }) => {
        test.slow();
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList();
        await toDoAppPage.markTaskAsCompleted();
        const isTaskCompleted = await toDoAppPage.getIfTaskIsCompleted();
        expect(isTaskCompleted).toBeTruthy();
    });
    
    test('Clear task list', async ({ page }) => {
        test.slow();
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList();
        await toDoAppPage.markTaskAsCompleted();
        await toDoAppPage.clearTaskList();
        const isTaskRemoved = await toDoAppPage.getIfTaskIsRemoved();
        expect(isTaskRemoved).toBeTruthy(); 
    });

});