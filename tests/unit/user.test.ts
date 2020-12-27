import { User } from "../../src/domain/users/entities/User";
import { TestFactory } from "../init";
import { createUser } from "../mocks/createUser";
import { getToken } from "../mocks/getToken";

describe("/api/v1/users", () => {
    const factory = new TestFactory();
    
    let user: User | null = null;
    let superUser: User | null = null;
    let userToken: string | null = null;
    let superToken: string | null = null;

    beforeEach(async () => {
        await factory.init();
        user = await createUser("test", "password", false);
        superUser = await createUser("admin", "admin", true);
        userToken = getToken(user);
        superToken = getToken(superUser);
    });

    afterEach(async () => {
        await factory.close();
    });

    describe("GET /", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.get("/api/v1/users");
            expect(response.status).not.toEqual(404);
        });
        it("Should not return a status code 401", async () => {
            const response = await factory.app.get("/api/v1/users");
            expect(response.status).toEqual(401);
        });
        it("Should not return a status code 200", async () => {
            const response = await factory.app.get("/api/v1/users")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(200);
        });
    });

    describe("GET /:id", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.get("/api/v1/users/567");
            expect(response.status).not.toEqual(404);
        });
        it("Should not return a status code 401", async () => {
            const response = await factory.app.get("/api/v1/users/1");
            expect(response.status).toEqual(401);
        });
        it("Should not return a status code 200", async () => {
            const response = await factory.app.get("/api/v1/users/1")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(200);
        });
    });

    describe("POST /", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.post("/api/v1/users");
            expect(response.status).not.toEqual(404);
        });
        it("Should return a status code 401", async () => {
            const response = await factory.app.post("/api/v1/users");
            expect(response.status).toEqual(401);
        });
        it("Should return a status code 403", async () => {
            const response = await factory.app.post("/api/v1/users")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(403);
        });
        it("Should return a status code 400", async () => {
            const response = await factory.app.post("/api/v1/users")
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(400);
        });
        it("Should return a status code 201", async () => {
            const response = await factory.app.post("/api/v1/users")
                .send({ username: "NewUser", password: "password123", is_active: true })
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(201);
        });
    });

    describe("PUT /:id", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.put("/api/v1/users/1");
            expect(response.status).not.toEqual(404);
        });
        it("Should return a status code 401", async () => {
            const response = await factory.app.put("/api/v1/users/1");
            expect(response.status).toEqual(401);
        });
        it("Should return a status code 403", async () => {
            const response = await factory.app.put("/api/v1/users/1")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(403);
        });
        it("Should return a status code 400", async () => {
            const response = await factory.app.put("/api/v1/users/1")
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(400);
        });
        it("Should return a status code 404", async () => {
            const response = await factory.app.put("/api/v1/users/1123")
                .send({ username: "John", password: "password123", is_active: false })
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(404);
        });
        it("Should return a status code 203", async () => {
            const response = await factory.app.put(`/api/v1/users/${user!.id}`)
                .send({ username: "John", password: "password123", is_active: false })
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(203);
        });
    });

    describe("PATCH /:id", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.patch("/api/v1/users/1");
            expect(response.status).not.toEqual(404);
        });
        it("Should return a status code 401", async () => {
            const response = await factory.app.patch("/api/v1/users/1");
            expect(response.status).toEqual(401);
        });
        it("Should return a status code 403", async () => {
            const response = await factory.app.patch("/api/v1/users/1")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(403);
        });
        it("Should return a status code 404", async () => {
            const response = await factory.app.patch("/api/v1/users/1123")
                .send({ username: "John", password: "password123", is_active: false })
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(404);
        });
        it("Should return a status code 203", async () => {
            const response = await factory.app.patch(`/api/v1/users/${user!.id}`)
                .send({ is_active: false })
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(203);
        });
    });

    describe("DELETE /:id", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.delete("/api/v1/users/1");
            expect(response.status).not.toEqual(404);
        });
        it("Should return a status code 401", async () => {
            const response = await factory.app.delete("/api/v1/users/1");
            expect(response.status).toEqual(401);
        });
        it("Should return a status code 403", async () => {
            const response = await factory.app.delete("/api/v1/users/1")
                .set("Authorization", "Bearer " + userToken);
            expect(response.status).toEqual(403);
        });
        it("Should return a status code 203", async () => {
            const response = await factory.app.delete("/api/v1/users/1")
                .set("Authorization", "Bearer " + superToken);
            expect(response.status).toEqual(203);
        });
    });

});