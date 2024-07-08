import grpc
import users_pb2
import users_pb2_grpc


def run():
    channel = grpc.insecure_channel("localhost:50051")
    stub = users_pb2_grpc.UsersStub(channel)

    create_response = stub.CreateUser(
        users_pb2.CreateUserRequest(
            name="John Doe", email="john.doe@example.com", password="password123"
        )
    )
    print(f"Created User:, {create_response.user}", sep='\n\n')

    get_users_response = stub.GetUsers(users_pb2.GetUsersRequest())
    print("List of Users:\n")
    for user in get_users_response.users:
        print(user)

    user_id = create_response.user.id
    get_user_response = stub.GetUserById(users_pb2.GetUserByIdRequest(id=user_id))
    print(f"User with ID {user_id}:\n\n{get_user_response.user}")

    update_response = stub.UpdateUser(
        users_pb2.UpdateUserRequest(
            id=user_id, name="John Smith", email="jaysmith@example.com"
        )
    )
    print(f"Updated User: {update_response.user}")

    delete_response = stub.DeleteUser(users_pb2.DeleteUserRequest(id=user_id))
    print(f"Deleted User: {delete_response.success}")


if __name__ == "__main__":
    run()
