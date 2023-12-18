import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { UserModel } from "../models/User";

export interface CreateUserInput {
  name: any,
  email: any
}

export type GetAllUsersOutput = UserModel[]

export interface GetUserByIdInput {
  id: string
}

export type GetUserByIdOutput = UserModel

export interface SearchUserInput {
  name?: string,
  email?: string
}

export type SearchUserOutput = UserModel[]

export interface EditUserInput {
  idToEdit: string,
  name?: string,
  email?: string
}

export type EditUserOutput = UserModel

export interface DeleteUserInput {
  idToDelete: string
}

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ) {}

  public createUser = async (req: Request, res: Response) => {
    try {

      const input: CreateUserInput = {
        name: req.body.name,
        email: req.body.email
      }

      await this.userBusiness.createUser(input)

      res.status(201).send()
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const response = await this.userBusiness.getAllUsers()
      res.status(200).send(response)
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getUserById = async (req: Request, res: Response) => {
    try {
      const input: GetUserByIdInput = {
        id: req.params.id
      }

      const response = await this.userBusiness.getUserById(input)
      res.status(200).send(response)
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public searchUsers = async (req: Request, res: Response) => {
    try {
      const input: SearchUserInput = {
        name: req.query.name as string | undefined,
        email: req.query.email as string | undefined
      }

      const response = await this.userBusiness.searchUsers(input)
      res.status(200).send(response)
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editUser = async (req: Request, res: Response) => {
    try {
      const input: EditUserInput = {
        idToEdit: req.params.id,
        name: req.body.name,
        email: req.body.email
      }

      const response = await this.userBusiness.editUser(input)
      res.status(200).send(response)
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input: DeleteUserInput = {
        idToDelete: req.params.id
      }

      const response = await this.userBusiness.deleteUser(input)
      res.status(200).send(response)
      
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}