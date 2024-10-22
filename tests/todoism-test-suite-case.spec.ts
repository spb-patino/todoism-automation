import test, { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { TodoAppPage } from '../pages/todo-app.page';
import { taskToUse } from '../data/single-task.data';


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
        await toDoAppPage.addTaskToList(taskToUse);
        const taskText = await toDoAppPage.getGeneratedTaskText(taskToUse);        
        expect(taskText).toBe(taskToUse);
    });
    
    test('Create a task and mark as completed', async ({ page }) => {
        test.slow();
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList(taskToUse);
        await toDoAppPage.markTaskAsCompleted(taskToUse);
        const isTaskCompleted = await toDoAppPage.getIfTaskIsCompleted(taskToUse);
        expect(isTaskCompleted).toBeTruthy();
    });
    
    test('Clear task list', async ({ page }) => {
        test.slow();
        const toDoAppPage = new TodoAppPage(page);
        await toDoAppPage.addTaskToList(taskToUse);
        await toDoAppPage.markTaskAsCompleted(taskToUse);
        await toDoAppPage.clearTaskList();
        const isTaskRemoved = await toDoAppPage.getIfTaskIsRemoved(taskToUse);
        expect(isTaskRemoved).toBeTruthy(); 
    });

});