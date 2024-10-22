import { Locator, Page } from "@playwright/test";

export class TodoAppPage {

    readonly page: Page;
    readonly taskInput: Locator;
    readonly createdTask: Locator;

    private readonly TASK_INPUT_PLACEHOLDER_SELECTOR = 'What needs to be done?';
    private readonly TASK_TEXT = 'Make a test';
    private readonly CREATED_TASK_SELECTOR =  `//span[@class = "active-item" and contains(., "${this.TASK_TEXT}")]`

    constructor(page) {
        this.page = page;
        this.taskInput = page.getByPlaceholder(this.TASK_INPUT_PLACEHOLDER_SELECTOR);
        this.createdTask = page.locator(this.CREATED_TASK_SELECTOR);
    }

    async addTaskToList(): Promise<void> {
        await this.addTask(this.TASK_TEXT);
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