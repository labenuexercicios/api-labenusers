import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public findAll = async (): Promise<UserDB[]> => {
    const userDB: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()

    return userDB
  }

  public findByEmail = async (email: string): Promise<UserDB | undefined> => {
    const [ userDB ]: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email: email })

    return userDB
  }

  public findById = async (id: string): Promise<UserDB | undefined> => {
    const [ userDB ]: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ id: id })

    return userDB
  }

  public insertUser = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(userDB)
  }

  public searchUsers = async (name?: string, email?: string): Promise<UserDB[]> => {
    const usersDB: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where('name', 'like', `${name}`)
      .orWhere('email', 'like', `${email}`)

    return usersDB
  }

  public editUser = async (idToEdit: string, userDB: UserDB): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id: idToEdit })
  }

  public deleteUserById = async (idToDelete: string): Promise<void> => {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .del()
      .where({ id: idToDelete })
  }
}