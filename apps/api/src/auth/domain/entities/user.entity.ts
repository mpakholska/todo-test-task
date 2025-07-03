export class User {
  constructor(
    public login: string,
    public password: string,
  ) {}
}

export class FetchedUser {
  constructor(public login: string) {}
}
