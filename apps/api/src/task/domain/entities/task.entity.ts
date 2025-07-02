export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public completed: boolean = false,
  ) {}

  toggle() {
    this.completed = !this.completed;
  }
}
