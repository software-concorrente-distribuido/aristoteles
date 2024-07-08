from concurrent import futures
import grpc
from sqlalchemy import create_engine, text
import users_pb2
import users_pb2_grpc


url = "postgresql+psycopg2://admin:password@localhost:5432/app"
engine = create_engine(url, isolation_level="AUTOCOMMIT")


def create_users_table():
    with engine.begin() as conn:
        try:
            query = """
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(30) NOT NULL,
                    email VARCHAR(20) NOT NULL,
                    password VARCHAR(16) NOT NULL
                );
                """
            conn.execute(text("DROP TABLE IF EXISTS users"))
            conn.execute(text(query))
            print("Users table created.")
        except Exception as e:
            conn.rollback()
            print(f"Error creating users table: {e}")


class Users(users_pb2_grpc.UsersServicer):

    def GetUsers(self, request, context):
        with engine.begin() as conn:
            try:
                result = conn.execute(text("SELECT * FROM users"))
                users = [
                    users_pb2.User(
                        id=row.id,
                        name=row.name,
                        email=row.email,
                        password=row.password,
                    )
                    for row in result
                ]
                return users_pb2.GetUsersResponse(users=users)
            except Exception as e:
                context.set_details(f"Error retrieving users: {e}")
                context.set_code(grpc.StatusCode.INTERNAL)
                return users_pb2.GetUsersResponse()  # Empty response

    def GetUserById(self, request, context):
        with engine.begin() as conn:
            try:
                result = conn.execute(
                    text("SELECT * FROM users WHERE id = :id"), {"id": request.id}
                )
                row = result.first()
                if row:
                    user = users_pb2.User(
                        id=row.id,
                        name=row.name,
                        email=row.email,
                        password=row.password,
                    )
                    return users_pb2.GetUserByIdResponse(user=user)
                else:
                    context.set_details("User not found")
                    context.set_code(grpc.StatusCode.NOT_FOUND)
                    return users_pb2.GetUserByIdResponse()  # Empty response
            except Exception as e:
                context.set_details(f"Error retrieving user: {e}")
                context.set_code(grpc.StatusCode.INTERNAL)
                return users_pb2.GetUserByIdResponse()

    def CreateUser(self, request, context):
        with engine.begin() as conn:
            try:
                result = conn.execute(
                    text(
                        "INSERT INTO users (name, email, password) VALUES (:name, :email, :password) RETURNING id"
                    ),
                    {
                        "name": request.name,
                        "email": request.email,
                        "password": request.password,
                    },
                )
                user_id = result.fetchone()[0]
                user = users_pb2.User(
                    id=user_id,
                    name=request.name,
                    email=request.email,
                    password=request.password,
                )
                return users_pb2.CreateUserResponse(user=user)
            except Exception as e:
                context.set_details(f"Error creating user: {e}")
                context.set_code(grpc.StatusCode.INTERNAL)
                return users_pb2.CreateUserResponse()

    def UpdateUser(self, request, context):
        with engine.begin() as conn:
            try:
                update_fields = {}
                if request.name:
                    update_fields["name"] = request.name
                if request.email:
                    update_fields["email"] = request.email
                if request.password:
                    update_fields["password"] = request.password

                if not update_fields:
                    context.set_details("No fields to update")
                    context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                    return users_pb2.UpdateUserResponse()

                set_clause = ", ".join(
                    [f"{key} = :{key}" for key in update_fields.keys()]
                )
                update_fields["id"] = request.id

                result = conn.execute(
                    text(
                        f"UPDATE users SET {set_clause} WHERE id = :id RETURNING id, name, email, password"
                    ),
                    update_fields,
                )

                row = result.first()
                if row:
                    user = users_pb2.User(
                        id=row.id,
                        name=row.name,
                        email=row.email,
                        password=row.password,
                    )
                    return users_pb2.UpdateUserResponse(user=user)
                else:
                    context.set_details("User not found")
                    context.set_code(grpc.StatusCode.NOT_FOUND)
                    return users_pb2.UpdateUserResponse()
            except Exception as e:
                context.set_details(f"Error updating user: {e}")
                context.set_code(grpc.StatusCode.INTERNAL)
                return users_pb2.UpdateUserResponse()

    def DeleteUser(self, request, context):
        with engine.begin() as conn:
            try:
                result = conn.execute(
                    text("DELETE FROM users WHERE id = :id RETURNING id"),
                    {"id": request.id},
                )
                conn.commit()
                row = result.first()
                if row:
                    return users_pb2.DeleteUserResponse(success=True)
                else:
                    context.set_details("User not found")
                    context.set_code(grpc.StatusCode.NOT_FOUND)
                    return users_pb2.DeleteUserResponse(success=False)
            except Exception as e:
                context.set_details(f"Error deleting user: {e}")
                context.set_code(grpc.StatusCode.INTERNAL)
                return users_pb2.DeleteUserResponse(success=False)


def main():
    create_users_table()
    server = grpc.server(futures.ThreadPoolExecutor())
    users_pb2_grpc.add_UsersServicer_to_server(Users(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("gRPC server started on port 50051.")
    server.wait_for_termination()


if __name__ == "__main__":
    main()
