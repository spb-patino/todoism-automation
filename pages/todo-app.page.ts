import { Locator, Page } from "@playwright/test";

export class TodoAppPage {

    readonly page: Page;
    readonly taskInput: Locator;
    readonly createdTask: Locator;
    readonly createdTaskCheckbox: Locator;
    completedTaskCheckbox: Locator;
    readonly clearTaskListButton: Locator;

    private readonly TASK_INPUT_PLACEHOLDER_SELECTOR = 'What needs to be done?';
    private readonly TASK_TEXT = 'Make a test';
    private readonly CREATED_TASK_SELECTOR = `//span[@class = "active-item" and contains(., "${this.TASK_TEXT}")]`
    private readonly COMPLETED_TASK_SELECTOR = `//span[@class = "inactive-item" and contains(., "${this.TASK_TEXT}")]`
    private readonly CREATED_TASK_FILTER_SELECTOR = `check_box_outline_blank ${this.TASK_TEXT}`;
    private readonly CLEAR_TASK_LIST_BUTTON_SELECTOR = 'clear_allClear';

    constructor(page) {
        this.page = page;
        this.taskInput = page.getByPlaceholder(this.TASK_INPUT_PLACEHOLDER_SELECTOR);
        this.createdTask = page.locator(this.CREATED_TASK_SELECTOR);
        this.createdTaskCheckbox = page.locator('span').filter({ hasText: this.CREATED_TASK_FILTER_SELECTOR }).locator('i')
        this.clearTaskListButton = page.getByText(this.CLEAR_TASK_LIST_BUTTON_SELECTOR);
    }

    async addTaskToList(): Promise<void> {
        await this.addTask(this.TASK_TEXT);
    }

    async markTaskAsCompleted(): Promise<void> {
        await this.createdTaskCheckbox.click();
        // return if the task is completed
    }

    async clearTaskList(): Promise<void> {
        await this.clearTaskListButton.click();
    }

    async getIfTaskIsCompleted(): Promise<boolean> {
        await this.page.waitForSelector(this.COMPLETED_TASK_SELECTOR);
        this.completedTaskCheckbox = this.page.locator(this.COMPLETED_TASK_SELECTOR);
        return await this.completedTaskCheckbox.isVisible();
    }

    async getIfTaskIsRemoved(): Promise<boolean> {
        await this.page.waitForSelector(this.COMPLETED_TASK_SELECTOR, { state: 'detached' });
        const elementExistsCount = await this.page.locator(this.COMPLETED_TASK_SELECTOR).count();
        return !!!elementExistsCount;
    }

    async getGeneratedTaskText(): Promise<string> {
        const taskText = await this.createdTask.textContent() || '';
        return taskText;

    }

    getTaskText(): string {
        return this.TASK_TEXT;
    }

    private async addTask(task: string) {
        await this.taskInput.click();
        await this.taskInput.fill(task);
        await this.taskInput.press('Enter');
    }

}