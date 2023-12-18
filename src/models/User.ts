export interface UserDB {
  id: string,
  name: string,
  email: string
}

export interface UserModel {
  id: string,
  name: string,
  email: string
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string
  ) {}

  public getId(): string {
    return this.id
  }

  public setId(value: string): void {
    this.id = value
  }

  public getName(): string {
    return this.name
  }

  public setName(value: string): void {
    this.name = value
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(value: string): void {
    this.email = value
  }

  public toDBModel(): UserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    }
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    }
  }
}