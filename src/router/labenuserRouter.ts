import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"

export const labenuserRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator()
  )
)

// users
labenuserRouter.get("/users", userController.getAllUsers)
labenuserRouter.get("/users/search", userController.searchUsers)
labenuserRouter.get("/users/:id", userController.getUserById)
labenuserRouter.post("/users/", userController.createUser)
labenuserRouter.put("/users/:id", userController.editUser)
labenuserRouter.delete("/users/:id", userController.deleteUser)