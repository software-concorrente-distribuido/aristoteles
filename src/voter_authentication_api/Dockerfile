FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /voter_authentication_api
COPY ["voter_authentication_api/VoterAuthenticationAPI.csproj", "voter_authentication_api/"]
RUN dotnet restore "./voter_authentication_api/VoterAuthenticationAPI.csproj"
COPY . .
RUN dotnet build "./voter_authentication_api/VoterAuthenticationAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./voter_authentication_api/VoterAuthenticationAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VoterAuthenticationAPI.dll"]