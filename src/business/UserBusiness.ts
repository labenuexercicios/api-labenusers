import { CreateUserInput, DeleteUserInput, EditUserInput, EditUserOutput, GetAllUsersOutput, GetUserByIdInput, GetUserByIdOutput, SearchUserInput, SearchUserOutput } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator
  ) {}

  public createUser = async (input: CreateUserInput): Promise<void> => {
    const { name, email } = input

    if (name === undefined) {
      throw new BadRequestError("'name' é obrigatório")
    }

    if (email === undefined) {
      throw new BadRequestError("'email' é obrigatório")
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string")
    }

    if (typeof email !== "string") {
      throw new BadRequestError("'email' deve ser string")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      throw new BadRequestError(`'${email}' não é um email válido`)
    }
    
    const userExists = await this.userDatabase.findByEmail(email)

    if (userExists) {
      throw new ConflictError("email já cadastrado")
    }

    const id = this.idGenerator.generate()

    const user = new User(
      id,
      name,
      email
    )

    await this.userDatabase.insertUser(user.toDBModel())
  }

  public getAllUsers = async (): Promise<GetAllUsersOutput> => {
    const usersDB = await this.userDatabase.findAll()

    const users = []

    for (let userDB of usersDB) {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email
      )

      users.push(user.toBusinessModel())
    }

    return users
  }

  public getUserById = async (input: GetUserByIdInput): Promise<GetUserByIdOutput> => {
    const { id } = input

    const userDB = await this.userDatabase.findById(id)

    if (!userDB) {
      throw new NotFoundError('id de user não encontrada')
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email
    )

    return user.toBusinessModel()
  }

  public searchUsers = async (input: SearchUserInput): Promise<SearchUserOutput> => {
    const { name, email } = input

    const usersDB = await this.userDatabase.searchUsers(name, email)

    const users = []

    for (let userDB of usersDB) {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email
      )

      users.push(user.toBusinessModel())
    }

    return users
  }

  public editUser = async (input: EditUserInput): Promise<EditUserOutput> => {
    const { idToEdit, name, email } = input

    if (name !== undefined) {
      if (typeof name !== "string") {
        throw new BadRequestError("'name' deve ser string")
      }
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        throw new BadRequestError("'email' deve ser string")
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        throw new BadRequestError(`'${email}' não é um email válido`)
      }
    }

    const userDB = await this.userDatabase.findById(idToEdit)

    if (!userDB) {
      throw new NotFoundError('user com essa id não existe')
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email
    )

    name && user.setName(name)
    email && user.setEmail(email)

    await this.userDatabase.editUser(idToEdit, user.toDBModel())

    return user.toBusinessModel()
  }

  public deleteUser = async (input: DeleteUserInput): Promise<void> => {
    const { idToDelete } = input

    const userDB = await this.userDatabase.findById(idToDelete)

    if (!userDB) {
      throw new NotFoundError('user com essa id não existe')
    }

    await this.userDatabase.deleteUserById(idToDelete)
  }
}