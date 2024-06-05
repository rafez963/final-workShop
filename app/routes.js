import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { RegisterScene } from "./scenes/register/register.scene";
import { TasksEditPage } from "./scenes/tasks/tasks-edit.scene";
import { TasksScene } from "./scenes/tasks/tasks.scene";
import { UsersPage } from "./scenes/users/users.scenes";

export const routes = {

    public : [
     {path: '/login', scene: LoginScene},
     {path: '/not-found', scene: NotFoundScene},
     {path: '/register', scene: RegisterScene}
    ],
    private:[
        {path: '/tasks', scene : TasksScene},
        {path: '/tasks/edit', scene : TasksEditPage},
        {path: '/users', scene : UsersPage}
    ]

}